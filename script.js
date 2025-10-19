document.addEventListener('DOMContentLoaded', function () {
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  desktopNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      desktopNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.main-nav .nav-link[href="#${id}"]`);
        if (entry.isIntersecting && navLink) {
          desktopNavLinks.forEach(n => n.classList.remove('active'));
          navLink.classList.add('active');
        }
      });
    }, { threshold: 0.45 });
    sections.forEach(s => observer.observe(s));
  }

  const typingSpan = document.querySelector('.typing-text span');
  if (typingSpan) {
    const words = ['Game Hacker ', 'Developer ', 'Video Editor ', 'Content Creator '];
    let wIdx = 0, charIdx = 0, forward = true;
    (function tick() {
      const current = words[wIdx];
      forward ? charIdx++ : charIdx--;
      if (charIdx >= current.length) { forward = false; setTimeout(tick, 900); return; }
      if (charIdx <= 0) { forward = true; wIdx = (wIdx + 1) % words.length; }
      typingSpan.textContent = current.substring(0, charIdx);
      setTimeout(tick, forward ? 80 : 40);
    })();
  }

  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileNav) {
    const openMobileNav = () => {
      mobileNav.classList.add('show');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      hamburger.classList.add('active');
    };

    const closeMobileNav = () => {
      mobileNav.classList.remove('show');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      hamburger.classList.remove('active');
    };

    hamburger.addEventListener('click', () => {
      mobileNav.classList.contains('show') ? closeMobileNav() : openMobileNav();
    });

    mobileNav.addEventListener('click', e => {
      if (e.target === mobileNav) closeMobileNav();
    });

    mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileNav.classList.contains('show')) closeMobileNav();
    });
  }

  const projectImgs = document.querySelectorAll('.project-img');
  const fullscreenView = document.getElementById('fullscreenView');
  const fullscreenImg = document.getElementById('fullscreenImg');
  const closeFullscreen = document.getElementById('closeFullscreen');

  document.querySelectorAll('.project-card').forEach(card => card.style.opacity = '1');

  projectImgs.forEach(img => {
    img.addEventListener('click', () => {
      fullscreenImg.src = img.src;
      fullscreenView.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeFull = () => {
    fullscreenView.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeFullscreen?.addEventListener('click', closeFull);
  fullscreenView?.addEventListener('click', e => { if (e.target === fullscreenView) closeFull(); });
});