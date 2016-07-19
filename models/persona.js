/**
 * Created by gabriel on 19/7/2016.
 */
exports = module.exports = function(app, mongoose) {

    var personaSchema = new mongoose.Schema({
        fullName: 		{ type: String },
        rut: 		{ type: String },
        telephone: 	{ type: Number },
        address:  	{ type: String },
        email: 	{ type: String },
        password: 		{ type: String },
        accountOwner: 	{ type: String },
        accountRut:  	{ type: String },
        accountNumber: 	{ type: Number },
        bankName: 		{
            type: String,
            enum: ['BE', 'BC', 'BI', 'SB', 'BCI', 'CB', 'BICE', 'HSBC', 'BS', 'ITAU',
                'BTM', 'BSEC', 'BF', 'BR', 'BCON', 'BP', 'BBVA', 'COOP']
        },
        referredBy: 		{ type: String }
    });

    mongoose.model('Persona', personaSchema);

};