const card = document.querySelector('.card');

card.addEventListener('mouseover', function() {
  card.style.boxShadow = '0px 0px 30px rgba(0, 0, 0, 0.3)';
  card.style.transform = 'scale(1.05)';
  card.style.transition = 'all 0.3s ease';
});

card.addEventListener('mouseout', function() {
  card.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
  card.style.transform = 'scale(1)';
  card.style.transition = 'all 0.3s ease';
});

console.log(location)