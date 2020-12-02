// Cambio de texto que daba el HTML

    var articulo = document.getElementById("articulo");
    articulo.textContent = "Cotiza el seguro de tu auto";

// Alerta en caso de que elija un auto con mas de 20 anios

  function copiar(){
      var d = document.getElementById("copi");
      var displayText= d.options[d.selectedIndex].text;
      document.getElementById("copia1").value = displayText;

      if (displayText === "1999 o mas") {
        // Tipo de alert que da Materialize
        M.toast({html:"No ofrecemos seguro a vehiculos de mas de 20 años"});
          document.getElementById("copia1").value = "Seleccione otra opcion"
          document.getElementById("copi").value = "0"
    }
  }


// Calcular edad y mandar alert si es menor

$("#nacimiento").on("change", function(){
   $("#edad").val(calcularEdad());
});

function calcularEdad(){
    var fechaSeleccionada = $("#nacimiento").val();
    var fechaNacimiento = new Date(fechaSeleccionada);
    var fechaActual = new Date();
    var edad = (parseInt((fechaActual - fechaNacimiento) / (1000*60*60*24*365)));
    if (edad < "18") {
      M.toast({html: "No ofrecemos seguro a menores de 18 años"});
  } else {
    return edad;
  }
}



// Cambio un valor del Select de los Generos

$("select.generos option:last").remove();

// Agrego uno nuevo

var nuevo =$("<option>No responde</option>");

$("#generos").append(nuevo);



// Select de Modelo y Marcas. Al seleccionar una Marca aparecen los modelos de esa Marca. Ejemplo al tocar en Ford aparece Fiesta en el de modelos.
// Tomado de la clase 10


window.onload = () => {
  const selectMarca = document.querySelector('#marca');
  const selectModel = document.querySelector('#modelo');
  const marcas = listaSelect(autos, "marca");

// Cargo los valores del array en el Select de Marcas
  cargarContenido(marcas, selectMarca);

   selectMarca.addEventListener('change', (e) => {
   selectModel.innerHTML = '<option value="">- Seleccionar -</option>';

   const modelos = autos.filter(elem => elem.marca.toLowerCase().replace(' ', '-') == e.target.value);

// Cargo los valores del array en el Select de Modelos
   const listaModelos = listaSelect(modelos, "modelo");
    cargarContenido(listaModelos, selectModel);
  });
}

function cargarContenido(array, select) {
  array.forEach(element => {
    let option = document.createElement('option');
    option.value = element.toLowerCase().replace(' ', '-');
    option.textContent = element;
    select.appendChild(option);

// Inicializar selects. Esto me lo pide Materialize para que funcionen los Selects.

$(document).ready(function(){
  $('select').formSelect();
});
  })
}

function listaSelect(array, key) {
  const listado = [];

  array.forEach(elem => {
    if (!listado.includes(elem[key])) {
      listado.push(elem[key]);
    }
  })
  return listado.sort();
}




// Objeto que muestra la marca y modelo que no esta dentro de la lista que puse

var suAuto = new Object();
suAuto.marca = document.getElementById('otraMarca');
suAuto.modelo = document.getElementById('otroModelo');

suAuto.marca.onchange =  mostrarTexto;
suAuto.modelo.onchange = mostrarTexto;

function mostrarTexto(){
  var displayTextt= (suAuto.marca.value + " " + suAuto.modelo.value);
  document.getElementById("copiaTexto").value = displayTextt;
}



// Guardar datos de los radio buttons

// El radio de los duenios
    function rDuenio(){
      var opcion1 = document.getElementById("duenio2");
      var opcion2 = document.getElementById("duenio3");
      var opcion3 = document.getElementById("duenio4");
      if(opcion1.checked==true)
      { 
        localStorage.setItem('guarda-titular', JSON.stringify('dueño-propio'));
      }
      else if(opcion2.checked==true){    
        localStorage.setItem('guarda-titular', JSON.stringify('Tercero'));
      }
      else if(opcion3.checked==true){
        localStorage.setItem('guarda-titular', JSON.stringify('Empresa'));
      }
    }

// El radio de los Contactos
    function rContacto(){
      var chance1 = document.getElementById("contacto1");
      var chance2 = document.getElementById("contacto2");
      var chance3 = document.getElementById("contacto3");
      if(chance1.checked==true)
      { 
        localStorage.setItem('guarda-tipoContacto', JSON.stringify('Whatsapp'));
      }
      else if(chance2.checked==true){    
        localStorage.setItem('guarda-tipoContacto', JSON.stringify('Telefono'));
      }
      else if(chance3.checked==true){
        localStorage.setItem('guarda-tipoContacto', JSON.stringify('No le interesa'));
      }
    }


