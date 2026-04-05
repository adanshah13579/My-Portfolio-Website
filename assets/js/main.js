/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox (script is deferred in index.html — init when available, once)
   */
  var glightboxInitialized = false;
  function initGLightboxWhenReady() {
    if (glightboxInitialized || typeof GLightbox === 'undefined') {
      return;
    }
    glightboxInitialized = true;
    GLightbox({
      selector: '.glightbox'
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGLightboxWhenReady);
  } else {
    initGLightboxWhenReady();
  }
  window.addEventListener('load', initGLightboxWhenReady);

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * App project videos: click cover to reveal player; keep muted (no sound)
   * Uses delegation so clicks work even if AOS or layout delays hit targets
   */
  var appVideoCardsInited = false;
  function initAppVideoCards() {
    var section = document.getElementById('portfolio-apps');
    if (!section || appVideoCardsInited) return;
    appVideoCardsInited = true;

    function keepSilent(video) {
      video.muted = true;
      video.volume = 0;
    }

    function revealAndPlay(card) {
      var cover = card.querySelector('.portfolio-app-video-cover');
      var video = card.querySelector('.portfolio-app-video-el');
      if (!cover || !video || cover.style.display === 'none') return;
      cover.setAttribute('hidden', '');
      cover.style.display = 'none';
      video.style.display = 'block';
      keepSilent(video);
      video.play().catch(function() {});
    }

    section.addEventListener('click', function(e) {
      var cover = e.target.closest('.portfolio-app-video-cover');
      if (!cover || cover.hasAttribute('hidden')) return;
      var card = cover.closest('.portfolio-app-video-card');
      if (!card || !section.contains(card)) return;
      e.preventDefault();
      revealAndPlay(card);
    });

    section.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var cover = e.target.closest('.portfolio-app-video-cover');
      if (!cover || cover.hasAttribute('hidden')) return;
      var card = cover.closest('.portfolio-app-video-card');
      if (!card || !section.contains(card)) return;
      e.preventDefault();
      revealAndPlay(card);
    });

    section.querySelectorAll('.portfolio-app-video-el').forEach(function(video) {
      video.addEventListener('volumechange', function() {
        if (!video.muted || video.volume > 0) {
          video.muted = true;
          video.volume = 0;
        }
      });
    });
  }

  /**
   * Website projects: filter All vs Live (Netlify) demos
   */
  function initPortfolioWebsiteLiveFilter() {
    var section = document.getElementById('portfolio-websites');
    if (!section) return;
    var bar = section.querySelector('.portfolio-live-filter');
    if (!bar) return;
    var items = section.querySelectorAll('.portfolio-item');
    bar.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-portfolio-filter]');
      if (!btn || !bar.contains(btn)) return;
      var filter = btn.getAttribute('data-portfolio-filter');
      bar.querySelectorAll('[data-portfolio-filter]').forEach(function(b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      items.forEach(function(item) {
        var isLive = item.getAttribute('data-live') === 'true';
        if (filter === 'all') {
          item.classList.remove('portfolio-item--filtered-out');
        } else {
          item.classList.toggle('portfolio-item--filtered-out', !isLive);
        }
      });
    });
  }

  function bootClientFeatures() {
    initAppVideoCards();
    initPortfolioWebsiteLiveFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootClientFeatures);
  } else {
    bootClientFeatures();
  }

})();