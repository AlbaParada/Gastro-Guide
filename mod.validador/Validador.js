var Validador = (function () {

    var _vacio = function (val, err) {

        if (!val) {

            return {
                error: err,
                class: "alert alert-danger",
                status: false
            };
        } else return null;

    }

    var _checked = function (val, err) {
        if (!$(val).is(":checked")) {
            return {
                error: err,
                class: "alert alert-danger",
                status: false
            };
        }
        else return null;
    }

    var _regex = function (rx, val, err) {

        var rg = rx;
        if (rg.test(val) == false) {
            return {
                error: err,
                class: "alert alert-danger",
                status: false
            }
        }
        else return null;

    }

    var _equalTo = function (val1,val2,err) {

        if (val1 != val2) {
            return {
                error: err,
                class: "alert alert-danger",
                status: false
            }
        }
        else return null;
    }


    var restauranteVacio = function (val) {

        return _vacio(val, "Por favor introduzca el nombre de su restaurante");

    }

    var nombreVacio = function (val) {

        return _vacio(val, "Por favor introduzca su nombre");

    }

    var apellidosVacio = function (val) {

        return _vacio(val, "Por favor introduzca sus apellidos");

    }


    var generoVacio = function (val) {

        return _vacio(val, "Por favor seleccione su género");

    }


    var correoVacio = function (val) {

        return _vacio(val, "Por favor introduzca su correo electrónico");

    }

    var passwordVacio = function (val) {

        return _vacio(val, "Por favor introduzca una contraseña");

    }

    var password2Vacio = function (val) {

        return _vacio(val, "Por favor confirme su contraseña");

    }

    var telefonoVacio = function (val) {

        return _vacio(val, "Por favor introduzca su teléfono en formato correcto");

    }


    var cpVacio = function (val) {

        return _vacio(val, "Por favor introduzca su código postal");

    }

    var poblacionVacio = function (val) {

        return _vacio(val, "Por favor introduzca su población");

    }

    var calleVacio = function (val) {

        return _vacio(val, "Por favor introduzca su calle, vía, etc.");
   
    }

    var numeroVacio = function (val) {

        return _vacio(val, "Por favor introduzca su número");
    
    }

    var checked = function (val) {

        return _checked(val, "Tiene que aceptar las condiciones legales");
    }

    var nombreRegex = function (val) {
        var nombrereg = /^[\s a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
        return _regex(nombrereg, val, "Su nombre no puede contener números o caracteres especiales");
    }

    var apellidosRegex = function (val) {

        var apellidosreg = /^[\s a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
        return _regex(apellidosreg, val, "Su apellido no puede contener números o caracteres especiales");
    }

    var emailRegex = function (val) {

        var emailreg = /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
        return _regex(emailreg, val, "Por favor introduzca su correo electrónico en formato correcto");
    }

    var passwordRegex = function (val) {

        var passwordreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return _regex(passwordreg, val, "Su contraseña debe contener por lo menos 8 caracteres y contener una letra mayúscula, una minúscula y un número");
    }


    var telRegex = function (val) {

        var telefonoreg = /^[0-9]{9}$/;
        return _regex(telefonoreg, val, "Por favor introduzca su teléfono en formato correcto");
    }
    var cpRegex = function (val) {
		//	/^(?=.*[0-9])(?=.{4})/
        var cpreg = /^[0-9]{5}$/;
        return _regex(cpreg, val, "Por favor introduzca su código postal en formato correcto");
    }
    var password2Regex = function (val1,val2) {

        return _equalTo(val1,val2,"Las contraseñas no coinciden");
    }
	/////////////Arnau
 	var video = function (val) {

        if (!val) {

            return {
                error: "Campo vacío",
                class: "alert alert-danger",
                status: false
			}
        }
    }
	var videoUrl = function (val) {
		var urlRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
		if (urlRegExp.test(val))
		{
			return {ok:"ok"}
		}
		else
			{
				return {
					error: "Url incorrecta",
					class: "alert alert-danger",
					status: false
				}
			}
	}
	var empty = function (val)
	{
		 if (!val) {

            return {
                error: "Campo vacío",
                class: "alert alert-danger",
                status: false
			}
        }
	}
    return {
        restauranteVacio: restauranteVacio,
        nombreVacio: nombreVacio,
        apellidosVacio: apellidosVacio,
        generoVacio: generoVacio,
        correoVacio: correoVacio,
        passwordVacio: passwordVacio,
        password2Vacio: password2Vacio,
        telefonoVacio: telefonoVacio,
        cpVacio: cpVacio,
        poblacionVacio: poblacionVacio,
        calleVacio: calleVacio,
        numeroVacio: numeroVacio,
        checked: checked,
        nombreRegex: nombreRegex,
        apellidosRegex: apellidosRegex,
        emailRegex: emailRegex,
        passwordRegex: passwordRegex,
        password2Regex: password2Regex,
        telRegex: telRegex,
        cpRegex: cpRegex,
		//Arnau
		video: video,
		videoUrl: videoUrl,
		empty: empty,
        
    }

})();