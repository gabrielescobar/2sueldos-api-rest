var express         = require("express"),
    cors = require('cors'),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/personas', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

var corsOptions = {
    origin: 'http://localhost'
};

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/persona')(app, mongoose);
var PersonaCtrl = require('./controllers/personas');


// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var personas = express.Router();

personas.route('/register', cors(corsOptions))
    .post(PersonaCtrl.userRegister);

personas.route('/login')
    .post(PersonaCtrl.userLogin);

personas.route('/recover/:email')
    .get(PersonaCtrl.passwordRecover);





personas.route('/personas')
    .get(PersonaCtrl.findAllPersonas);

personas.route('/personas/:id')
    .put(PersonaCtrl.updatePersona)
    .delete(PersonaCtrl.deletePersona);
/* .get(PersonaCtrl.findById)*/

personas.route('/personas/rut/:rut')
    .get(PersonaCtrl.findByRUT);

app.use('/api', personas);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});