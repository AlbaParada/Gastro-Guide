var okVid = true;
var okMenu = true;
var okOferta = true;
var okRecetas = true; 

//////////////////////FOTO/////////////////////////////////////////////////////////

document.getElementById("imgsrc").onchange = function () {

	var temporal = {imgsrc:URL.createObjectURL(event.target.files[0])};

	//document.getElementById("pub-con-gal").innerHTML += '<div class="col-md-6 col-sm-12 mt-5"><img class="img-thumbnail" src="' + temporal + '"></div>';
	var resultRender=GestorModPlantilla.render("../mod.gestion_plantilla/templates/img_homeRestaurante.hbs",temporal);
	    
	resultRender.then(function (value) {
		$("#pub-con-gal").append(value);
	})

}
////////////////////////////////////////////////////////////
document.getElementById("btnIngredientes").onclick = function (event) {
  event.preventDefault();
  let ingredientes = document.getElementById("ingredientes");

  /*if (!ingredientes.value) {
    document.getElementById("ingredientesOK").innerText = "Campo vacío";
	  $("#ingredientesOK").addClass("alert alert-danger");

  }*/

  if (ingredientes.value) {
    document.getElementById("listaIngredientes").innerHTML += '<li>' + ingredientes.value + '</li>';
    ingredientes.value = "";
    //document.getElementById("ingredientesOK").innerText = "";
  }
}

function validarPublicarVideos(evt) {
    evt.preventDefault();
    limpiar();
    validarVideos("#titVideo", "#titVideoOK");
    validarVideos("#descVideo", "#descVideoOK");
    validarVideos("#urlVideo", "#urlVideoOK");
    validarVideos("#textoVideo", "#textoVideo");
    videoPost();
}
$("#btnVideos").click(validarPublicarVideos);

function validarPublicarMenu(evt)
{
    evt.preventDefault();
    validarMenu("#entrante", "#entranteOK");
    validarMenu("#primerPlato", "#primerPlatoOK");
    validarMenu("#segundoPlato", "#segundoPlatoOK");
    validarMenu("#postre", "#postreOK");
    validarMenu("#titMenu", "#titMenuOK");
    validarMenu("#nombreMenu", "#nombreMenuOK");
	menuPost();
}
$("#btnMenu").click(validarPublicarMenu);

function validarPublicarOferta(evt)
{
	evt.preventDefault();
	validarOfertas("#textoOferta", "#textoOfertaOK");
	validarOfertasRadios("#radioOferta1:checkbox:checked","#radioOferta1:checkbox:checked","#radioOfertaOK");
	ofertasPost();
}
$("#btnOferta").click(validarPublicarOferta);

function validarPublicarRecetas(evt)
{
	evt.preventDefault();
	validarRecetas("#receta", "#recetaOK");
	validarListaIngredientes("#listaIngredientes", "#ingredientesOK");
	validarRecetas("#textoReceta", "#textoRecetaOK");
	$("#ingredientesOK").removeClass("alert alert-danger");
	recetasPost();
}
$("#btnReceta").click(validarPublicarRecetas);
/////////////////////////////////////////////////////////////////////////
function videosForm (id, idError)
{
	var objVid = Validador.video($(id).val());
	$(id).focusout(function () 
	{
		if (!$(id).val()) 
		{
			
			$(idError).text(objVid.error).addClass(objVid.class);
			okVid = objVid.status;
		}
	});
	$(id).keyup(function () 
	{
		var objUrl = Validador.videoUrl($(id).val());
		if (id == "#urlVideo")
		{
			if (objUrl.ok == "ok")
			{
				$(idError).text("").removeClass(objVid.class);
				okVid = true;
			}
			else
			{
				$(idError).text(objUrl.error).addClass(objUrl.class);
				okVid = objUrl.status;	
			}
		}
		else{
			if ($(id).val())
			{
				$(idError).text("").removeClass(objVid.class);
				okVid = true;
			}
		}
	});
}
videosForm ("#titVideo", "#titVideoOK");
videosForm ("#descVideo", "#descVideoOK");
videosForm ("#urlVideo", "#urlVideoOK");
videosForm ("#textoVideo", "#textoVideo");
function validarVideos(id, idError) {
    //var urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    var urlRegExp = /[-a - zA - Z0 - 9@:%._\+~#=]{ 2, 256 } \.[a - z]{2, 6 } \b([-a - zA - Z0 - 9@:%_\+.~#?&//=]*)/;
    var obj = Validador.empty($(id).val());
    var objUrl = Validador.videoUrl($(id).val());
    if (!$(id).val()) {
        $(idError).text(obj.error);
        $(idError).addClass(obj.class);
        okVid = obj.status;
    };
    if (id == "#urlVideo") {
        if ($(id).val()) {
            if (objUrl.ok == "ok") {
                //$(idError).text("").removeClass(obj.class);
                okVid = true;
            }
            else {
                $(idError).text(objUrl.error).addClass(objUrl.class);
                okVid = objUrl.status;
            }
        }
    }
}
function videoPost() {
    if (okVid) {
        var urlOK = "http://www.mocky.io/v2/5a54dda32d000000315b1de3";
        var urlNOK = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
        Ajax("POST", urlNOK, limpiar(), serialize(document.getElementById("form-video")), "errorVideoResturante");
		alert ("Tu contenido ha sido publicado");
    }
}

/*function imagInput()
{
	$("#imgsrc").change(function(){
		var temporal = URL.createObjectURL(event.target.files[0]);
		$("#pub-con-gal").append('<div class="col-md-6 col-sm-12 mt-5"><img class="img-thumbnail" src="' + temporal + '"></div>');
	});
}
imagInput();*/

