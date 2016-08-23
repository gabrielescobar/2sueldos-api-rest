/**
 * Created by gabriel on 19/7/2016.
 */

var nodemailer = require("nodemailer");

// Método de transporte reusable (abre el pool de conexiones SMTP)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "2sueldosinfo@gmail.com",
        pass: "gruntykite17"
    }
});


var urlDosSueldos = "http://localhost/2Sueldos-web/#/";

//Método para el envio de correo de recuperación de contraseña
exports.recoverPassword = function(persona,password) {

    // Opciones de envio de correo
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: persona.email, // list of receivers separated with ,
        subject: "Cambio de contraseña", // Subject line
        html: '<style type="text/css">'+
    'body,'+
       ' html,'+
    '.body {'+
        'background: #f3f3f3 !important;'+
    '}'+
    '.header {'+
        'background: #f3f3f3;'+
    '}'+
   '</style>'+

   '<container>'+

   '<row class="header">'+
       '<columns>'+

       '<spacer size="16"></spacer>'+
   '</columns>'+
   '</row>'+
   '<row>'+
   '<columns>'+

   '<spacer size="32"></spacer>'+

       '<center>'+
       '<img src="http://2sueldos.com/assets/pages/media/gallery/logo_interna.png">'+
       '</center>'+

       '<spacer size="16"></spacer>'+

       '<h1 class="text-center">Olvidaste tu Contraseña '+ persona.fullName +'?</h1>'+

   '<spacer size="16"></spacer>'+

       '<p class="text-center">No hay problema se te ha asignado la siguiente contraseña para acceder. Recuerda cambiarla una vez ingreses</p>'+
   '<span class="large expand">'+ password +'</span>'+

   '<hr/>'+
    '</columns>'+
   '</row>'+

   '<spacer size="16"></spacer>'+
       '</container>'
    }

    // envia el correo con el objeto de transporte definido
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
            return  error;
        }else{
          return  response.message;

        }
        smtpTransport.close(); // Desconecta el pool de conexiones
    });
};

//Método para el envio de correo de bienvenida del usuario
exports.welcomeEmail = function(persona) {

    // Opciones de envio de correo
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: persona.email, // list of receivers separated with ,
        subject: "Bienvenido!!", // Subject line
        html: '<style type="text/css">'+
        'body,'+
        'html,'+
        '.body {'+
        'background: #f3f3f3 !important;'+
    '}'+
    '.container .header {'+
        'background: #f3f3f3;'+
    '}'+
    '.body-border {'+
        'border-top: 8px solid #663399;'+
    '}'+
    '</style>'+
    '<container class="header">'+
        '<row>'+
        '<columns>'+
        '<h1 class="text-center">Bienvenido '+persona.fullName+' a 2Sueldos</h1>'+
    '</columns>'+
    '</row>'+
    '</container>'+
    '<container class="body-border">'+
        '<row>'+
        '<columns>'+
        '<spacer size="32"></spacer>'+
        '<center>'+
        '<img src="http://2sueldos.com/assets/pages/media/gallery/logo_interna.png">'+
        '</center>'+
        '<spacer size="16"></spacer>'+
        '<h4>Tu usuario ha sido automaticamente creado tambien en la plataforma de cotizacion de bciSeguros.</h4>'+
    '<p>Comienza ya a referir y cotizar seguros!! no esperemas más por ese sueldo extra!.</p>'+
    '</columns>'+
    '</row>'+
    '<spacer size="16"></spacer>'+
        '</container>'
    }

    // envia el correo con el objeto de transporte definido
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            return  error;
        }else{
            return  response.message;

        }
        smtpTransport.close(); // Desconecta el pool de conexiones
    });
};

