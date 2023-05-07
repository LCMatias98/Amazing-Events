seccion = document.getElementById("idseccion") 


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
        <a href="./details.html" class="btn btn-secondary">Go somewhere</a>
      </div>
    </div>
  </article>`
}


const fechaAntesdeCurrentDate = data.events.filter((evento) => evento.date > data.currentDate)
console.log(fechaAntesdeCurrentDate)

function llenarSeccion(fechaAntesdeCurrentDate, elemento){
    elemento.innerHTML = ""
    let newTemplate = ""
    fechaAntesdeCurrentDate.forEach( evento => newTemplate += crearCard(evento) )
    elemento.innerHTML = newTemplate
}

llenarSeccion(fechaAntesdeCurrentDate, seccion)