// Guardar datos del formulario en LocalStorage


// Funcion que guarda los datos

function registrarDatos(){
  var elMarca = document.querySelector("#marca").value;
      elModelo = document.querySelector("#modelo").value;
      elOtroModeloMarca = document.querySelector("#copiaTexto").value;
      elPatente = document.querySelector("#patente").value;
      elAnio = document.querySelector("#copia1").value;
      elNombre = document.querySelector("#nombre").value;
      elApellido = document.querySelector("#apellido").value;
      elGenero = document.querySelector("#generos").value;
      elNacimiento = document.querySelector("#nacimiento").value;
      elEmail = document.querySelector("#email").value;
      elTelefono = document.querySelector("#tel").value;
      elEdad = document.querySelector("#edad").value;



// Guardo la informacion de las variables
    localStorage.setItem("guarda-marca", JSON.stringify(elMarca));
    localStorage.setItem("guarda-modelo", JSON.stringify(elModelo));
    localStorage.setItem("guarda-otroModeloMarca", JSON.stringify(elOtroModeloMarca));
    localStorage.setItem("guarda-patente", JSON.stringify(elPatente));
    localStorage.setItem("guarda-anio", JSON.stringify(elAnio));
    localStorage.setItem("guarda-nombre", JSON.stringify(elNombre));
    localStorage.setItem("guarda-apellido", JSON.stringify(elApellido));
    localStorage.setItem("guarda-genero", JSON.stringify(elGenero));
    localStorage.setItem("guarda-nacimiento", JSON.stringify(elNacimiento));
    localStorage.setItem("guarda-Email", JSON.stringify(elEmail));
    localStorage.setItem("guarda-telefono", JSON.stringify(elTelefono));
    localStorage.setItem("guarda-edad", JSON.stringify(elEdad));

// Ejecuto las funciones de guardar de los Radio buttons aca
  rContacto();
  rDuenio();
  rCobertura()
}


// Para no actualizar pagina al apretar enter


    document.addEventListener("DOMContentLoaded", ()=>{
      document.getElementById("enviarFormulario").addEventListener("click", function(event){
        event.preventDefault();
        chequeaTodo();

     });   
   });



   // Desaparece todo y aparece contrato
function cargaInfo(){
   var confirmar = document.getElementById("confirmar");

    confirmar.textContent =  "Sr/Sra, " + JSON.parse(localStorage.getItem("guarda-nombre")) + " " + JSON.parse(localStorage.getItem("guarda-apellido")) + " de " + JSON.parse(localStorage.getItem("guarda-edad")) + " de edad, nacido el dia " + JSON.parse(localStorage.getItem("guarda-nacimiento")) +", desea aplicar para una cobertura por el valor de " + localStorage.getItem("guarda-Cobertura") + ". El vehiculo a asegurar: " + JSON.parse(localStorage.getItem("guarda-marca")) + " " + JSON.parse(localStorage.getItem("guarda-modelo")) + JSON.parse(localStorage.getItem("guarda-otroModeloMarca")) + " con patente " + JSON.parse(localStorage.getItem("guarda-patente")) + " del año " + JSON.parse(localStorage.getItem("guarda-anio")) + ". El poseedor del mismo es " + JSON.parse(localStorage.getItem("guarda-titular")) + ".";

}


// Al seleccionar el valor de su auto, deja la informacion de las cobertura sque le compete al usuario


// Al presionar el boton de las coberturas sale la tabla que toma los valores del archivo JSON
document.querySelector("#botonn").addEventListener("click", traerDatos());

function traerDatos(){


  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "elJson.json", true);

  xhttp.send();

  xhttp.onreadystatechange = function(){

    if(this.readyState == 4 && this.status == 200){

      let datos = JSON.parse(this.responseText);

      let res = document.querySelector("#res");

      for(let item of datos){
        
        res.innerHTML += `
        
      <tr>
        <td id="traer1">${item.valores}</td>
        <td id="traer2">${item.cobertura1}</td>
        <td id="traer3">${item.cobertura2}</td>
        <td id="traer4">${item.cobertura3}</td>
      </tr>

      `
      }
    }
  }
}

// Al presionar el boton de "Consultar los valores de cobertura"
  // 1 Desaparece este mismo boton
  // 2 Aparece La tabla
  // 3 El boton para cerrar la tabla aparece
  // 4 Se muestra la tabla

  $("#botonn").click(function(){ 
    $("#botonn").fadeOut(); 
    $("table").fadeIn(); 
    $("#ocultarBoton").fadeIn();
    $("tbody tr").show(); 
    });