//Método para el envio de correo a un usuario referido registrado
exports.referRegisterEmail = function(persona,rutPadre,nombrePadre) {

    // Opciones de envio de correo
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: persona.email, // list of receivers separated with ,
        subject: nombrePadre + " te ha referido!!", // Subject line
        html: '<style type="text/css">'+
        'body,'+
        'html,'+
        '.body {'+
        'background: #f3f3f3 !important;'+
        '}'+
        '.container .header {'+
        'background: #f3f3f3;'+
        '}'+
        '.body-border {'+
        'border-top: 8px solid #663399;'+
        '}'+
        '</style>'+
        '<container class="header">'+
        '<row>'+
        '<columns>'+
        '<h1 class="text-center">'+persona.fullName+',Te ha enviado una invitacion para ser referido</h1>'+
        '</columns>'+
        '</row>'+
        '</container>'+
        '<container class="body-border">'+
        '<row>'+
        '<columns>'+
        '<spacer size="32"></spacer>'+
        '<center>'+
        '<img src="http://2sueldos.com/assets/pages/media/gallery/logo_interna.png">'+
        '</center>'+
        '<spacer size="16"></spacer>'+
        '<h4>'+ nombrePadre +' te ha invitado a ser su referido en 2Sueldos, para aceptar su invitacion debes acceder al enlace de abajo.</h4>'+
        '<p>'+urlDosSueldos+ 'referir/' +rutPadre+'/'+persona.rut +'</p>'+
        '</columns>'+
        '</row>'+
        '<spacer size="16"></spacer>'+
        '</container>'
    }

    // envia el correo con el objeto de transporte definido
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            return  error;
        }else{
            console.log(response.message);
            return  response.message;

        }
        smtpTransport.close(); // Desconecta el pool de conexiones
    });
};

//Método para el envio de correo a un usuario referido NO registrado
exports.referNoRegisterEmail = function(email,rut,name) {


    // Opciones de envio de correo
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: email, // list of receivers separated with ,
        subject: name + " te ha referido!!", // Subject line
        html: '<style type="text/css">'+
        'body,'+
        'html,'+
        '.body {'+
        'background: #f3f3f3 !important;'+
        '}'+
        '.container .header {'+
        'background: #f3f3f3;'+
        '}'+
        '.body-border {'+
        'border-top: 8px solid #663399;'+
        '}'+
        '</style>'+
        '<container class="header">'+
        '<row>'+
        '<columns>'+
        '<h1 class="text-center">'+name+', Te ha invitado a unirte a 2Sueldos!!</h1>'+
        '</columns>'+
        '</row>'+
        '</container>'+
        '<container class="body-border">'+
        '<row>'+
        '<columns>'+
        '<spacer size="32"></spacer>'+
        '<center>'+
        '<img src="http://2sueldos.com/assets/pages/media/gallery/logo_interna.png">'+
        '</center>'+
        '<spacer size="16"></spacer>'+
        '<h4>Para registrate en 2Sueldos debes acceder a la dirección de abajo, una vez registrado estarás aceptando automaticamente la referencia de '+name+'.</h4>'+
        '<p>'+urlDosSueldos+ 'registrar/' +rut +'</p>'+
        '</columns>'+
        '</row>'+
        '<spacer size="16"></spacer>'+
        '</container>'
    }

    // envia el correo con el objeto de transporte definido
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            return  error;
        }else{
            console.log(response.message);
            return  response.message;

        }
        smtpTransport.close(); // Desconecta el pool de conexiones
    });
};

//Método para el envio de correo a un referido eliminado para notificarle
exports.referDeletedEmail = function(email,name) {
    // Opciones de envio de correo
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: email, // list of receivers separated with ,
        subject: name + " te ha eliminado como referido", // Subject line
        html: '<style type="text/css">'+
        'body,'+
        'html,'+
        '.body {'+
        'background: #f3f3f3 !important;'+
        '}'+
        '.container .header {'+
        'background: #f3f3f3;'+
        '}'+
        '.body-border {'+
        'border-top: 8px solid #663399;'+
        '}'+
        '</style>'+
        '<container class="header">'+
        '<row>'+
        '<columns>'+
        '<h1 class="text-center">'+name+', te ha eliminado como referido</h1>'+
        '</columns>'+
        '</row>'+
        '</container>'+
        '<container class="body-border">'+
        '<row>'+
        '<columns>'+
        '<spacer size="32"></spacer>'+
        '<center>'+
        '<img src="http://2sueldos.com/assets/pages/media/gallery/logo_interna.png">'+
        '</center>'+
        '<spacer size="16"></spacer>'+
        '</columns>'+
        '</row>'+
        '<spacer size="16"></spacer>'+
        '</container>'
    }

    // envia el correo con el objeto de transporte definido
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            return  error;
        }else{
            console.log(response.message);
            return  response.message;

        }
        smtpTransport.close(); // Desconecta el pool de conexiones
    });
};