/* NGL Recreational: "Look inside" Book 1 preview.
   Put <div data-ngl-book></div> anywhere (even in HTML rendered later) and include this script.
   Level 2-4 skills and the routines QR code are blurred in the images themselves. */
(function(){
  if(window.NGLBook) return;
  var me = document.currentScript, BASE = (me && me.src ? me.src.replace(/[^\/]*$/, '') : '') + 'content/book1/';
  var V = '?v=1';
  var PAGES = [
    [1,'Cover','Book 1 · Ruby competition level'],
    [2,'Welcome','How the book works, and meet Somi and Flic'],
    [3,'Attendance and medals','Tick off every session and collect a medal for each level'],
    [4,'Levels 1 and 2','Six pieces, four skills each, one level a term'],
    [5,'Levels 3 and 4','The rest of the Ruby book'],
    [6,'Ruby competition','The routines built from the same skills'],
    [7,'Back cover','Every NGL pathway']
  ];
  var css = '.nglb{font:inherit}.nglb h3{margin:0 0 4px}.nglb p.nglb-sub{margin:0 0 12px;opacity:.8}' +
    '.nglb-strip{display:flex;gap:12px;overflow-x:auto;padding:4px 2px 12px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}' +
    '.nglb-strip button{flex:0 0 auto;scroll-snap-align:start;border:0;padding:0;background:none;cursor:zoom-in;text-align:left;color:inherit;font:inherit}' +
    '.nglb-strip img{display:block;height:170px;width:auto;border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.22);background:#eee}' +
    '.nglb-strip span{display:block;font-size:12.5px;font-weight:700;margin-top:6px;max-width:240px}' +
    '.nglb-box{position:fixed;inset:0;z-index:9999;background:rgba(14,12,40,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px}' +
    '.nglb-box img{max-width:100%;max-height:calc(100vh - 130px);border-radius:6px;box-shadow:0 10px 40px rgba(0,0,0,.5);background:#fff}' +
    '.nglb-cap{color:#fff;text-align:center;margin-top:12px;font:600 15px/1.35 system-ui,sans-serif}.nglb-cap small{display:block;font-weight:400;opacity:.75}' +
    '.nglb-x,.nglb-nav{position:absolute;border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:50%;width:46px;height:46px;font:600 24px/46px system-ui,sans-serif;cursor:pointer;text-align:center;padding:0}' +
    '.nglb-x{top:14px;right:14px}.nglb-nav{top:50%;transform:translateY(-50%)}.nglb-prev{left:12px}.nglb-next{right:12px}' +
    '.nglb-note{font-size:12.5px;opacity:.75;margin:2px 0 0}' +
    '@media (max-width:600px){.nglb-strip img{height:130px}.nglb-nav{top:auto;bottom:14px;transform:none}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function strip(){
    return '<div class="nglb"><h3>Look inside Book 1</h3><p class="nglb-sub">The Ruby award book every gymnast gets. Tap a page to open it.</p><div class="nglb-strip">' +
      PAGES.map(function(p, i){ return '<button type="button" data-nglb-open="' + i + '"><img loading="lazy" src="' + BASE + 'thumb' + p[0] + '.jpg' + V + '" alt="Book 1: ' + p[1] + '"><span>' + p[1] + '</span></button>'; }).join('') +
      '</div><p class="nglb-note">Levels 2 to 4 are blurred in this preview. Licensed clubs get the full books.</p></div>';
  }
  function fill(root){ (root.querySelectorAll ? root : document).querySelectorAll('[data-ngl-book]:not([data-nglb-done])').forEach(function(el){ el.setAttribute('data-nglb-done','1'); el.innerHTML = strip(); }); }
  var box, idx = 0;
  function show(i){
    idx = (i + PAGES.length) % PAGES.length; var p = PAGES[idx];
    if(!box){
      box = document.createElement('div'); box.className = 'nglb-box'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','Book 1 preview');
      box.innerHTML = '<button class="nglb-x" aria-label="Close">×</button><button class="nglb-nav nglb-prev" aria-label="Previous page">‹</button><img alt=""><div class="nglb-cap"></div><button class="nglb-nav nglb-next" aria-label="Next page">›</button>';
      box.addEventListener('click', function(e){ if(e.target === box || e.target.classList.contains('nglb-x')) close(); else if(e.target.classList.contains('nglb-prev')) show(idx - 1); else if(e.target.classList.contains('nglb-next')) show(idx + 1); });
      var x0 = null; box.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
      box.addEventListener('touchend', function(e){ if(x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
    }
    box.querySelector('img').src = BASE + 'page' + p[0] + '.jpg' + V; box.querySelector('img').alt = 'Book 1: ' + p[1];
    box.querySelector('.nglb-cap').innerHTML = p[1] + ' <small>' + p[2] + ' · ' + (idx + 1) + ' of ' + PAGES.length + '</small>';
    if(!box.parentNode){ document.body.appendChild(box); document.documentElement.style.overflow = 'hidden'; }
  }
  function close(){ if(box && box.parentNode){ box.parentNode.removeChild(box); document.documentElement.style.overflow = ''; } }
  document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-nglb-open]'); if(b){ e.preventDefault(); show(+b.getAttribute('data-nglb-open')); } });
  document.addEventListener('keydown', function(e){ if(!box || !box.parentNode) return; if(e.key === 'Escape') close(); else if(e.key === 'ArrowRight') show(idx + 1); else if(e.key === 'ArrowLeft') show(idx - 1); });
  window.NGLBook = {strip: strip, open: show, fill: fill};
  function start(){ fill(document); new MutationObserver(function(){ fill(document); }).observe(document.body, {childList:true, subtree:true}); }
  if(document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
