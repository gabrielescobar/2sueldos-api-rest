/**
 * Created by gabriel on 19/7/2016.
 */
exports = module.exports = function(app, mongoose) {

    //Estructura para los vendedores de 2sueldos
    var personaSchema = new mongoose.Schema({
        fullName: 		{ type: String }, // Nombre completo del usuario
        rut: 		{ type: String }, // rut del usuario
        telephone: 	{ type: Number }, // telefono del usuario
        address:  	{ type: String }, // direccion completa del usuario
        email: 	{ type: String }, // correo del usuario
        password: 		{ type: String }, // contraseña del usuario !!!Actualmente esa en texto plano falta agregar encriptacion
        accountOwner: 	{ type: String }, // nombre completo de la persona a la que se le depositara las comisiones (puede o no ser el mismo dueño de la cuenta)
        accountRut:  	{ type: String }, // rut de la persona a la que se le depositara las comisiones (puede o no ser el mismo dueño de la cuenta)
        accountNumber: 	{ type: Number }, // numero de cuenta de la persona a la que se le depositara las comisiones
        bankName: 		{
            type: String,
            enum: ['BE', 'BC', 'BI', 'SB', 'BCI', 'CB', 'BICE', 'HSBC', 'BS', 'ITAU',
                'BTM', 'BSEC', 'BF', 'BR', 'BCON', 'BP', 'BBVA', 'COOP']
        },// codigos para los bancos registrados en el sistema, corresponde al siguiente orden de abajo:
        //BANCOESTADO
        //BANCO DE CHILE
        //BANCO INTERNACIONAL
        //SCOTIABANK-DESARROLLO
        //BANCO DE CREDITO E INVERSIONES
        //CORP-BANCA
        //BICE
        //HSBC BANK CHILE
        //BANCO SANTANDER
        //BANCO ITAU
        //THE BANK OF TOKYO-MITSUBISHI
        //BANCO SECURITY
        //BANCO FALABELLA
        //BANCO REPLAY
        //BANCO CONSORCIO
        //BANCO PARIS
        //BANCO BBVA
        //COOPEUCH
        referredBy: 		{ type: String },  //rut del usuario que lo refirio
        typeUser: 	{
            type: String,
            enum: ['primary', 'secundary', 'premium']
        },  //tipo de usuario
        delegate: 	{ type: Number }  //relacion de venta delegada
    });


    //Estructura para la relacion de venta delegada de 2sueldos
    var delegatedSchema = new mongoose.Schema({
        dateDelegated: 		{ type: String }, //Fecha de cuando se delego la venta, Nota: la fecha delegada se elimina tras 5 dias
        rutParent: 		{ type: String },  // rut del vendedor que delego la venta
        rutSeller: 	{ type: String },  // rut del vendedor al que se le delego la venta
        status: 		{
            type: String,
            enum: ['assigned','progress', 'finished', 'deleted']
        },  //status actual de la venta
        clientName:  	{ type: String },  //nombre del cliente proporcionado por el banco
        clientEmail: 	{ type: String },  //email del cliente proporcionado por el banco
        clientPhone: 		{ type: Number },  //telefono del cliente proporcionado por el banco
        clientAddress: 	{ type: String }  //direccion del cliente proporcionado por el banco
    });

    mongoose.model('Delegated', delegatedSchema);
    mongoose.model('Persona', personaSchema);


};
