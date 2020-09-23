
let Nombre = document.getElementById('nombre');
let Puesto = document.getElementById('puesto');
let Telefono = document.getElementById('telefono');
let Lugar = document.getElementById('lugar');
let Fecha = document.getElementById('fecha');
let btnRegistrar = document.getElementById('btnRegistrar');
let muestratabla= document.getElementById('muestratabla');
let btnActualizar = document.getElementById('btnActualizar');
let id = document.getElementById('id');
let id2;


 function mostrar() {
    fetch("http://34.72.26.51/temporal/data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.empleadotemporales)
        for(let i = 0; i<data.empleadotemporales.length;i++){
            let id = data.empleadotemporales[i]._id;
            muestratabla.innerHTML+=`
            <tr>
            <td>
                <button onclick="enviaractual('${id}')" type="submit"  class="btn btn-info " >Actualizar</button>
                <button onclick="borrar('${id}')" type="submit" class="btn btn-danger ">Borrar</button>
            </td>
            <td>${data.empleadotemporales[i].nombre}</td>
            <td>${data.empleadotemporales[i].puesto}</td>            
            <td>${data.empleadotemporales[i].lugar}</td>
            <td>${data.empleadotemporales[i].fingreso}</td>
            <td>${data.empleadotemporales[i].telefono}</td>
                     
            </tr>`
        }
      })
      .catch((error)=>{
          console.log(error)
      })
  }

  document.addEventListener("DOMContentLoaded", mostrar, false);

async function guardar (){

   await fetch("http://34.72.26.51/temporal/crear",{
        method: "POST",
        body: JSON.stringify({           
            "nombre": Nombre.value,
            "puesto": Puesto.value,
            "lugar": Lugar.value,
            "fingreso": Fecha.value,
            "telefono": Telefono.value,
            
        }),
        headers: {
            "Content-type": "application/json"
        }
        })
    .then(res => res.text())
    .then(data => {
        alert('Empleado Guardado Correctamente')
        console.log(data)
    })
    
    location.reload();
}

btnRegistrar.addEventListener('click',guardar,false)


async function borrar (empleadosid){  
    await fetch(`http://34.72.26.51/temporal/${empleadosid}/eliminar`,{
      
    method: 'DELETE'
    })    
muestratabla.innerHTML="";
    mostrar();
}
//boton.addEventListener('click',borrar,false)

function enviaractual(empleadosid){
    fetch(`http://34.72.26.51/temporal/${empleadosid}/buscar`)
        .then((res) => res.json())
        .then((data) =>{
            console.log(data)
            id2 = data._id;
            id.value = data._id;
            Nombre.value = data.nombre;
            Puesto.value = data.puesto;
            Lugar.value = data.lugar;
            Fecha.value = data.fingreso;
            Telefono.value = data.telefono;
                
        })
}

id2=id.value

async function actualizar(){
    await fetch(`http://34.72.26.51/temporal/${id2}/actualizar`, {
        method: "PUT",
        body: JSON.stringify({
            "_id": id.value,
            "nombre": Nombre.value,
            "puesto": Puesto.value,
            "lugar": Lugar.value,
            "fingreso": Fecha.value,
            "telefono": Telefono.value,
            
        }), headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.text())
    .then(data => {
        alert('Empleado Actualizado Correctamente')
        console.log(data)
    })
    
    location.reload();

   
}
btnActualizar.addEventListener('click', actualizar, false)
