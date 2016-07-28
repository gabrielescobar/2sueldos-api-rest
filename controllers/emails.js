/**
 * Created by gabriel on 19/7/2016.
 */

var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "2sueldosinfo@gmail.com",
        pass: "gruntykite17"
    }
});

// generate ramdon password Math.random().toString(36).substr(2, 8)
//POST - Insert a new Persona in the DB
exports.recoverPassword = function() {
 /*   console.log('POST');
    console.log(req.body);*/

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: "gabo9690@gmail.com", // list of receivers separated with ,
        subject: "Cambio de contraseña", // Subject line
/*        text: req.body.text, // plaintext body*/
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

       '<h1 class="text-center">Olvidaste tu Contraseña?</h1>'+

   '<spacer size="16"></spacer>'+

       '<p class="text-center">No hay problema se te ha asignado la siguiente contraseña para acceder. Recuerda cambiarla una vez ingreses</p>'+
   '<span class="large expand">dsf354hdfg</span>'+

   '<hr/>'+
    '</columns>'+
   '</row>'+

   '<spacer size="16"></spacer>'+
       '</container>'
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
            return  error;
        }else{
          return  response.message;

        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
};