// Al presionar el boton de "Cerrar los valores de cobertura"
  // 1 La tabla desaparece
  // 2 Desaparece este mismo boton
  // 3 El Boton anterior de "Consultar los valores de cobertura" vuelve a aparecer
  // 4 El boton de "Ver mas valores" desaparece

 $("#ocultarBoton").click(function(){ 
    $("table").fadeOut();
    $("#ocultarBoton").fadeOut(); 
    $("#botonn").fadeIn(); 
    $("#masValores").fadeOut();
    });


// Para que la pagina no se actualice al hacer ninguno de los clicks anteriores.

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("botonn").addEventListener("click", function(event){
    event.preventDefault();
   });
});

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("ocultarBoton").addEventListener("click", function(event){
    event.preventDefault();
   });
});

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("masValores").addEventListener("click", function(event){
    event.preventDefault();
   });
});



// Al no querer ingresar ningun tipo de telefono, el input para ingresar el su numero es innecesario. 
// Por eso al hacer Click en la opcion "No me interesa" desaparece dicho input

$("#contacto3").click(function(){ 
  $("#ocultarEste").fadeOut(); 
  });

// Para que reaparezca en caso de que seleccione alguna de las otras 2 opciones luego de haber clickeado la mencionada anteriormente

  $("#contacto1").click(function(){ 
    $("#ocultarEste").fadeIn(); 
  });

  $("#contacto2").click(function(){ 
    $("#ocultarEste").fadeIn(); 
  });




// Se colorean las filas de la tabla y al clickear una solo queda esa fila.


// Colorea
$(document).ready(() =>{
  $("tbody tr ").hover(function(){
    $(this).find("td").addClass("resaltar");
  }, function(){
    $(this).find("td").removeClass("resaltar");
  });
// Selecciona la fila
$("tbody tr").click(function(){
  $("table").find("tbody tr").hide();
  $(this).show();

// Mandar datos de tabla al Local Storage

// El valor del auto lo mando directo al Local Storage porque ya estaria seleccionado aca
  var contenido =  $(this).find("#traer1").html();
  $("#resultado").html(contenido);
  localStorage.setItem('guarda-Valor', JSON.stringify(contenido));

// Los valores de las coberturas los mando a un Session Storage porque luego voy a mandar cada valor al Radio Button asi selecciona que cobertura quiere.
  var contenido1 =  $(this).find("#traer2").html();
  $("#aaa").html(contenido1);  
  sessionStorage.setItem('radio1', contenido1);

  var contenido2 =  $(this).find("#traer3").html();
  $("#bbb").html(contenido2);
  sessionStorage.setItem('radio2', contenido2);

  var contenido3 =  $(this).find("#traer4").html();
  $("#ccc").html(contenido3);
  sessionStorage.setItem('radio3', contenido3);

  
// Aparece el boton para poder ver mas valores en caso de que el valor selecionado no sea el que queria

  $("#masValores").show();

// Aparece el radio button de las coberturas
  $(".ocultarRadio").show();
})


// Al clickear en el boton se muestran los valores de la tabla que habian desaparecido y se oculta este mismo boton.

$("#masValores").click(function(){
$("tbody tr").show();
$("#masValores").hide();
})
});



// Guardar dato del tipo de cobertura que eligio en funcion de la tabla que habia seleccionado antes.

function rCobertura(){
  var chance11 = document.getElementById("radioCobertura");
  var chance22 = document.getElementById("radioCobertura2");
  var chance33 = document.getElementById("radioCobertura3");
 
  var radio1 = sessionStorage.getItem('radio1');
  var radio2 = sessionStorage.getItem('radio2');
  var radio3 = sessionStorage.getItem('radio3');

  if(chance11.checked==true)
  { 
    localStorage.setItem('guarda-Cobertura', JSON.stringify(radio1));
  }
  else if(chance22.checked==true){    
    localStorage.setItem('guarda-Cobertura', JSON.stringify(radio2));
  }
  else if(chance33.checked==true){
    localStorage.setItem('guarda-Cobertura', JSON.stringify(radio3));
  }
}


