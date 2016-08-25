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
        referredBy: 		{ type: String },
        typeUser: 	{
            type: String,
            enum: ['primary', 'secundary', 'premium']
        },
        delegate: 	{ type: Number }
    });


    var delegatedSchema = new mongoose.Schema({
        dateDelegated: 		{ type: String },
        rutParent: 		{ type: String },
        rutSeller: 	{ type: String },
        status: 		{
            type: String,
            enum: ['assigned','progress', 'finished', 'deleted']
        },
        clientName:  	{ type: String },
        clientEmail: 	{ type: String },
        clientPhone: 		{ type: Number },
        clientAddress: 	{ type: String }
    });

    mongoose.model('Delegated', delegatedSchema);
    mongoose.model('Persona', personaSchema);


};

/*

exports = module.exports = function(app, mongoose) {



};*/