function menuForm (id, idError)
{
	var obj = Validador.empty($(id).val());
	$(id).focusout(function () 
	{
		if (!$(id).val()) 
		{
			
			$(idError).text(obj.error).addClass(obj.class);
			okMenu = obj.status;
		}
	});
	$(id).keyup(function () 
	{
		if ($(id).val())
		{
			$(idError).text("").removeClass(obj.class);
			okMenu = true;
		}
	});
}
menuForm("#entrante", "#entranteOK");
menuForm("#primerPlato", "#primerPlatoOK");
menuForm("#segundoPlato", "#segundoPlatoOK");
menuForm("#postre", "#postreOK");
menuForm("#titMenu", "#titMenuOK");
menuForm("#nombreMenu", "#nombreMenuOK");
function validarMenu(id, idError) {
    var obj = Validador.empty($(id).val());
    if (!$(id).val()) {
        $(idError).text(obj.error);
        $(idError).addClass(obj.class);
        okMenu = obj.status;
    };
}
function menuPost() {
    if (okMenu) {
        var urlOK = "http://www.mocky.io/v2/5a54dda32d000000315b1de3";
        var urlNOK = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
		Ajax("POST",urlNOK, limpiar(), serialize(document.getElementById("form-menu-restaurante")),"errorMenuRestaurante");
		alert ("Tu contenido ha sido publicado");
    }
}

function ofertasForm(id, idError)
{
	var obj = Validador.empty($(id).val());
	$(id).focusout(function () 
	{
		if (!$(id).val()) 
		{
			
			$(idError).text(obj.error).addClass(obj.class);
			okOferta = obj.status;
		}
	});
	$(id).keyup(function () 
	{
		if ($(id).val())
		{
			$(idError).text("").removeClass(obj.class);
			okOferta = true;
		}
	});
}
ofertasForm("#textoOferta", "#textoOfertaOK");
function validarOfertas(id, idError) {
    var obj = Validador.empty($(id).val());
    if (!$(id).val()) {
        $(idError).text(obj.error);
        $(idError).addClass(obj.class);
        okOferta = obj.status;
    };
}
function validarOfertasRadios(idRadio1, idRadio2, idError)
{
	//var obj = Validador.empty($(id).val());
	if ($(idRadio1).length > 0 || $(idRadio2).length > 0)
	{
		$(idError).text("");
        $(idError).removeClass("alert alert-danger");
	}
	else
		{
			$(idError).text("Campo vacío");
        	$(idError).addClass("alert alert-danger");
        	okOferta = false;
		}
}
function ofertasPost() {
    if (okOferta) {
        var urlOK = "http://www.mocky.io/v2/5a54dda32d000000315b1de3";
        var urlNOK = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
		Ajax("POST",urlNOK, limpiar(), serialize(document.getElementById("form-oferta-restaurante")),"errorOfertaRestaurante");
		alert ("Tu contenido ha sido publicado");
    }
}




function recetasForm(id, idError)
{
	var obj = Validador.empty($(id).val());
	$(id).focusout(function () 
	{
		if (!$(id).val()) 
		{
			
			$(idError).text(obj.error).addClass(obj.class);
			okRecetas = obj.status;
		}
	});
	$(id).keyup(function () 
	{
		if ($(id).val())
		{
			$(idError).text("").removeClass(obj.class);
			okRecetas = true;
		}
	});
}
recetasForm("#receta", "#recetaOK");
//recetasForm("#ingredientes", "#ingredientesOK");
recetasForm("#textoReceta", "#textoRecetaOK");
function validarRecetas(id, idError) {
    var obj = Validador.empty($(id).val());
    if (!$(id).val()) {
        $(idError).text(obj.error);
        $(idError).addClass(obj.class);
        ok = obj.status;
    };
}
function recetasPost() {
    if (okRecetas) {
        var urlOK = "http://www.mocky.io/v2/5a54dda32d000000315b1de3";
        var urlNOK = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
		Ajax("POST",urlNOK, limpiar(), serialize(document.getElementById("form-recetas-restaurante")),"errorRecetaRestaurante");
		alert ("Tu contenido ha sido publicado");
    }

}
function validarListaIngredientes(id, idError)
{
	if ($(id+" > li").length == 0)
	{
		//alert ("listaVacía");
		$(idError).text("Lista vacía");
        $(idError).addClass("alert alert-danger");	
		okRecetas = false;
	}
	else{
		$(idError).text("");
        $(idError).removeClass("alert alert-danger");
	}
}

function limpiar(){
  $("#titVideoOK").text("");
  $("#descVideoOK").text("");
  $("#urlVideoOK").text("");
  $("#textoVideoOK").text("");
}

$("#recetas-tab").add("#fotos-tab").add("#videos-tab").add("#ofertas-tab").add("#recetas-tab").click( function (){
   $("input").val("");
   $("textarea").val("");
   $("#errorRecetaRestaurante").html("");
});
$("#ofertas-tab").add("#fotos-tab").add("#videos-tab").add("#ofertas-tab").add("#recetas-tab").click( function (){
   $("input").val("");
   $("textarea").val("");
   $("#errorOfertaRestaurante").html("");
});
$("#fotos-tab").add("#menu-tab").add("#ofertas-tab").add("#recetas-tab").click( function (){
   $("input").val("");
   $("textarea").val("");
   $("#errorVideoResturante").html("");
});
$("#menu-tab").add("#fotos-tab").add("#videos-tab").add("#ofertas-tab").add("#recetas-tab").click( function (){
   $("input").val("");
   $("textarea").val("");
   $("#errorMenuRestaurante").html("");
});