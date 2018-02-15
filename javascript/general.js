///// Recoger todos los datos de un form
function serialize(form) {
    var data;
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }

        switch (form.elements[i].nodeName.toUpperCase()) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'date':
                    case 'search':
                    case 'hidden':
                    case 'range':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            //si es una array
                            if (!q[form.elements[i].name]) q[form.elements[i].name] = [];
                            q[form.elements[i].name].push(form.elements[i].value);
                            //ORIGINAL
                            // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            //si es un string
                            // if (!q[form.elements[i].name]) q[form.elements[i].name] = '';
                            // q[form.elements[i].name]+='&' + encodeURIComponent(form.elements[i].value);
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                q[form.elements[i].name] = form.elements[i].value;
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                q[form.elements[i].name] = form.elements[i].options[j].value;
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        // q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        q[form.elements[i].name] = form.elements[i].value;
                        break;
                }
                break;
        }
    }
    data = q;
    //console.log(q);
    return data;
}
///// Request de datos al servidor
function Ajax(method, url, onSuccess, pinfo, iderror) {
    let getData = new XMLHttpRequest();
    let info = pinfo || null; //email=e@e.es&pass=xxx
    getData.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (onSuccess) onSuccess(JSON.parse(this.responseText));
            } else {
                document.getElementById(iderror).innerText = "Error de servidor. Por favor inténtelo de nuevo en unos segundos.";
                $('#' + iderror).attr('class', 'alert alert-danger');
            }
        }
        if (this.status != 200) {}
    };
    getData.open(method, url, true);
    getData.send(info);
};

////// Se utiliza para concatenar el codigo HTML
function composicion(como, donde, lista) {
    let contenido = "";
    lista.forEach(composicion => {
        contenido += como.renderizar(composicion);
    })
    if (donde) {
        donde.innerHTML += contenido;
    }
};

///////Filtro de resultados en la barra del buscador
class BuscadorCocina {
    static renderizar(datos) {
        return `
       <option value="${datos}"> ${datos}</option>
    `;
    }
};
class BusquedaCocina {
    constructor() {
        this.listas = null; //esto sirve para indicar que no tiene nada.
    }
    obtenerDatos() {
        let buscando = document.getElementById("selc-cocina");
        let okUrl = "http://www.mocky.io/v2/5a5a49262e0000231971fb30";
        let badUrl = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
        Ajax("GET", okUrl, (datos) => {
            composicion(BuscadorCocina, buscando, datos.tipoDeCocina);
        }, null, "errorbusqueda");
    };
};
let buscandoCocina = new BusquedaCocina();
buscandoCocina.obtenerDatos();

////// Validacion direccion y fecha del buscador
function ValidationBusqueda(eFecha, eBusqueda, bAdress, bFecha) {
    //var mql = window.matchMedia('screen and (min-width:320px) and (max-width:480px)');
    if (eBusqueda) {
        eBusqueda.html("");
    }
    if (eFecha) {
        eFecha.html("");
    }
    let adressval = /^[\s 0-9a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
    if (adressval.test(bAdress) == false) {
        eBusqueda.html("Por favor introduzca una dirección valida");
        eBusqueda.attr('class', 'FormResError');
        return false;
    }
    if (!bAdress) {
        eBusqueda.html("Por favor introduzca una localidad");
        eBusqueda.attr('class', 'FormResError');
        return false;
    }
    if (eFecha && !bFecha && bAdress && adressval.test(bAdress)) {
        eFecha.html("Por favor introduzca una fecha");
        eFecha.attr('class', 'FormResError');
        return false;
    }
    return (true);
};

if (document.getElementById('buscar_submit')) {
    $('#btn_busqueda').click(function (env) {
        env.preventDefault();
        var dat = [];
        dat.push(serialize(document.getElementById("buscar_submit")));
        if (ValidationBusqueda($("#errorfecha"), $("#errorbusqueda"), $('#buscarAdress').val(), $('#buscarFecha').val())) {
            Ajax("POST", "http://www.mocky.io/v2/5a54dda32d000000315b1de3", function () {
                window.location.href = 'b_filtrar.html'
                console.log(dat);
            }, dat, "errorbusqueda");
        }
    });
};
if (document.getElementById('buscar_submit')) {
    $('#btn_busqueda_filtro').click(function (env) {
        env.preventDefault();
        var dat = [];
        dat.push(serialize(document.getElementById("buscar_submit")));
        if (ValidationBusqueda($("#errorfecha"), $("#errorbusqueda"), $('#buscarAdress').val(), $('#buscarFecha').val())) {
            Ajax("POST", "http://www.mocky.io/v2/5a54dda32d000000315b1de3", function () {
                // window.location.href = 'b_filtrar.html'
                console.log(dat);
                FiltradoResultados.busquedas(dat).then(function (data) {
                    var x = 0;
                    if (x == data.length) {
                        $('#section-fichas').html('<div class="alert alert-danger">Lo sentimos actualemnte no hay ningun restaurante que cumpla con estas caracterisiticas</div>')
                    }
                    if (data.length > x) {
                        let fichas = document.getElementById("section-fichas");
                        fichas.innerHTML = "";
                        let contenido = "";
                        console.log(data)
                        data.forEach(restaurante => {
                            contenido += Restaurante.pintaRest(restaurante);
                        });
                    }
                })
            }, dat, "errorbusqueda");
        }
    });
};


if (document.getElementById('selector-buscador-mvl')) {
    $('#selector-buscador-mvl').click(function (e) {
        e.preventDefault();
        let ciudad = $('#buscar_adress_mvl').val();
        $('#address_ModalLabel').html(ciudad);
        let okUrl = "http://www.mocky.io/v2/5a5a49262e0000231971fb30";
        let badUrl = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
        let mvlbsc = document.getElementById('modal-cocina');
        if (ValidationBusqueda(null, $("#mvl_eBusqueda"), $('#buscar_adress_mvl').val(), null)) {
            $('#myModal').modal('show');
            $.getJSON(okUrl, (datos) => {
                    composicion(BuscadorCocina, mvlbsc, datos.tipoDeCocina);
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#mvl_eFecha').html("Lo sentimos ha habido un error en el servidor, por favor pruebe más tarde");
                    $('#mvl_eFecha').attr('class', 'text-danger');
                });;
        }
    });
    $('#btn-mvl').click(function (ev) {
        ev.preventDefault();
        let okUrl = "http://www.mocky.io/v2/5a3b8528300000aa0e82d1e4";
        let badUrl = "http://www.mocky.io/v2/5a5cb2262e0000e3109f83d9";
        if (ValidationBusqueda($('#mvl_eFecha'), $("#mvl_eBusqueda"), $('#buscar_adress_mvl').val(), $('#fecha_mvl').val())) {
            $.post(okUrl, serialize(document.getElementById("form_buscar_submit")), function () {
                    $('#myModal').modal('hide');
                    window.location.href = 'b_filtrar.html';
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#mvl_eFecha').html("Lo sentimos ha habido un error en el servidor, por favor pruebe más tarde");
                    $('#mvl_eFecha').attr('class', 'text-danger');
                });
        }
    });
};