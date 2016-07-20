/**
 * Created by gabriel on 19/7/2016.
 */
//File: controllers/personas.js
var mongoose = require('mongoose');
var Persona  = mongoose.model('Persona');

//GET - Return all personas in the DB
exports.findAllPersonas = function(req, res) {
    Persona.find(function(err, personas) {
        if(err) res.send(500, err.message);

        console.log('GET /personas')
        res.status(200).jsonp(personas);
    });
};

//GET - Return a Persona with specified ID
/*exports.findById = function(req, res) {
    Persona.findById(req.params.id, function(err, persona) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(persona);
    });
};*/

exports.findByRUT = function(req, res) {
    Persona.find({rut: req.params.rut}, function(err, persona) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(persona);
    });
};


//POST - Insert a new Persona in the DB
// example
/*{
    "fullName": "Gabriel Escobar",
    "rut": "25406310-7",
    "telephone": 12345678,
    "address": "Santa Lucia 123",
    "email": "gabo9690@gmail.com",
    "password": "123",
    "accountOwner": "Gabriel Escobar",
    "accountRut": "25406310-7",
    "accountNumber": 1234567891011121314,
    "bankName": "BCI",
    "referredBy": "18406123-k"

}*/
exports.addPersona = function(req, res) {
   /* console.log('POST');
    console.log(req.body);*/

    var persona = new Persona({
        fullName:    req.body.fullName,
        rut: 	  req.body.rut,
        telephone:  req.body.telephone,
        address:   req.body.address,
        email:  req.body.email,
        password:    req.body.password,
        accountOwner:  req.body.accountOwner,
        accountRut:  req.body.accountRut,
        accountNumber:   req.body.accountNumber,
        bankName:  req.body.bankName
    });

    persona.save(function(err, persona) {
        if(err)
            return  res.status(500).send(err.message);
        res.status(200).jsonp(persona);
    });
};

//PUT - Update a register already exists
exports.updatePersona = function(req, res) {
    Persona.findById(req.params.id, function(err, persona) {
        persona.fullName   = req.body.fullName;
        persona.rut    = req.body.rut;
        persona.address = req.body.address;
        persona.email  = req.body.email;
        persona.password = req.body.password;
        persona.accountOwner   = req.body.accountOwner;
        persona.accountRut = req.body.accountRut;
        persona.accountNumber    = req.body.accountNumber;
        persona.bankName = req.body.bankName;

        persona.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(persona);
        });
    });
};

//DELETE - Delete a Persona with specified ID
exports.deletePersona = function(req, res) {
    Persona.findById(req.params.id, function(err, persona) {
        persona.remove(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200);
        })
    });
};