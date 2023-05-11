const currentUrl = window.location.href;
const links = document.querySelectorAll(".navbar-nav li a");


for (let link of links) {
  if (link.href === currentUrl) {
    link.parentElement.classList.add("active");
  }
}