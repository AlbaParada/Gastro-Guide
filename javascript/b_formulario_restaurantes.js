
window.onload = function () {


    function Restaurante(restaurante, nombre, apellidos, genero, correo, password, telefono, cp, poblacion, calle, numero) {

        this.restaurante = restaurante;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.genero = genero;
        this.correo = correo;
        this.password = password;
        this.telefono = telefono;
        this.cp = cp;
        this.poblacion = poblacion;
        this.calle = calle;
        this.numero = numero;


    }

    ////////////////////////////////////////////ONSUBMIT SI ESTA VACIO Y CHECKED///////////////////////////
    document.getElementById("formularioRestaurantes").onsubmit = function (evt) {
        var ok = true;

        evt.preventDefault();

        function validarVacio(nombre, err, fun) {

            var obj = Validador[fun]($(nombre).val());

            if (obj != null) {
                $(err).text(obj.error).addClass(obj.class);
                ok = obj.status;
                $(nombre).focus();

            }

   
        }

        function isChecked(val, err, fun) {

            $(err).empty().removeClass();

            var obj = Validador[fun](val);

            if (obj != null) {
                $(err).text(obj.error).addClass(obj.class);
                ok = obj.status;

            }
   
        }

        validarVacio('[name="restaurante"]', "#errorrestaurante", "restauranteVacio");
        validarVacio('[name="nombre"]', "#errornombre", "nombreVacio");
        validarVacio('[name="apellidos"]', "#errorapellidos", "apellidosVacio");
        validarVacio('[name="genero"]:checked', "#errorres-genero", "generoVacio");
        validarVacio('[name="email"]', "#erroremail", "correoVacio");
        validarVacio('[name="password"]', "#errorpassword", "passwordVacio");
        validarVacio('#password2', "#errorpassword2", "password2Vacio");
        validarVacio('[name="telefono"]', "#errortel", "telefonoVacio");
        validarVacio('[name="cp"]', "#errorcp", "cpVacio");
        validarVacio('[name="poblacion"]', "#errorpoblacion", "poblacionVacio");
        validarVacio('[name="calle"]', "#errorcalle", "calleVacio");
        validarVacio('[name="numero"]', "#errornumero", "numeroVacio");
        isChecked("#rescheckcheck", "#errorrescheck", "checked");

        if (ok) {

            var usuario = new Restaurante();

            usuario.restaurante = $('[name="restaurante"]').val();
            usuario.nombre = $('[name="nombre"]').val();
            usuario.apellidos = $('[name="apellidos"]').val();
            usuario.genero = $('[name="genero"]').val();
            usuario.correo = $('[name="email"]').val();
            usuario.password = $("#password2").val();
            usuario.telefono = $('[name="telefono"]').val();
            usuario.cp = $('[name="cp"]').val();
            usuario.poblacion = $('[name="poblacion"]').val();
            usuario.calle = $('[name="calle"]').val();
            usuario.numero = $('[name="numero"]').val();
 

            console.log(usuario);

            $.post("http://www.mocky.io/v2/5a70bab2330000534aff5e05", usuario, function (data) { console.log(data) });

        }

    }

    ///////////////////////////////////////////ONKEYUP REGEX////////////////////////////////////////////
    function validarRegex(val, fun, err) {

        $(err).empty().removeClass();

        var obj = Validador[fun](val);

        if (obj != null) {
            $(err).text(obj.error).addClass(obj.class);
            ok = obj.status;
        }
        
    }
    //////////////////////////////////////gritar Regex y excluir campos que no lo necessitan///////////////////////////
    $("form input")
        .not("#restaurante")
        .not("#password2")
        .not("#poblacion")
        .not("#calle")
        .not("#numero")
        .keyup(function () {
            var val = this.value;
            var fun = this.id + "Regex";
            var err = "#error" + this.id;

            validarRegex(val, fun, err);

        })
    ////////////////////////////////////comparar contraseñas/////////////////////////////////////////
    $("#password2").keyup(function () {

        $("#errorpassword2").empty().removeClass();

        var obj = Validador.password2Regex($("#password").val(), $("#password2").val());

        if (obj != null) {
            $("#errorpassword2").text(obj.error).addClass(obj.class);
            ok = obj.status
        }
      
    })

    ///////////////////////vaciar error de vacio al escribir para campos que no usan regex/////////////
    $("#restaurante").add("#poblacion").add("#calle").add("#numero").keyup(function () {

        var err = "#error" + this.id;

        $(err).empty().removeClass();

    })

    ///////////////////vaciar error al seleccionar radio o checkbox/////////////////////////////////////
    $("#res-hombre").add("#res-mujer").change(function () {

        $("#errorres-genero").empty().removeClass();

    })


    $("#rescheckcheck").change(function () {

        $("#errorrescheck").empty().removeClass();

    })

    function previewFormularioRestaurantes() {
        var output = document.getElementById("resImagePreview");
        output.src = URL.createObjectURL(event.target.files[0]);
    }

    document.getElementById("res-anadir").onchange = previewFormularioRestaurantes;

}
