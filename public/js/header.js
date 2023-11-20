const acc = document.getElementById('header__btn-enter');

acc.addEventListener('click', function () {
  const panel = this.nextElementSibling;
  setTimeout(function () {
    panel.style.display = 'flex';
  }, 1);
});

window.addEventListener('click', function (event) {
  let dr = document.getElementById('header__dropdown-id');
  if (
    !event.target.matches('.header__dropdown-content') &&
    dr.style.display == 'flex'
  ) {
    dr.style.display = 'none';
  }
});

window.addEventListener('scroll', function () {
  let dr = document.getElementById('header__dropdown-id');
  dr.style.display = 'none';
});

var modal = document.getElementsByClassName('sign');
var btn = document.getElementById('sign-in__button');

btn.addEventListener('click', function () {
  modal[0].style.display = 'flex';
});

window.onclick = function (event) {
  if (event.target == modal[0]) {
    modal[0].style.display = 'none';
  }
};
