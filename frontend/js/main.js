var menu = document.getElementById('open-burger');
var exit = document.getElementById('exit');
var navm = document.getElementById('nav');
var tokenInput = document.getElementsByClassName("token-input")[0];

tokenInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        console.log(tokenInput.value);
        window.location = "/album?token=" + tokenInput.value;
    }
});

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