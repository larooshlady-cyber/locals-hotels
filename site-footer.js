/**
 * Locals' Hotels — Site Footer
 * Single source of truth for the global footer.
 *
 * Usage: add <script src="site-footer.js"></script> before </body>
 *
 * The script removes any pre-existing footer (legacy `.footer`,
 * `.footer-mini`) and injects the canonical landing-page footer
 * scoped under the `.lh-footer` class so it cannot collide with
 * legacy CSS still living inside each page's <style> block.
 */
(function () {
  'use strict';

  /* ============================================================
     1. CSS
     ============================================================ */
  var css = [
    '.lh-footer{padding:0 0 48px;background:#212529;color:#fff;font-family:"Funnel Sans",sans-serif;-webkit-font-smoothing:antialiased}',
    '.lh-footer *{box-sizing:border-box}',
    '.lh-footer__inner{max-width:1600px;margin:0 auto;padding:0 64px}',
    '.lh-footer__grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:48px;padding:64px 0}',
    '.lh-footer__col{min-width:0}',
    '.lh-footer__brand{font-size:16px;font-weight:700;color:#fff;margin:0 0 16px;letter-spacing:1.5px;text-transform:uppercase}',
    '.lh-footer__tagline{font-size:14px;line-height:22px;color:rgba(255,255,255,.55);margin:0 0 24px;max-width:320px}',
    '.lh-footer__label{font-size:13px;line-height:22px;color:rgba(255,255,255,.45);margin:0 0 12px;max-width:280px}',
    '.lh-footer__contact-links{display:flex;flex-wrap:wrap;gap:8px;align-items:center}',
    '.lh-footer__contact-links a{font-size:13px;font-weight:600;color:rgba(255,255,255,.8);transition:color .2s;text-decoration:none}',
    '.lh-footer__contact-links a:hover{color:#fff}',
    '.lh-footer__contact-links span{font-size:13px;color:rgba(255,255,255,.3)}',
    '.lh-footer__nav-title{font-size:11px;font-weight:700;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1.2px;margin:0 0 20px}',
    '.lh-footer__nav-list{list-style:none;padding:0;margin:0}',
    '.lh-footer__nav-list li{margin-bottom:12px}',
    '.lh-footer__nav-list a{font-size:14px;font-weight:400;color:rgba(255,255,255,.65);line-height:22px;transition:color .2s;text-decoration:none}',
    '.lh-footer__nav-list a:hover{color:#fff}',
    '.lh-footer__nav-list a.active{color:#fff;font-weight:600}',
    '.lh-footer__bottom{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-top:32px;border-top:1px solid rgba(255,255,255,.1);flex-wrap:wrap}',
    '.lh-footer__copyright{font-size:12px;line-height:20px;color:rgba(255,255,255,.35);margin:0}',
    '.lh-footer__legal{display:flex;gap:24px;flex-wrap:wrap}',
    '.lh-footer__legal a{font-size:12px;color:rgba(255,255,255,.45);text-decoration:none;transition:color .2s}',
    '.lh-footer__legal a:hover{color:#fff}',
    '@media (max-width:1280px){.lh-footer__inner{padding:0 48px}}',
    '@media (max-width:1024px){.lh-footer__grid{grid-template-columns:1fr 1fr;gap:32px;padding:48px 0}}',
    '@media (max-width:768px){.lh-footer{padding:0 0 32px}.lh-footer__inner{padding:0 20px}.lh-footer__grid{grid-template-columns:1fr;gap:0;padding:16px 0}.lh-footer__col{padding:20px 0;border-bottom:1px solid rgba(255,255,255,.08)}.lh-footer__col:last-child{border-bottom:none}.lh-footer__bottom{flex-direction:column;align-items:flex-start;gap:12px;padding-top:24px}}'
  ].join('');

  /* ============================================================
     2. HTML
     ============================================================ */
  var html =
    '<footer class="lh-footer" role="contentinfo">' +
      '<div class="lh-footer__inner">' +
        '<div class="lh-footer__grid">' +

          '<div class="lh-footer__col">' +
            '<div class="lh-footer__brand">Locals\' Hotels</div>' +
            '<p class="lh-footer__tagline">Discover Georgia through its most original boutique and design hotels.</p>' +
            '<div class="lh-footer__label">Have Questions?</div>' +
            '<div class="lh-footer__contact-links">' +
              '<a href="mailto:hello@localshotels.com">hello@localshotels.com</a>' +
            '</div>' +
          '</div>' +

          '<div class="lh-footer__col">' +
            '<div class="lh-footer__nav-title">Destinations</div>' +
            '<ul class="lh-footer__nav-list">' +
              '<li><a href="hotels.html?region=Tbilisi">Tbilisi</a></li>' +
              '<li><a href="hotels.html?region=Kakheti">Kakheti</a></li>' +
              '<li><a href="hotels.html?region=Kutaisi">Kutaisi</a></li>' +
              '<li><a href="hotels.html?region=Kazbegi">Kazbegi</a></li>' +
              '<li><a href="hotels.html?region=Batumi">Batumi</a></li>' +
            '</ul>' +
          '</div>' +

          '<div class="lh-footer__col">' +
            '<div class="lh-footer__nav-title">Company</div>' +
            '<ul class="lh-footer__nav-list">' +
              '<li><a href="index.html" data-lh-page="index.html">Home</a></li>' +
              '<li><a href="hotels.html" data-lh-page="hotels.html">Hotels</a></li>' +
              '<li><a href="journal.html" data-lh-page="journal.html">Journal</a></li>' +
              '<li><a href="contact.html" data-lh-page="contact.html">Contact</a></li>' +
              '<li><a href="account.html" data-lh-page="account.html">My Account</a></li>' +
            '</ul>' +
          '</div>' +

          '<div class="lh-footer__col">' +
            '<div class="lh-footer__nav-title">Follow Us</div>' +
            '<ul class="lh-footer__nav-list">' +
              '<li><a href="#" target="_blank" rel="noopener">Instagram</a></li>' +
              '<li><a href="#" target="_blank" rel="noopener">Facebook</a></li>' +
              '<li><a href="#" target="_blank" rel="noopener">Twitter / X</a></li>' +
            '</ul>' +
          '</div>' +

        '</div>' +
        '<div class="lh-footer__bottom">' +
          '<p class="lh-footer__copyright">&copy; ' + new Date().getFullYear() + ' Locals\' Hotels. All rights reserved.</p>' +
          '<div class="lh-footer__legal">' +
            '<a href="#">Terms of Service</a>' +
            '<a href="#">Privacy Policy</a>' +
            '<a href="#">Cookies</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  /* ============================================================
     3. MOUNT
     ============================================================ */
  function mount() {
    if (document.querySelector('.lh-footer')) return;

    // Remove legacy footers so we don't show two
    document.querySelectorAll('footer.footer, .footer-mini').forEach(function (el) {
      el.parentNode && el.parentNode.removeChild(el);
    });

    // Inject CSS
    var style = document.createElement('style');
    style.setAttribute('data-lh-footer', '');
    style.textContent = css;
    document.head.appendChild(style);

    // Inject HTML
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var node = wrap.firstElementChild;
    document.body.appendChild(node);

    // Highlight current page in nav list
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    node.querySelectorAll('[data-lh-page]').forEach(function (a) {
      if (a.getAttribute('data-lh-page').toLowerCase() === path) a.classList.add('active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
