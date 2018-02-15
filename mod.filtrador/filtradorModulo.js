var FiltradoResultados = (function () {
    //INTENTO 1 : no filtra
    /*  function filtro(datosFiltrados) {
         console.log(datosFiltrados);
         return $.get("http://www.mocky.io/v2/5a6f2db530000053296fe514").then(function (data) {
             return $.grep(data, function (n, i) {
                 console.log(n.tags,datosFiltrados[0].tipoCocina)
                 return (n.tags === datosFiltrados[0].tipoCocina)
                 //&& n.tags == datosFiltrados.ambientes && n.nota == Math.floor(datosFiltrados.nota_opinion)
             }, true);
         }, );
     }; */

    // INTENTO 2 : filtra pero no discrimina entre cocina & ambiente
    /*          function filtro(tagsParaFiltrar) {  
                return $.get("http://www.mocky.io/v2/5a6f2db530000053296fe514").then(function (data) {
                    return data.filter(function (item) {
                        console.log(data,tagsParaFiltrar);
                        for(i=0;i<item.tags.length;i++){
                                if(tagsParaFiltrar[0].tipoCocina && tagsParaFiltrar[0].tipoCocina.includes(item.tags[i])) return true;
                                if(tagsParaFiltrar[1].ambientes && tagsParaFiltrar[1].ambientes.includes(item.tags[i])) return true;
                        }
                        // if(tagsParaFiltrar[2].nota_opinion && Math.floor(tagsParaFiltrar[0].nota_opinion.includes(item.nota))) return true;
                        return false;
                        //&& n.tags == datosFiltrados.ambientes && n.nota == Math.floor(datosFiltrados.nota_opinion)
                    });
                }, );
            };
        
            return {
                resultados: filtro
            } */

    function filtro(tagsParaFiltrar) {
        return $.get("http://www.mocky.io/v2/5a71a2f62f0000df1177633a").then(function (data) {
            return data.filter(function (restaurante) {
                var tipoCocinaFound, ambieteFound, notaFound = false;
                // Comprobamos si tiene el tipo de comida
                tipoCocinaFound = tagsParaFiltrar[0].tipoCocina ? restaurante.tags.filter((n) => tagsParaFiltrar[0].tipoCocina.includes(n)).length > 0 : true;
                ambienteFound = tagsParaFiltrar[1].ambientes ? restaurante.tags.filter((n) => tagsParaFiltrar[1].ambientes.includes(n)).length > 0 : true;
                notaFound = tagsParaFiltrar[2].nota_opinion ? parseFloat(restaurante.nota) >= parseFloat(tagsParaFiltrar[2].nota_opinion) : true;
                // ciudadFound = tagsParaFiltrar.buscar_adress && restaurante.ciudad == tagsParaFiltrar.buscar_adress ?  : true;
                return tipoCocinaFound && ambienteFound && notaFound;
            })
        })
    }
    function busqueda(stringAFiltrar) {
        return $.get("http://www.mocky.io/v2/5a71a2f62f0000df1177633a").then(function (data) {
            return data.filter(function (restaurante) {
                return restaurante.ciudad == stringAFiltrar[0].buscar_adress;
            })
        })
    }
    return {
        resultados: filtro,
        busquedas: busqueda
    }
})();