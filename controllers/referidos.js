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
 "rut": "25406319-3",
 "rutPadre": "25406319-3",
 "nombrePadre": "25406319-3"
 }*/
exports.referAUser = function(req, res) {
    Persona.find({$or: [{email: req.body.email}, {rut: req.body.rut}]}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});
        if (persona.length == 0)
            res.status(269).send({"statusCode": 269, message: "El correo ó rut ingresados no fueron encontrados"});
        else {
            if (persona[0].referredBy != "")
                res.status(269).send({"statusCode": 269, message: "Ese usuario ya fue referido por otro miembro de 2Sueldos"});
            else{
                EmailCtrl.referRegisterEmail(persona[0],req.body.rutPadre,req.body.nombrePadre);
                res.status(200).send({"statusCode": 200, message: "Se ha enviado un correo a " +persona[0].fullName+ " para la confirmación de referencia."});
            }

        }
    });
};


//GET - Método para referenciar un amigo NO registrado en 2sueldos
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/refer/gabo9690@gmail.com/25406319-3/Gabriel Escobar
 */
exports.referUnregisteredUser = function(req, res) {
    Persona.find({email: req.params.email}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});
        if (persona.length != 0)
            res.status(269).send({"statusCode": 269, message: "El correo ingresado esta registrado en el sistema"});
        else {
            EmailCtrl.referNoRegisterEmail(req.params.email,req.params.rut,req.params.name);
            res.status(200).send({"statusCode": 200, message: "Se ha enviado un correo a " + req.params.email + ", una vez se registre en el sistema sera tu referido automaticamente."});
        }
    });
};


//POST - Método para hacer efectiva la referencia entre dos usuarios
// Ejemplo de json
/*{
 "rutParent": "11.723.156-9",
 "rutRefered": "25.406.319-3"
 }*/
exports.addReference = function(req, res) {
    if (req.body.rutParent ==  req.body.rutRefered){
        res.status(269).send({"statusCode": 269, message: "Los rut de las persona referida y quien refiere no puede ser el mismo"});
    }
    else if (req.body.rutParent == "" ||  req.body.rutRefered==""){
        res.status(269).send({"statusCode": 269, message: "Error: alguno de los rut ingresados esta en blanco, si el error persiste contacte el administrador"});
    }
    else{
        Persona.find({rut: req.body.rutRefered}, function(err, persona) {
            if (err)
                return res.status(500).send({"statusCode": 500, message: err.message});

            if (persona[0].referredBy != "")
                res.status(269).send({"statusCode": 269, message: "Ya fuiste referido por alguien, no puedes tener dos referencias simultaneamente"});
            else{
                Persona.update({rut: req.body.rutRefered}, { $set: { referredBy: req.body.rutParent}}, false, true);
                res.status(200).send({"statusCode": 200, message: "Has sido referido exitosamente, comienza a cotizar seguros ahora!"});
            }
        });
    }
};


//GET - Método para eliminar la relación de un referido con su líder (Solo el líder puede usarla)
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/deleteRefered/11.723.156-9/Gabriel Escobar
 */
exports.deleteRefered = function(req, res) {
    Persona.find({rut: req.params.rut}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});
        if (persona[0].referredBy == "")
            res.status(269).send({"statusCode": 269, message: "Error al intentar elminar al usuario referido, intente más tarde"});
        else {
            Persona.update({rut: req.params.rut}, { $set: { referredBy: ""}}, false, true);
            EmailCtrl.referDeletedEmail(persona[0].email,req.params.name);
            res.status(200).send({"statusCode": 200, message: "Has eliminado tu relación con el usuario referido!"});
        }
    });
};


//GET - Método para eliminar la relación de un referido con su líder (Solo el líder puede usarla)
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/personas/refers/11.723.156-9
 */
exports.findAllMyRefereds = function(req, res) {
    Persona.find({referredBy: req.params.rut}, { fullName: 1, rut: 1, email: 1, _id:0 },function(err, personas) {
        if(err)
            return res.send(500, err.message);
        res.status(200).send({"statusCode": 200, usuarios: personas});
    });
};