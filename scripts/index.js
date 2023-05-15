let data
let search = document.getElementById("search")
let seccion = document.getElementById("idseccion") 
let formulario = document.getElementById("formularioEventos")
let containerCheckbox = document.getElementById("containerCheckbox")
const links = document.querySelectorAll(".navbar-nav li a");

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(infoData => {
    data = infoData
    console.log(data);
    let categoria = data.events.map((evento) => evento.category)
    let setCategoria = new Set(categoria)
    let arrayCategoria = Array.from(setCategoria)

    llenarSeccion(data.events, seccion)
    const templateCheckbox = arrayCategoria.reduce(funcionReduce, ``)
    containerCheckbox.innerHTML = templateCheckbox

    search.addEventListener("input",(e)=>{
      let filtrarPorEvento = filtrarPorEventos(data.events)
      let filtrarPorBusqueda = filtrarPorName(filtrarPorEvento, search.value)
      llenarSeccion(filtrarPorBusqueda,seccion)
      }
    )
    containerCheckbox.addEventListener("change", (e)=>{
      let filtrarPorEvento = filtrarPorEventos(data.events)
      let filtrarPorBusqueda = filtrarPorName(filtrarPorEvento, search.value)
      llenarSeccion(filtrarPorBusqueda,seccion)
    })
    

  })
  .catch(error => console.error(error))

const currentUrl = window.location.href;
for (let link of links) {
  if (link.href === currentUrl) {
    // padre de link (a) que es li 
    link.parentElement.classList.add("active");
  }
}

let eventoMostrado = []

function crearCard(evento){
    return `<article class="card col-10 col-md-5 col-lg-4 col-xl-3 col-xxl-4 articles mt-4" id="articleCard">
    <img src="${evento.image}" class="card-img-top" alt="img">
    <div class="card-body">
      <h5 class="card-title">${evento.name}</h5>
      <div class="d-flex justify-content-between">
      <p class="card-text text-secondary">${evento.category}</p>
      <p class="card-text text-secondary">${evento.date}</p>
      </div>
      <p class="card-text">${evento.description}</p>
      <div class="d-flex justify-content-between align-items-center">
        <p class="card-text mt-2">${evento.price}</p>
        <a href="./details.html?id=${evento._id}" class="btn btn-secondary">Go somewhere</a>
      </div>
    </div>
  </article>`
}

function llenarSeccion(data, elemento){
    elemento.innerHTML = ""
    let newTemplate = ""
    data.forEach( evento => newTemplate += crearCard(evento) )
    elemento.innerHTML = newTemplate
}

 function filtrarPorName(data, search){
   let filtrarPorNames= data.filter((evento) => evento.name.toLowerCase().includes(search.toLowerCase()))
    return filtrarPorNames
 }


const funcionReduce = (acumulador, elementoActual, indice, array) =>{
  return acumulador += `<div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="${elementoActual}" value="${elementoActual}" />
                          <label class="form-check-label" for="${elementoActual}">${elementoActual}</label>
                        </div>`
}


function filtrarPorEventos(data){
  const categoria = Array.from( document.querySelectorAll(`input[type="checkbox"]:checked`)).map((check) =>check.value)
  if(categoria.length == 0){
    return data
  }
  return data.filter((evento) => categoria.includes(evento.category))
}

console.log(data)