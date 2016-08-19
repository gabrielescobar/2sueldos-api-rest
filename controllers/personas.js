/**
 * Created by gabriel on 19/7/2016.
 */
//File: controllers/personas.js
var mongoose = require('mongoose');
var Persona  = mongoose.model('Persona');
var EmailCtrl = require('./emails.js');


//POST - Método para el registro de usuario
// Ejemplo de json
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
exports.userRegister = function(req, res) {
    Persona.count({ $or: [ { rut: req.body.rut }
     /*   , { email: req.body.email } */
    ]}, function (err, count) {
        if (count > 0){
            res.status(269).send({"statusCode": 269, message: "El rut o correo ingresados ya estan registrados"});
        }
        else{
            var persona = new Persona({
                fullName:  req.body.fullName,
                rut:  req.body.rut,
                telephone:  req.body.telephone,
                address:  req.body.address,
                email:  req.body.email,
                password:  req.body.password,
                accountOwner:  req.body.accountOwner,
                accountRut:  req.body.accountRut,
                accountNumber:  req.body.accountNumber,
                bankName:  req.body.bankName,
                referredBy:  "",
                typeUser:  req.body.typeUser
            });

            persona.save(function(err, persona) {
                if(err)
                    return  res.status(500).send({"statusCode": 500, message: err.message});
                EmailCtrl.welcomeEmail(persona);
                persona._id = "";
                persona.password = "";
                persona.__v = "";
                res.status(200).send({"statusCode": 200, usuario: persona});

            });
        }
    });
};


//POST - Método para el login de un usuario al sistema
// Ejemplo de json
/*{
 "email": "San Francisco",
 "password": "Male"
 }*/
exports.userLogin = function(req, res) {
    Persona.find({$and: [{email: req.body.email}, {password: req.body.password}]}, { _id: 0, password: 0, __v: 0 }, function(err, persona) {
        if (persona.length == 0)
            res.status(269).send({"statusCode": 269, message: "El correo ó contraseña ingresados son incorrectos"});
        else {
            if (err)
                return res.status(500).send({"statusCode": 500, message: err.message});
            res.status(200).send({"statusCode": 200, usuario: persona[0]});
            
        }
    });

};


//GET - Método para recuperar el password de un usuario
// Ejemplo de llamada url
/*
* http://localhost:3000/api/passwordRecover/gabo9690@gmail.com
* */
exports.passwordRecover = function(req, res) {
    Persona.find({email: req.params.email}, function(err, persona) {
        if (persona.length == 0)
            res.status(269).send({"statusCode": 269, message: "El email ingresado no esta registrado en el sistema."});
        else {
            var newPassword = Math.random().toString(36).substr(2, 8);
            Persona.update({email: req.params.email}, { $set: { password: newPassword}}, false, true);
            EmailCtrl.recoverPassword(persona[0],newPassword);
            res.status(200).send({"statusCode": 200, message: "Tu nueva contraseña ha sido enviada a tu email."});
        }
    });
};



//GET - Método para consultar un usuario por su rut
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/personas/rut/11.723.156-9
 * */
exports.findByRUT = function(req, res) {
    Persona.find({rut: req.params.rut}, { fullName: 1, rut: 1, email: 1, _id:0 },function(err, persona) {
        if(err)
            return res.send(500, err.message);
        res.status(200).send({"statusCode": 200, usuario: persona[0]});
    });
};





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

/*exports.findByRUT = function(req, res) {
    Persona.find({rut: req.params.rut}, function(err, persona) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(persona);
    });
};*/




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
    Persona.remove({});
    res.status(200);
   /* Persona.findById(req.params.id, function(err, persona) {
        persona.remove(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200);
        })
    });*/
};