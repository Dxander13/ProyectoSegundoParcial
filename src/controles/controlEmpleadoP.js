const empleadopermanente =require('../modelos/modelEmpleadoP');



exports.test = (req,res)=>{
    res.send("Saludos desde la base de datos")
}


exports.empleadopermanente_data = async (req,res)=>{
  const empleadopermanentes= await empleadopermanente.find();
  res.status(200).send({empleadopermanentes});
}

//buscar empleado
exports.empleadopermanente_buscar = (req,res)=>{
    empleadopermanente.findById(req.params.id,function ( err, empleado){
        if(err) return next(err);
        res.status(200).send(empleado)        
    });
}

//crear empleado
exports.empleadopermanente_crear = function (req, res, next) {   

    //instanciamos el objeto producto
  let  empleado = new empleadopermanente({
    dpi: req.body.dpi,
    nip: req.body.nip,
    pnombre: req.body.pnombre,
    snombre: req.body.snombre,
    papellido: req.body.papellido,
    sapellido: req.body.sapellido,
    fnacimiento: req.body.fnacimiento,
    apecasada: req.body.apecasada,
    pnominal: req.body.pnominal,
    pfuncional: req.body.pfuncional,
    dep: req.body.dep,
    einstitucional: req.body.einstitucional,
    epersonal: req.body.epersonal,
    ntelcasa: req.body.ntelcasa,
    ntelcelular: req.body.ntelcelular,
    });
  
    //invocamos el metodo save de mongoose.
    empleado.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).send("Empleado Registrado con éxito");
    });
  };


  //actualizacion de datos
exports.empleadopermanente_actualizar = function (req, res) {
    empleadopermanente.findByIdAndUpdate(req.params.id, { $set: req.body },  (err, empleado)=> {
      if (err) return next(err);
      res.status(200).send("Empleado Actualizado");
    });
  };

  exports.empleadopermanente_eliminar = function(req, res){
    empleadopermanente.findByIdAndDelete(req.params.id, { $set: req.body }, (err,empleado) => {
        if (err) return next(err);
        res.status(200).send("Empleado Eliminado");
    });
  };
  