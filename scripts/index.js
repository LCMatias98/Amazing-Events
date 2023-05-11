/* console.log(data.events[0]) */
let seccion = document.getElementById("idseccion") 
let formulario = document.getElementById("formularioEventos")
let search = document.getElementById("search")
let containerCheckbox = document.getElementById("containerCheckbox")
let navitem = document.getElementsByClassName("nav-item")

let categoria = data.events.map((evento) => evento.category)
let setCategoria = new Set(categoria)
let arrayCategoria = Array.from(setCategoria)
const currentUrl = window.location.href;
/* console.log(arrayCategoria) */
/* console.log(setCategoria) */
/* article = document.getElementById("articleCard") */
/* console.log(article.innerHTML = "prueba") */
/* seccion.innerHTML = "borrar" */
/* console.log(data.events) */
// Obtener la URL actual


// Obtengo los elementos "a" dentro de los elementos "li" y le agrego clase active
const links = document.querySelectorAll(".navbar-nav li a");
console.log(window.location)
console.log(navitem)
console.log(links)
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
/* <<<<<<<<<< */

function llenarSeccion(data, elemento){
    elemento.innerHTML = ""
    let newTemplate = ""
    data.events.forEach( evento => newTemplate += crearCard(evento) )
    elemento.innerHTML = newTemplate
}

llenarSeccion(data, seccion)


/* Funcion para filtrar desde el Input */
 function filtrarPorName(data, search){
    return data.events.filter((evento) => evento.name.toLowerCase().includes(search.toLowerCase()))
 }

search.addEventListener("input",()=>{
  filtrarPorBusqueda = filtrarPorName(data, search.value)
  //console.log(filtrarPorBusqueda)
  llenarSeccionConBusqueda(filtrarPorBusqueda ,seccion)

})

function llenarSeccionConBusqueda(data, elemento){
  elemento.innerHTML = ""
  let newTemplate = ""
  data.forEach( evento => newTemplate += crearCard(evento) )
  elemento.innerHTML = newTemplate
}


const funcionReduce = (acumulador, elementoActual, indice, array) =>{
  return acumulador += `<div class="form-check form-check-inline">
                          <input class="form-check-input" type="checkbox" id="${elementoActual}" value="${elementoActual}" />
                          <label class="form-check-label" for="${elementoActual}">${elementoActual}</label>
                        </div>`
}

const templateCheckbox = arrayCategoria.reduce(funcionReduce, ``)
//console.log(templateCheckbox)

containerCheckbox.innerHTML = templateCheckbox

containerCheckbox.addEventListener("change", (e)=>{
  //console.log("tocaste check")
  const checkboxChecked = Array.from( document.querySelectorAll(`input[type="checkbox"]:checked`)).map((check) =>check.value)
  /* console.log(checkboxChecked) */
  const eventoFiltrado = filtrarPorEventos(data, checkboxChecked)
    /* necesito convertir el array de objetos eventoFiltrado a objeto */
/*   const objectDeEventoFiltrado = Object.assign({}, eventoFiltrado)
  console.log(objectDeEventoFiltrado) */
   llenarSeccionConBusqueda(eventoFiltrado,seccion)
  
})

function filtrarPorEventos(data, categoria){
  if(categoria.length == 0){
    return data.events
  }
  return data.events.filter((evento) => categoria.includes(evento.category))
}