let data

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(infoData => {
    data = infoData
    console.log(data);
    let categoria = data.events.map((evento) => evento.category)
    //let categoria = data.events.map((evento) => evento.category)
    let setCategoria = new Set(categoria)
    let arrayCategoria = Array.from(setCategoria)
    const fechaAntesdeCurrentDate = data.events.filter((evento) => evento.date > data.currentDate)
    const templateCheckbox = arrayCategoria.reduce(funcionReduce, ``)
    containerCheckbox.innerHTML = templateCheckbox
    llenarSeccion(fechaAntesdeCurrentDate, seccion)
    search.addEventListener("input",()=>{
      filtrarPorBusqueda = filtrarPorName(fechaAntesdeCurrentDate, search.value)
      console.log(filtrarPorBusqueda)
      llenarSeccion(filtrarPorBusqueda ,seccion)
      
      })

    containerCheckbox.addEventListener("change", (e)=>{
      const checkboxChecked = Array.from( document.querySelectorAll(`input[type="checkbox"]:checked`)).map((check) =>check.value)
      const eventoFiltrado = filtrarPorEventos(fechaAntesdeCurrentDate, checkboxChecked)
        llenarSeccionConBusqueda(eventoFiltrado,seccion)
      
      })
      
      function filtrarPorEventos(fechaAntesdeCurrentDate, categoria){
        if(categoria.length == 0){
          return fechaAntesdeCurrentDate
          }
          return fechaAntesdeCurrentDate.filter((evento) => categoria.includes(evento.category))
      }
    })
  .catch(error => console.error(error))



seccion = document.getElementById("idseccion") 
let formulario = document.getElementById("formularioEventos")
let search = document.getElementById("search")
let containerCheckbox = document.getElementById("containerCheckbox")

const currentUrl = window.location.href;
const links = document.querySelectorAll(".navbar-nav li a");
for (let link of links) {
  if (link.href === currentUrl) {
    link.parentElement.classList.add("active");
  }
}

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




function llenarSeccion(fechaAntesdeCurrentDate, elemento){
    elemento.innerHTML = ""
    let newTemplate = ""
    fechaAntesdeCurrentDate.forEach( evento => newTemplate += crearCard(evento) )
    elemento.innerHTML = newTemplate
}




function filtrarPorName(fechaAntesdeCurrentDate, search){
  return fechaAntesdeCurrentDate.filter((evento) => evento.name.toLowerCase().includes(search.toLowerCase()))
}



function llenarSeccionConBusqueda(fechaAntesdeCurrentDate, elemento){
elemento.innerHTML = ""
let newTemplate = ""
fechaAntesdeCurrentDate.forEach( evento => newTemplate += crearCard(evento) )
elemento.innerHTML = newTemplate
}


const funcionReduce = (acumulador, elementoActual, indice, array) =>{
return acumulador += `<div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="${elementoActual}" value="${elementoActual}" />
                        <label class="form-check-label" for="${elementoActual}">${elementoActual}</label>
                      </div>`
}


