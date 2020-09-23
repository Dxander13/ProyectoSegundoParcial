const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fEmpleadoTemporal = new Schema({
    nombre:{ type: String}, 
    puesto: { type: String},    
    lugar: { type: String},  
    fingreso: { type: String},   
    telefono: { type: Number},
   
});

module.exports = mongoose.model('tb_EmpleadoTemporal',fEmpleadoTemporal);