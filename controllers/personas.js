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
 "referredBy": "18406123-k",
 "typeUser": "Secondary",
 "delegate": "18406123-k"
 }*/
exports.userRegister = function(req, res) {

    var delegate = -1;

    //Validacion - El usuario a registrar no puede ingresar un RUT o Correo ya registrados en 2Sueldos
    Persona.count({ $or: [ { rut: req.body.rut }
        , { email: req.body.email }
    ]}, function (err, count) {
        if (count > 0){
            res.status(269).send({"statusCode": 269, message: "El rut o correo ingresados ya estan registrados"});
        }
        else{
            if(req.body.typeUser == "secundary"){
                delegate = 0;
            }

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
                typeUser:  req.body.typeUser,
                delegate: req.body.delegate
            });

            persona.save(function(err, persona) {
                if(err)
                    return  res.status(500).send({"statusCode": 500, message: err.message});
                EmailCtrl.welcomeEmail(persona);
                persona._id = "";
                persona.password = "";
                persona.__v = "";
                //Retorno el objeto creado sin incluir el password
                res.status(200).send({"statusCode": 200, usuario: persona});

            });
        }
    });
};


//POST - Método para el login de un usuario al sistema
// Ejemplo de json
/*{
 "email": "test@gmail.com",
 "password": "Masdfsdle"
 }*/
exports.userLogin = function(req, res) {
    // Busco usuario con el email Y contraseña ingresados, retorno el objeto encontrado sin incluir el password
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
            //Genero un nuevo password al azar
            var newPassword = Math.random().toString(36).substr(2, 8);
            //reemplazo el password viejo y envio correo con el nuevo password
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
    // Busco usuario usando su RUT, retorno el objeto encontrado sin incluir el password
    Persona.find({rut: req.params.rut}, { fullName: 1, rut: 1, email: 1, _id:0 },function(err, persona) {
        if(err)
            return res.send(500, err.message);
        res.status(200).send({"statusCode": 200, usuario: persona[0]});
    });
};




//GET - Método para consultar todos los usuarios del sistema
// Ejemplo de llamada url
/*
 * http://localhost:3000/api/personas/rut/
 * */
exports.findAllPersonas = function(req, res) {
    Persona.find(function(err, personas) {
        if(err) res.send(500, err.message);
        res.status(200).jsonp(personas);
    });
};


//PUT - Método para actualizar un usuario usando su rut
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
 "referredBy": "18406123-k",
 "typeUser": "Secondary",
 "delegate": "18406123-k"
 }*/
exports.updatePersona = function(req, res) {

    Persona.findById(req.params.rut, function(err, persona) {
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

