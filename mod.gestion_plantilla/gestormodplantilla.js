var GestorModPlantilla = (function(){
	var template = null;
	var templ = null;  

	function renderiza(templateURL, queContenido){
		return _renderizadorHBS(templateURL,queContenido);
	}
	//RENDER FOTO
	function _renderizadorHBS (templateURL,queContenido){
		console.log(templateURL,queContenido);
		return new Promise(function (resolver,rejector){
			if(!template){
				$.get(templateURL, 'html').then(function (data) {
					template=Handlebars.compile(data);
					resolver(template(queContenido));
				});
			}
			else{
				resolver(template(queContenido));	
			}
		});	
	}	
	//RENDER RESTAURANTES
	function procesaPlantilla(plantilla){	
		return $.get(plantilla).then(function(data){
			templ = $.parseHTML(data).filter(function(){
				return 'div';
			});
			return templ;		
		});		
	}

	return {
		render:renderiza,
		procesa:procesaPlantilla
	}
})(); 





