const empleadotemporal = require("../modelos/modelEmpleadoT");


exports.test = (req,res)=>{
    res.send("Saludos desde la base de datos")
}


exports.empleadotemporal_data = async (req,res)=>{
  const empleadotemporales= await empleadotemporal.find();
  res.status(200).send({empleadotemporales});
}

//buscar empleado
exports.empleadotemporal_buscar = (req,res)=>{
    empleadotemporal.findById(req.params.id,function (err,empleado){
        if(err) return next(err);
        res.status(200).send(empleado)        
    })
}

//crear empleado
exports.empleadotemporal_crear = function (req, res, next) {   

    //instanciamos el objeto producto
  let  empleado = new empleadotemporal({
    nombre: req.body.nombre,
    puesto: req.body.puesto,
    lugar: req.body.lugar,
    fingreso: req.body.fingreso,
    telefono: req.body.telefono,    
    });
  
    //invocamos el metodo save de mongoose.
    empleado.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).send("Empleado Temporal Registrado con éxito");
    });
  };


  //actualizacion de datos
exports.empleadotemporal_actualizar = function (req, res) {
    empleadotemporal.findByIdAndUpdate(req.params.id, { $set: req.body },  (err, empleado)=> {
      if (err) return next(err);
      res.status(200).send("Empleado Temporal Actualizado");
    });
  };

  exports.empleadotemporal_eliminar = function(req, res){
    empleadotemporal.findByIdAndDelete(req.params.id, { $set: req.body }, (err,empleado)=>{
        if (err) return next(err);
        res.status(200).send("Empleado Temporal Eliminado");
    });
  };
  