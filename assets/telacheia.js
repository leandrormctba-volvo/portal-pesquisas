/* Botão "Tela cheia" — no canto superior direito. Funciona no site e também dentro do SharePoint
   (o iframe do SharePoint precisa ter allowfullscreen).
   - Nos painéis das pesquisas fica ao lado do "Gerar PDF", com o mesmo visual (não fica por cima dele).
   - No portal (sem botão de PDF) fica fixo no canto superior direito. */
(function () {
  var doc = document;
  var raiz = doc.documentElement;
  var pode = raiz.requestFullscreen || raiz.webkitRequestFullscreen;
  if (!pode || (doc.fullscreenEnabled === false && doc.webkitFullscreenEnabled !== true)) return;

  var css = doc.createElement('style');
  css.textContent =
    '.tela-cheia-btn{position:fixed;top:18px;right:18px;z-index:9999;display:flex;align-items:center;gap:8px;' +
    'padding:10px 16px;border:0;border-radius:999px;cursor:pointer;font:600 13px/1 "Montserrat",system-ui,sans-serif;' +
    'color:#fff;background:linear-gradient(180deg,#14788c,#0c5868);box-shadow:0 6px 18px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25);' +
    'transition:transform .15s ease,box-shadow .15s ease}' +
    '.tela-cheia-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.25)}' +
    '.tela-cheia-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2}' +
    /* ao lado do Gerar PDF: mesmo formato dele */
    '.tela-cheia-btn.par-pdf{position:absolute;z-index:4;top:28px;padding:7px 15px 7px 13px;gap:7px;font:inherit;font-size:12.5px;font-weight:500;' +
    'border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.08);box-shadow:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}' +
    '.tela-cheia-btn.par-pdf:hover{transform:none;box-shadow:none;background:rgba(255,255,255,.18);border-color:rgba(255,255,255,.5)}' +
    '@media (max-width:560px){.tela-cheia-btn span{display:none}.tela-cheia-btn{padding:9px 11px}.tela-cheia-btn.par-pdf{padding:7px 11px}}' +
    '@media print{.tela-cheia-btn{display:none}}';
  doc.head.appendChild(css);

  var btn = doc.createElement('button');
  btn.type = 'button';
  btn.className = 'tela-cheia-btn';

  var pdf = doc.querySelector('.gerar-pdf');
  function posicionar() {
    if (!pdf) return;
    var cs = getComputedStyle(pdf);
    btn.style.top = cs.top;
    btn.style.right = (parseFloat(cs.right) + pdf.offsetWidth + 10) + 'px';
  }
  if (pdf && pdf.parentNode) {
    btn.classList.add('par-pdf');
    pdf.parentNode.insertBefore(btn, pdf);
    addEventListener('resize', posicionar);
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(posicionar);
  } else {
    doc.body.appendChild(btn);
  }

  var ICONE_ABRIR = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';
  var ICONE_SAIR = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M16 3v3a2 2 0 0 0 2 2h3M8 21v-3a2 2 0 0 0-2-2H3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>';

  function emTelaCheia() { return !!(doc.fullscreenElement || doc.webkitFullscreenElement); }
  function atualizar() {
    var on = emTelaCheia();
    btn.innerHTML = (on ? ICONE_SAIR : ICONE_ABRIR) + '<span>' + (on ? 'Sair da tela cheia' : 'Tela cheia') + '</span>';
    btn.title = on ? 'Sair da tela cheia (Esc)' : 'Ver em tela cheia';
    posicionar();
  }
  btn.addEventListener('click', function () {
    if (emTelaCheia()) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
    } else {
      pode.call(raiz);
    }
  });
  doc.addEventListener('fullscreenchange', atualizar);
  doc.addEventListener('webkitfullscreenchange', atualizar);
  atualizar();
})();
