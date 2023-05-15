const containerDetails = document.getElementById("containerDetails")
const currentUrl = window.location.href;

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(infoData => {
    data = infoData
    const params = new URLSearchParams(location.search)
    const nombreParams = params.get(`id`)
    const evento = data.events.find((evento) => evento._id == nombreParams)
    console.log(evento.name)
    document.title = `Details Of ${evento.name}`
    if(evento.assistance){
      containerDetails.innerHTML = `<div class="card mb-3 mt-4 col-12 col-md-12" id="card" style="max-width: 540px; border: none; box-shadow:26px 26px 53px #636161,
                                    -26px -26px 53px #ffffff;">
                                    <div class="row g-0">
                                      <div class="col-md-6 col-lg-6">
                                        <img src="${evento.image}" class="img-fluid rounded-start card-img-details" alt="${evento.name}" style="height: 100%;">
                                      </div>
                                      <div class="col-md-6 col-lg-6">
                                        <div class="card-body">
                                          <h5 class="card-title mb-3">${evento.name}</h5>
                                          <p class="card-text mb-4">${evento.description}</p>
                                          <div class="d-flex justify-content-between">
                                            <div class="">
                                              <p class="card-text"><small class="text-body-secondary">Capacity: ${evento.capacity}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Assistance:${evento.assistance}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Place: ${evento.place}</small></p>
                                            </div>
                                            <div class="">
                                              <p class="card-text"><small class="text-body-secondary">Date: ${evento.date}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Price: ${evento.price}</small></p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
    }else if(evento.estimate){
      containerDetails.innerHTML = `<div class="card mb-3 mt-4 col-12 col-md-12" id="card" style="max-width: 540px; border: none; box-shadow:26px 26px 53px #636161,
                                    -26px -26px 53px #ffffff;">
                                    <div class="row g-0">
                                      <div class="col-md-6 col-lg-6">
                                        <img src="${evento.image}" class="img-fluid rounded-start card-img-details" alt="${evento.name}" style="height: 100%;">
                                      </div>
                                      <div class="col-md-6 col-lg-6">
                                        <div class="card-body">
                                          <h5 class="card-title mb-3">${evento.name}</h5>
                                          <p class="card-text mb-4">${evento.description}</p>
                                          <div class="d-flex justify-content-between">
                                            <div class="">
                                              <p class="card-text"><small class="text-body-secondary">Capacity: ${evento.capacity}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Estimate: ${evento.estimate}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Place: ${evento.place}</small></p>
                                            </div>
                                            <div class="">
                                              <p class="card-text"><small class="text-body-secondary">Date: ${evento.date}</small></p>
                                              <p class="card-text"><small class="text-body-secondary">Price: ${evento.price}</small></p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
    }

    })
  .catch(error => console.error(error))
