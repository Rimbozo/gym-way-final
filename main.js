(function () {
  'use strict';

  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
  }
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Fermer' : 'Menu';
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.querySelectorAll('.copy-btn').forEach(function (copyBtn) {
    var target = document.getElementById(copyBtn.id.replace('copy-', '') + '-text');
    if (!target) return;
    copyBtn.addEventListener('click', function () {
      function done() {
        copyBtn.textContent = 'Copié';
        setTimeout(function () { copyBtn.textContent = 'Copier'; }, 1800);
      }
      function fallback() {
        var r = document.createRange();
        r.selectNodeContents(target);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
      }
      try {
        navigator.clipboard.writeText(target.textContent.trim()).then(done, fallback);
      } catch (err) {
        fallback();
      }
    });
  });
})();
