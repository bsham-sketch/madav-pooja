document.addEventListener('DOMContentLoaded', function () {

    const $ = id => document.getElementById(id);
  
    /* ---------- Envelope ---------- */
    const envelope = $('envelope'), container = $('envelopeContainer'),
          openBtn = $('openInvitation'), invitation = $('invitation');
    let opened = false;
  
    function openInvite() {
      if (opened) return;
      opened = true;
      envelope.classList.add('opened');
      setTimeout(() => {
        container.classList.add('fade-out');
        setTimeout(() => {
          container.style.display = 'none';
          invitation.classList.add('visible');
          window.scrollTo(0, 0);
        }, 700);
      }, 1500);
    }
    openBtn.addEventListener('click', openInvite);
    envelope.addEventListener('click', openInvite);
  
    /* ---------- Countdown (starts immediately) ---------- */
    const target = new Date('2026-11-26T12:14:00+05:30').getTime(); // IST
    const pad = n => String(n).padStart(2, '0');
  
    function tick() {
      let d = target - Date.now();
      if (d <= 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach(i => $(i).textContent = '00');
        $('countdownMsg').textContent = 'The auspicious moment has arrived! 🪔';
        clearInterval(timer);
        return;
      }
      $('days').textContent    = pad(Math.floor(d / 86400000));
      $('hours').textContent   = pad(Math.floor(d % 86400000 / 3600000));
      $('minutes').textContent = pad(Math.floor(d % 3600000 / 60000));
      $('seconds').textContent = pad(Math.floor(d % 60000 / 1000));
    }
    const timer = setInterval(tick, 1000);
    tick();
  
    /* ---------- Page navigation ---------- */
    const pages = document.querySelectorAll('.page');
    const prev = $('navPrev'), next = $('navNext'), dotsBox = $('navIndicators');
    let current = 0;
  
    pages.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.addEventListener('click', () => go(i));
      dotsBox.appendChild(dot);
    });
    const dots = document.querySelectorAll('.nav-dot');
  
    function go(i) {
      if (i < 0 || i >= pages.length) return;
      current = i;
      pages.forEach((p, n) => p.classList.toggle('active', n === i));
      dots.forEach((d, n) => d.classList.toggle('active', n === i));
      prev.disabled = i === 0;
      next.disabled = i === pages.length - 1;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prev.addEventListener('click', () => go(current - 1));
    next.addEventListener('click', () => go(current + 1));
    $('btnBack').addEventListener('click', () => go(0));
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') go(current + 1);
      if (e.key === 'ArrowLeft') go(current - 1);
    });
    go(0);
  
    /* ---------- Missing images: hide gracefully ---------- */
    document.querySelectorAll('.card-img, .slider img, .couple-photo').forEach(img => {
      img.addEventListener('error', () => { img.style.display = 'none'; });
    });
  });