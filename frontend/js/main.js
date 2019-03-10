var menu = document.getElementById('open-burger');
var exit = document.getElementById('exit');
var navm = document.getElementById('nav');

menu.addEventListener('click', function (e) {
  navm.classList.toggle('open-menu');
  document.body.style.overflow = 'hidden';
  e.preventDefault();
});

exit.addEventListener('click', function (e) {
  navm.classList.toggle('open-menu');
  document.body.style.overflow = 'visible';
  e.preventDefault();
});