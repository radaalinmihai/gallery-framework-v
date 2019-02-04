var menu = document.getElementById('menu');
var nav = document.getElementById('nav');
var exit = document.getElementById('exit');


menu.addEventListener('click', function (e) {
  nav.classList.toggle('hide-mobile');
  document.body.style.overflow = 'hidden';
  e.preventDefault();
});

exit.addEventListener('click', function (e) {
  nav.classList.add('hide-mobile');
  document.body.style.overflow = 'visible';
  e.preventDefault();
});