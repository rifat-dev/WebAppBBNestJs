(function () {
  const startTimeFront = performance.now();
  window.addEventListener('load', function () {
    const delayFront = (performance.now() - startTimeFront).toFixed();
    document.getElementById('footer__time-tag').innerText += delayFront;
  });
})();
