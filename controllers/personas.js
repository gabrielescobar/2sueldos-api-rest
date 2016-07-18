/**
 * Created by gabriel on 18/7/2016.
 */

//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Persona  = mongoose.model('Persona');

//GET - Return all tvshows in the DB
exports.findAllPersonas = function(req, res) {
    Persona.find(function(err, personas) {
        if(err) res.send(500, err.message);

        console.log('GET /personas')
        res.status(200).jsonp(personas);
    });
};

//GET - Return a TVShow with specified ID
exports.findById = function(req, res) {
    Persona.findById(req.params.id, function(err, persona) {
        if(err)
            return res.send(500 , err.message);

        console.log('GET /persona/' + req.params.id);
        res.status(200).jsonp(persona);
    });
};