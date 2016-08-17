/**
 * Created by gabriel on 19/7/2016.
 */
//File: controllers/referidos.js
var mongoose = require('mongoose');
var Persona  = mongoose.model('Persona');
var EmailCtrl = require('./emails.js');

//POST - Método para referenciar un amigo registrado en 2sueldos
// Ejemplo de json
/*{
 "email": "test@gmail.com",
 "rut": "25406319-3"
 }*/
exports.referAUser = function(req, res) {
    Persona.find({$or: [{email: req.body.email}, {rut: req.body.rut}]}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});
        if (persona.length == 0)
            res.status(269).send({"statusCode": 269, message: "El correo ó rut ingresados no fueron encontrados"});
        else {
            if (persona[0].referredBy != "")
                res.status(269).send({"statusCode": 269, message: "Ese usuario ya fue referido por alguien"});
            else{
                res.status(200).send({"statusCode": 200, message: "Se ha enviado un correo a " +persona[0].fullName+ " para la confirmación de referencia."});
            }

        }
    });
};


//POST - Método para referenciar un amigo registrado en 2sueldos
// Ejemplo de json
/*{
 "email": "test@gmail.com",
 "rut": "25406319-3"
 }*/
exports.referUnregisteredUser = function(req, res) {
    Persona.find({email: req.params.email}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});
        if (persona.length != 0)
            res.status(269).send({"statusCode": 269, message: "El correo ingresado esta registrado en el sistema"});
        else {
            res.status(200).send({"statusCode": 200, message: "Se ha enviado un correo a " + req.params.email + ", una vez se registre en el sistema sera tu referido automaticamente."});
        }
    });
};


exports.addReferens = function(req, res) {
};
exports.deleteRefered = function(req, res) {
};
exports.findMyRefers = function(req, res) {
};
exports.findwhoReferedMe = function(req, res) {
};