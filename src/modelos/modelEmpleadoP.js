const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fEmpleadoPermanente = new Schema({
    dpi:{ type: Number},
    nip:{ type: Number},
    pnombre:{ type: String},
    snombre: { type: String},
    papellido: { type: String},
    sapellido: { type: String},
    fnacimiento: { type: String},
    apecasada: { type: String},
    pnominal: { type: String},
    pfuncional: { type: String},
    dep: { type: String},
    einstitucional: { type: String},
    epersonal: { type: String},
    ntelcasa: { type: Number},
    ntelcelular:{ type: Number},

});

module.exports = mongoose.model('tb_EmpleadoPermanente',fEmpleadoPermanente);