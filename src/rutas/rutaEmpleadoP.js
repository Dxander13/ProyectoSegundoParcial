const express = require ('express');
const { check, validationResult} = require('express-validator');
const empleadoPer = require('../modelos/modelEmpleadoP')

const router = express.Router();
const empleadoP = require ('../controles/controlEmpleadoP')


router.get('/',(req, res) => { 
    res.render('index');
});

router.get("/:data", empleadoP.empleadopermanente_data)

router.post("/crear", [check ("dpi").isLength({min:11})], (req, res, next) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    }
    let empleado = new empleadoPer({
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

        empleado.save(function (err){
            if (err) {
                return next(err);
            }
            res.status(201).send("Empleado Registrado ");
        });
});

router.get('/:id/buscar', empleadoP.empleadopermanente_buscar);

router.put("/:id/actualizar", empleadoP.empleadopermanente_actualizar);

router.delete("/:id/eliminar", empleadoP.empleadopermanente_eliminar);


module.exports = router;
