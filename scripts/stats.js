const currentUrl = window.location.href;
let tbody1 = document.getElementById("tbodyTabla1")
let tbody2 = document.getElementById("tbodyTabla2")
let tbody3 = document.getElementById("tbodyTabla3")

const links = document.querySelectorAll(".navbar-nav li a");
for (let link of links) {
  if (link.href === currentUrl) {
    link.parentElement.classList.add("active")
  }
}

let data;
let eventos;
fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    let eventos = data.events
    let categorias = categoria(eventos)
    const fechaAntesDeCurrentDate = data.events.filter((evento) => evento.date < data.currentDate)
    const fechaDespuesDeCurrentDate = data.events.filter((evento) => evento.date > data.currentDate)
  /*   console.log(fechaDespuesDeCurrentDate) */
    let ingresosPorCategoria = ingresoPorCategoria(fechaAntesDeCurrentDate)
   // console.log(ingresosPorCategoria)
    let resultadosPorcentajes = porcentajePorCategorias(fechaAntesDeCurrentDate)
   /*  console.log(resultadosPorcentajes) */
    let ingresosPorCategoriaEstimado = ingresoPorCategoriaEstimado(fechaDespuesDeCurrentDate)
    let resultadoPorcentajesEstimado = porcentajePorCategoriasEstimado(fechaDespuesDeCurrentDate)
   /*  console.log(ingresosPorCategoriaEstimado)
    console.log(resultadoPorcentajesEstimado) */
/*     llenarFila(categorias, ingresosPorCategoriaEstimado,resultadoPorcentajesEstimado,tbody2) */
    let categoriaFuturo = categoria(fechaDespuesDeCurrentDate)
   /*  console.log(resultadosPorcentajes) */

    llenarFila(categoriaFuturo, ingresosPorCategoriaEstimado,resultadoPorcentajesEstimado,tbody2)
    llenarFila(categorias, ingresosPorCategoria,resultadosPorcentajes,tbody3) 
    llenarFilaEventsStatistics(fechaAntesDeCurrentDate,tbody1)
   
   /*  llenarFila(categoriaFuturo,tbody1) */
 
  })
  .catch(error => console.error(error));

  function categoria(eventos){
    let categorias = eventos.map(evento => evento.category)
    let setCategorias = new Set(categorias)
    let arrayCategorias = Array.from(setCategorias)
    return arrayCategorias
  }

  function crearFila(categoria, ingresos, porcentajePorCategoria) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th scope="row">${categoria}</th>
      <td>${ingresos}</td>
      <td>${porcentajePorCategoria.toFixed(2)} %</td>
    `;
    return tr;
  }
  
  function llenarFila(categorias, ingresosPorCategoria,porcentajePorCategoria ,elemento) {
    elemento.innerHTML = "";
  
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < categorias.length; i++) {
      const fila = crearFila(categorias[i], ingresosPorCategoria[i],porcentajePorCategoria[i]);
      fragment.appendChild(fila);
    }
    elemento.appendChild(fragment);
  }

  /*  --------- Tabla 2 -----------*/
  function ingresoPorCategoria(eventos) {
    let categorias = categoria(eventos)
    let totalIngresoPorCategoria = []
    for(let i=0 ; i<categorias.length; i++){
      let eventoFiltrado = eventos.filter(evento => (evento.category == categorias[i]))
      let precioTotal = eventoFiltrado.map(evento => evento.assistance*evento.price)
      let totaIngreso = 0
      for(let i =0; i<precioTotal.length; i++){
        totaIngreso += precioTotal[i]
       /*totalIngresoPorCategoria.push(totaIngreso) */
      }
      totalIngresoPorCategoria.push(totaIngreso)
      /* console.log(totalIngresoPorCategoria) */
    }
    return totalIngresoPorCategoria
    }

  function porcentajePorCategorias(eventos){
    let categorias = categoria(eventos)
    let porcentajePorCategoria = []
    for(let i=0 ; i<categorias.length; i++){
      let eventoFiltrado = eventos.filter(evento => (evento.category == categorias[i]))
      let porcentajeTotalPorCategoria = eventoFiltrado.map(evento =>(evento.assistance / evento.capacity)*100)
 /*      console.log(porcentajeTotalPorCategoria) */
      let sumaDePorcentajes=0
      for(let i=0 ; i<porcentajeTotalPorCategoria.length ;i++ ){
        sumaDePorcentajes += porcentajeTotalPorCategoria[i]/porcentajeTotalPorCategoria.length
      }
      porcentajePorCategoria.push(sumaDePorcentajes)

/*       console.log(porcentajePorCategoria) */
    }
    return porcentajePorCategoria
  }
  /*  --------- Tabla 3 -----------*/
  function ingresoPorCategoriaEstimado(eventos) {
     let categorias = categoria(eventos)
    let totalIngresoPorCategoria = []
    for(let i=0 ; i<categorias.length; i++){
      let eventoFiltrado = eventos.filter(evento => (evento.category == categorias[i]))
      /* console.log(eventoFiltrado) */
      let precioTotal = eventoFiltrado.map(evento => evento.estimate*evento.price)
  /*     console.log(precioTotal) */
        let totaIngreso = 0
        for(let i =0; i<precioTotal.length; i++){
          totaIngreso += precioTotal[i]
         /*totalIngresoPorCategoria.push(totaIngreso) */
        }
        totalIngresoPorCategoria.push(totaIngreso)
      

      /* console.log(totalIngresoPorCategoria) */
    }
    return totalIngresoPorCategoria
    }

  function porcentajePorCategoriasEstimado(eventos){
    categorias = categoria(eventos)
    let porcentajePorCategoria = []
    for(let i=0 ; i<categorias.length; i++){
      let eventoFiltrado = eventos.filter(evento => (evento.category == categorias[i]))
      let porcentajeTotalPorCategoria = eventoFiltrado.map(evento =>(evento.estimate / evento.capacity)*100)
      /* onsole.log(eventoFiltrado) */
      let sumaDePorcentajes=0
      for(let i=0 ; i<porcentajeTotalPorCategoria.length ;i++ ){
        sumaDePorcentajes += porcentajeTotalPorCategoria[i]/porcentajeTotalPorCategoria.length
      }
      porcentajePorCategoria.push(sumaDePorcentajes)

/*       console.log(porcentajePorCategoria) */
    }
    return porcentajePorCategoria
  }

/*  --------- Tabla 1 -----------*/
/*   crearFila(categoria, ingresos, porcentajePorCategoria) */
function llenarFilaEventsStatistics(eventos , elemento){
  elemento.innerHTML = "";
  let fragment = document.createDocumentFragment()
  let eventosConCapacidades = eventos.map(evento =>(evento.name +" " +evento.capacity))

  let porcentajeTotalPorEventosPasados = eventos.map(evento =>((evento.assistance / evento.capacity)*100))
  let maximoPorcentaje =Math.max(...porcentajeTotalPorEventosPasados)
  let minimoPorcentaje =Math.min(...porcentajeTotalPorEventosPasados)
 /*  console.log(Object.values(eventoNameMaximo)) */
  console.log(porcentajeTotalPorEventosPasados)
  let fila = crearFila(maximoPorcentaje,minimoPorcentaje,maximoPorcentaje)
  fragment = fila
  console.log(fragment)
  elemento.appendChild(fragment)

}


