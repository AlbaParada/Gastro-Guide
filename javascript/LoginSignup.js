///////////////////////LOGIN CLIENTE////////////////////////////////////////////////////////////////////
function validarEmailCliente() {
    var campo = document.getElementById("emailCliente"); //devuelve el elemento que desencadenó el evento.
    var valido = document.getElementById('emailClienteOK');  
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
 
    if (emailRegex.test(campo.value)) {
      return true;
    } 
    if(!campo.value){
      valido.innerText = "Por favor introduzca un e-mail";
      return false;
    }
    if(!emailRegex.test(campo.value)) {
      valido.innerText = "Por favor introduzca una dirección de e-mail valida";
      return false;
    }
};


function validarPasswordCliente() {
    var campo = document.getElementById("passwordCliente");
    var valido = document.getElementById('passClienteOK');
    // var passRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;   

    if (campo.value) {
      return true;
    } 
    if(!campo.value) {
      valido.innerText = "Por favor introduzca una contraseña";
      return false;
    }
};

document.getElementById("btnSubmitCliente").onclick = function(){
  document.getElementById("emailClienteOK").innerText= "";
  document.getElementById("passClienteOK").innerText= "";

  if( validarEmailCliente() && validarPasswordCliente() )
    window.location.href = 'construccion.html';
};


///////////////////////LOGIN RESTAURANTE////////////////////////////////////////////////////////////////////

function validarEmailRestaurante() {
    var campo = document.getElementById("emailRestaurante"); //devuelve el elemento que desencadenó el evento.
    var valido = document.getElementById('emailRestauranteOK');  
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
 
    if (emailRegex.test(campo.value)){
      return true;
    } 
    if(!campo.value){
      valido.innerText = "Por favor introduzca un e-mail";
      return false;
    }
    if (!emailRegex.test(campo.value)){
      valido.innerText = "Por favor introduzca una dirección de e-mail valida";
      return false;
    }
};


function validarPasswordRestaurante() {
    var campo = document.getElementById("passwordRestaurante");
    var valido = document.getElementById('PasswordRestauranteOK');
    // var passRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;   

    if (campo.value) {
      return true;
    } 
    else {
      valido.innerText = "Por favor introduzca una contraseña";
      return false;
    }
};

document.getElementById("btnSubmitRestaurante").onclick = function(){
  document.getElementById("emailRestauranteOK").innerText= "";
  document.getElementById("PasswordRestauranteOK").innerText= "";

  let OK = "http://www.mocky.io/v2/5a5cc9ee2e0000c1099f842b";
  let notOK = "http://www.mocky.io/v2/5a5cce592e0000931e9f8440";
  let badresponse = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";

  if( validarEmailRestaurante() && validarPasswordRestaurante() )
  Ajax("POST",OK, function(obj){
    if (obj.status == "OK")
    {window.location.href = 'b_homerestaurante.html';
    
  }
    else {
       document.getElementById("passRestauranteOK").innerText = "Usuario o contraseña incorrectos.";
    }
  } ,
   serialize(document.getElementById("inicio-sesion-restaurante")),"passRestauranteOK");
};