// Ocultar Selects de Marcas y Modelos Al presionar boton
// Aparece boton en caso de que quiera volver a ver los Selects

  document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("botonSelects").addEventListener("click", function(event){
      event.preventDefault();
     });
  });

  $("#botonSelects").click(function(){ 
    $("#ocultarEstos").fadeIn();
    $("#botonSelects").fadeOut();
    $("#noVeo").fadeOut();
    $("#botonNoVeo").fadeIn();
  });



  $("#botonNoVeo").click(function(){ 
    $("#ocultarEstos").fadeOut(); 
    $("#botonSelects").fadeIn();
    $("#noVeo").fadeIn(); 
    $("#botonNoVeo").fadeOut(); 
    });

   document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("botonNoVeo").addEventListener("click", function(event){
      event.preventDefault();
     });
  });



  // Chequear que todo este relleno


  $("#chequear").click(function(){ 
    registrarDatos();
    cargaInfo();

    validarNombre();
    validarApellido();
    validarPatente();
    validarEmail();
    validarTelefono();
    validarAnioAuto();
    validarNacimiento();
    validarContacto();
    validarDuenio();
    validarCobertura();
    validarGenero();
    guardarMyM();
    validarMyM();
    });


// Validar datos

var validarNombre = function(){
  if(JSON.parse(localStorage.getItem("guarda-nombre")) == 0){
    M.toast({html: "Falta colocar nombre", completeCallback: function(){location.href = location.href}})
  }
}

var validarApellido = function(){
  if(JSON.parse(localStorage.getItem("guarda-apellido")) == 0){
    M.toast({html: "Falta colocar apellido", completeCallback: function(){location.href = location.href}})
  }
}

var validarPatente = function(){
  if(JSON.parse(localStorage.getItem("guarda-patente")) == 0){
    M.toast({html: "Falta colocar patente", completeCallback: function(){location.href = location.href}})
  }
}

var validarEmail = function(){
  if(JSON.parse(localStorage.getItem("guarda-Email")) == 0){
    M.toast({html: "Falta colocar email", completeCallback: function(){location.href = location.href}})
  }
}

var validarTelefono = function(){
  if(JSON.parse(localStorage.getItem("guarda-telefono")) == 0){
    M.toast({html: "Falta colocar telefono", completeCallback: function(){location.href = location.href}})
  }
}

var validarAnioAuto = function(){
  if(JSON.parse(localStorage.getItem("guarda-anio")) == 0){
  M.toast({html: "Falta colocar año del auto", completeCallback: function(){location.href = location.href}}) 
  }
}

var validarNacimiento = function(){
  if(JSON.parse(localStorage.getItem("guarda-nacimiento")) == 0){
  M.toast({html: "Falta colocar fecha de nacimiento", completeCallback: function(){location.href = location.href}})
  }
}

var validarGenero = function(){
  if(JSON.parse(localStorage.getItem("guarda-genero")) == 0){
  M.toast({html: "Falta colocar genero", completeCallback: function(){location.href = location.href}}) 
  }
}

// validar datos de radio buttons

var validarContacto = function(){
  if(document.getElementById("contacto1").checked == true || document.getElementById("contacto2").checked == true || document.getElementById("contacto3").checked == true ){} else {  M.toast({html: "Falta colocar tipo de contacto", completeCallback: function(){location.href = location.href}}) 
  }
}

var validarDuenio = function(){
  if(document.getElementById("duenio2").checked == true || document.getElementById("duenio3").checked == true || document.getElementById("duenio4").checked == true ){} else {  M.toast({html: "Falta colocar tipo de dueño", completeCallback: function(){location.href = location.href}})
  }
}

var validarCobertura = function(){
  if(document.getElementById("radioCobertura").checked == true || document.getElementById("radioCobertura2").checked == true || document.getElementById("radioCobertura3").checked == true ){} else {  M.toast({html: "Falta colocar tipo de cobertura", completeCallback: function(){location.href = location.href}}) 
  }
}

// validar marca y modelo

function guardarMyM(){
  var mym = document.getElementById("guardaMyM");
  mym.value =  JSON.parse(localStorage.getItem("guarda-marca")) + JSON.parse(localStorage.getItem("guarda-modelo")) + JSON.parse(localStorage.getItem("guarda-otroModeloMarca"));

  var elMyM = document.querySelector("#guardaMyM").value;
      localStorage.setItem("guarda-mym", JSON.stringify(elMyM));
}

var validarMyM = function(){
  if(JSON.parse(localStorage.getItem("guarda-mym")) == 0){
  M.toast({html: "Falta colocar Modelo y/o Marca", completeCallback: function(){location.href = location.href}})
  }
}


// Funcion para chequear que todos los datos esten ingresados
var chequeaTodo = function(){
  if(document.getElementById("chequear").checked == true) {
             // alert con mensaje y modifica todo
    M.toast({html: "formulario enviado", completeCallback: function(){
      $("#ocultarTodo").fadeOut()
    $("#mostrarEste").fadeIn()
  }})
  } else {  M.toast({html: "Falta tildar chequear informacion", completeCallback: function(){location.href = location.href}})
  }
  }



