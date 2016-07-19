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
var EmailCtrl = require('./controllers/emails');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

// API routes
var personas = express.Router();
var email = express.Router();

personas.route('/email')
    .post(EmailCtrl.sendEmail);

personas.route('/personas')
    .get(PersonaCtrl.findAllPersonas)
    .post(PersonaCtrl.addPersona);

personas.route('/personas/:id')
    .get(PersonaCtrl.findById)
    .put(PersonaCtrl.updatePersona)
    .delete(PersonaCtrl.deletePersona);

app.use('/api', personas);

// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});