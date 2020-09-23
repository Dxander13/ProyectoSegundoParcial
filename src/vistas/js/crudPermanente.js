
let dpi = document.getElementById('dpi');
let nip = document.getElementById('nip');
let primerNom = document.getElementById('primerNom');
let segundoNom = document.getElementById('segundoNom');
let primerApellido = document.getElementById('primerApellido');
let segundoApellido = document.getElementById('segundoApellido');
let fechaNac = document.getElementById('fechaNac');
let apellidoCasada = document.getElementById('apellidoCasada');
let pNom = document.getElementById('pNom');
let pFun = document.getElementById('pFun');
let dep= document.getElementById('dep');
let eIns = document.getElementById('eIns');
let ePer = document.getElementById('ePer');
let telCasa = document.getElementById('telCasa');
let Celular = document.getElementById('Celular');
let btnRegistrar = document.getElementById('btnRegistrar');
let btnActualizar = document.getElementById('btnActualizar');
let muestratabla = document.getElementById('muestratabla')
let id = document.getElementById('id')
let id3;

function traer() {
    fetch("http://34.72.26.51/permanente/data")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.empleadopermanentes)
        for(let i = 0; i<data.empleadopermanentes.length; i++){
            let id = data.empleadopermanentes[i]._id;
            muestratabla.innerHTML+=`
            <tr>
            <td>
                <button onclick="enviaractual('${id}')" type="submit"  class="btn btn-info " >Actualizar</button>
                <button onclick="borrar('${id}')" type="submit" class="btn btn-danger ">Borrar</button>
            </td>
            <td>${data.empleadopermanentes[i].dpi}</td>
            <td>${data.empleadopermanentes[i].nip}</td>
            <td>${data.empleadopermanentes[i].pnombre}</td>
            <td>${data.empleadopermanentes[i].snombre}</td>
            <td>${data.empleadopermanentes[i].papellido}</td>
            <td>${data.empleadopermanentes[i].sapellido}</td>
            <td>${data.empleadopermanentes[i].fnacimiento}</td>
            <td>${data.empleadopermanentes[i].apecasada}</td>
            <td>${data.empleadopermanentes[i].pnominal}</td>
            <td>${data.empleadopermanentes[i].pfuncional}</td>
            <td>${data.empleadopermanentes[i].einstitucional}</td>
            <td>${data.empleadopermanentes[i].epersonal}</td>
            <td>${data.empleadopermanentes[i].ntelcasa}</td>
            <td>${data.empleadopermanentes[i].ntelcelular}</td>            
            </tr>`
        }
      })
      .catch((error)=>{
          console.log(error)
      })
  }
  document.addEventListener("DOMContentLoaded", traer, false);


async function guardar (){
    await fetch("http://34.72.26.51/permanente/crear",{
        method: "POST",
        body: JSON.stringify({
            "dpi": dpi.value,
            "nip": nip.value,
            "pnombre": primerNom.value,
            "snombre": segundoNom.value,
            "papellido": primerApellido.value,
            "sapellido": segundoApellido.value,
            "fnacimiento": fechaNac.value,
            "apecasada": apellidoCasada.value,
            "pnominal": pNom.value,
            "pfuncional": pFun.value,
            "dep": dep.value,
            "einstitucional": eIns.value,
            "epersonal": ePer.value,
            "ntelcasa": telCasa.value,
            "ntelcelular": Celular.value,
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

btnRegistrar.addEventListener('click', guardar, false)


async function borrar (empleadosid){  
    await fetch(`http://34.72.26.51/permanente/${empleadosid}/eliminar`,{      
    method: 'DELETE'
    })    
muestratabla.innerHTML="";
    traer();
}
//boton.addEventListener('click',borrar,false)

async function enviaractual(empleadosid)  {
    await fetch(`http://34.72.26.51/permanente/${empleadosid}/buscar`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            id3 = data._id;
            id.value = data._id;
            dpi.value = data.dpi;
            nip.value = data.nip;
            primerNom.value = data.pnombre;
            segundoNom.value = data.snombre;
            primerApellido.value = data.papellido;
            segundoApellido.value = data.sapellido;
            fechaNac.value = data.fnacimiento;
            apellidoCasada.value = data.apecasada;
            pNom.value = data.pnominal;
            pFun.value = data.pfuncional;
            dep.value = data.dep;
            eIns.value = data.einstitucional;
            ePer.value = data.epersonal;
            telCasa.value = data.ntelcasa;
            Celular.value = data.ntelcelular;        
        })
}

id3=id.value

async function actualizar(){
    await fetch(`http://34.72.26.51/permanente/${id3}/actualizar`, {
        method: "PUT",
        body: JSON.stringify({
            "_id": id.value,
            "dpi": dpi.value,
            "nip": nip.value,
            "pnombre": primerNom.value,
            "snombre": segundoNom.value,
            "papellido": primerApellido.value,
            "sapellido": segundoApellido.value,
            "fnacimiento": fechaNac.value,
            "apecasada": apellidoCasada.value,
            "pnominal": pNom.value,
            "pfuncional": pFun.value,
            "dep": dep.value,
            "einstitucional": eIns.value,
            "epersonal": ePer.value,
            "ntelcasa": telCasa.value,
            "ntelcelular": Celular.value,
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
