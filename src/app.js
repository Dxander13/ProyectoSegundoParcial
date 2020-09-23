const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');



const app = express();

//Conexion a Base de Datos  usuario y contrasenia  Dalex:123456@
mongoose.connect('mongodb://Dalex:123456@localhost:27017/RegistroEmpleados')
.then(db => console.log('Db RegistroEmpleados Conectada'))
.catch(err => console.log(err));



//Importando Rutas
const FormEmpleadoP = require('./rutas/rutaEmpleadoP');
const FormEmpleadoT = require('./rutas/rutaEmpleadoT');

//Configuraciones
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');


//Middlewares
app.use(helmet());
app.use(express.static(__dirname + '/vistas'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}); 
  

//Rutas
app.use('/permanente', FormEmpleadoP);
app.use('/temporal', FormEmpleadoT);
//app.use('/', FormEmpleadoP);


//Iniciando el Servidor
app.listen(app.get('port'), ()=>{
    console.log(`Esta escuchando el puerto ${app.get('port')}`)
});



