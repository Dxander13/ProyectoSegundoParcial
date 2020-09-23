const express = require ('express');
const router = express.Router();
const empleadoT = require ('../controles/controlEmpleadoT')

router.get('/:data', empleadoT.empleadotemporal_data)

router.post('/crear', empleadoT.empleadotemporal_crear)

router.get("/:id/buscar", empleadoT.empleadotemporal_buscar);

router.put("/:id/actualizar", empleadoT.empleadotemporal_actualizar);

router.delete("/:id/eliminar", empleadoT.empleadotemporal_eliminar);


module.exports = router;