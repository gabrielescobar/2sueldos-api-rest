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

exports.passwordRecover = function(req, res) {}

exports.referredNewUser = function(req, res) {}

exports.referredRegisterUser = function(req, res) {}

//POST - Insert a new Persona in the DB
exports.sendEmail = function(req, res) {
    console.log('POST');
    console.log(req.body);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "Info 2Sueldos ✔ <2sueldosinfo@gmail.com>", // sender address
        to: "gabo9690@gmail.com", // list of receivers separated with ,
        subject: "Hello ✔", // Subject line
        text: req.body.text, // plaintext body
        html: "<b>Hello world ✔</b>" + req.body.text // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            return res.send(500, error);
        }else{
            res.status(200).jsonp(response.message);

        }

        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
};


