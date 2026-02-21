(function () {
  var overlay = document.createElement('div');
  overlay.className = 'gallery-modal';
  overlay.innerHTML =
    '<button class="gm-close" aria-label="Close">&times;</button>' +
    '<button class="gm-prev" aria-label="Previous">&#8249;</button>' +
    '<img class="gm-img">' +
    '<button class="gm-next" aria-label="Next">&#8250;</button>' +
    '<div class="gm-counter"></div>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('.gm-img');
  var counter = overlay.querySelector('.gm-counter');
  var images = [];
  var idx = 0;

  function show(i) {
    idx = (i + images.length) % images.length;
    img.src = images[idx].src;
    img.alt = images[idx].alt;
    counter.textContent = (idx + 1) + ' / ' + images.length;
  }

  function open(clicked) {
    var gallery = clicked.closest('.card-gallery');
    images = Array.prototype.slice.call(gallery.querySelectorAll('img'));
    show(images.indexOf(clicked));
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.card-gallery') && e.target.tagName === 'IMG') {
      open(e.target);
    }
  });

  overlay.querySelector('.gm-close').addEventListener('click', close);
  overlay.querySelector('.gm-prev').addEventListener('click', function () { show(idx - 1); });
  overlay.querySelector('.gm-next').addEventListener('click', function () { show(idx + 1); });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
