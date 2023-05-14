const currentUrl = window.location.href;
const links = document.querySelectorAll(".navbar-nav li a");
for (let link of links) {
  if (link.href === currentUrl) {
    link.parentElement.classList.add("active");
  }
}


let data

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(infoData => {
    data = infoData
    console.log(data);
  })
  .catch(error => console.error(error))