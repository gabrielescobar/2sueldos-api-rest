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


// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var dosSueldos = express.Router();


dosSueldos.route('/register').post(PersonaCtrl.userRegister);

dosSueldos.route('/login').post(PersonaCtrl.userLogin);

dosSueldos.route('/recover/:email').get(PersonaCtrl.passwordRecover);

dosSueldos.route('/refer').post(ReferidosCtrl.referAUser);





dosSueldos.route('/personas')
    .get(PersonaCtrl.findAllPersonas);

dosSueldos.route('/personas/:id')
    .put(PersonaCtrl.updatePersona)
    .delete(PersonaCtrl.deletePersona);
/* .get(PersonaCtrl.findById)*/

dosSueldos.route('/personas/rut/:rut')
    .get(PersonaCtrl.findByRUT);

app.use('/api', dosSueldos);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});