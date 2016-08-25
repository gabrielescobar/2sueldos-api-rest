/**
 * Created by gabriel on 19/7/2016.
 */
//File: controllers/referidos.js
var mongoose = require('mongoose');
var Persona  = mongoose.model('Persona');
var Delegated  = mongoose.model('Delegated');
var EmailCtrl = require('./emails.js');


//POST - Método para referenciar un amigo registrado en 2sueldos
// Ejemplo de json
/*{
 "email": "test@gmail.com",
 "rut": "25406319-3",
 "rutPadre": "25406319-3",
 "nombrePadre": "25406319-3"
 }*/
exports.delegateSale = function(req, res) {
    var sale = new Delegated({
        dateDelegated:  req.body.dateDelegated,
        rutParent:  req.body.rutParent,
        rutSeller:  req.body.rutSeller,
        status:  req.body.status,
        clientName:  req.body.clientName,
        clientEmail:  req.body.clientEmail,
        clientPhone:  req.body.clientPhone,
        clientAddress:  req.body.clientAddress
    });
    sale.save(function(err, sales) {
        console.log(err);
        if(err)
            return  res.status(500).send({"statusCode": 500, message: err.message});
        res.status(200).send({"statusCode": 200, sale: sales});

    });
};


//GET - Método para referenciar un amigo NO registrado en 2sueldos
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/refer/gabo9690@gmail.com/25406319-3/Gabriel Escobar
 */
exports.seeAllDsales = function(req, res) {
    Delegated.find({}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});

        res.status(200).send({"statusCode": 200, message: "test"});
    });
};


//POST - Método para hacer efectiva la referencia entre dos usuarios
// Ejemplo de json
/*{
 "rutParent": "11.723.156-9",
 "rutRefered": "25.406.319-3"
 }*/
exports.changeStatus = function(req, res) {
    Delegated.find({}, function(err, persona) {
        if (err)
            return res.status(500).send({"statusCode": 500, message: err.message});

        res.status(200).send({"statusCode": 200, message: "test"});
    });
};

