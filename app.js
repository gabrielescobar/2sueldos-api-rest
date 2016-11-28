var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/personas', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/persona')(app, mongoose);
var PersonaCtrl = require('./controllers/personas');
var ReferidosCtrl = require('./controllers/referidos');
var VentasDCtrl = require('./controllers/ventas');

// API routes
var dosSueldos = express.Router();

/*************************************************/
/*****Servicios para las funciones logue**********/
//POST - Registrar un usuario
dosSueldos.route('/register').post(PersonaCtrl.userRegister);
//POST - Login de usuario
dosSueldos.route('/login').post(PersonaCtrl.userLogin);
//GET - Recuperar contraseña
dosSueldos.route('/recover/:email').get(PersonaCtrl.passwordRecover);
/*************************************************/
/*************************************************/


/*************************************************/
/****Servicios para las funciones de referidos****/
//POST - Referir un usuario
dosSueldos.route('/refer').post(ReferidosCtrl.referAUser);
//GET - referir un amigo no registrado en 2sueldos
dosSueldos.route('/refer/:email/:rut/:name').get(ReferidosCtrl.referUnregisteredUser);
//POST - Generar referencia una vez aceptada la solicitud
dosSueldos.route('/reference').post(ReferidosCtrl.addReference);
//GET - Eliminar referencia entre amigos
dosSueldos.route('/deleteRefered/:rut/:name').get(ReferidosCtrl.deleteRefered);
/*************************************************/
/*************************************************/


/*************************************************/
/****Servicios para las funciones de usuario******/
//GET - Buscar un usuario por RUT
dosSueldos.route('/personas/rut/:rut').get(PersonaCtrl.findByRUT);
//GET - Buscar todos mis referidos (RUT)
dosSueldos.route('/personas/refers/:rut').get(ReferidosCtrl.findAllMyRefereds);
//GET - Buscar todos los usuarios de 2Sueldos
dosSueldos.route('/personas').get(PersonaCtrl.findAllPersonas);
//PUT - Actualizar un usuario
dosSueldos.route('/personas/:id').put(PersonaCtrl.updatePersona);

/*************************************************/
/*************************************************/


/*************************************************/
/****Servicios para las funciones de delegar******/
//POST - Delegar una venta
dosSueldos.route('/delegate').post(VentasDCtrl.delegateSale);
//POST - Asignar la venta delegada a un usuario
dosSueldos.route('/delegate/:id').post(ReferidosCtrl.addReference);
//POST - Cambiar el estatus de una venta delegada
dosSueldos.route('/delegate/changestatus').post(ReferidosCtrl.addReference);
/*************************************************/
/*************************************************/


app.use('/api', dosSueldos);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});