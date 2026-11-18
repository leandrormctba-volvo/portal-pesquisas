/* Botão "Tela cheia" — funciona no site e também dentro do SharePoint
   (o iframe do SharePoint precisa ter allowfullscreen). */
(function () {
  var doc = document;
  var raiz = doc.documentElement;
  var pode = raiz.requestFullscreen || raiz.webkitRequestFullscreen;
  if (!pode || (doc.fullscreenEnabled === false && doc.webkitFullscreenEnabled !== true)) return;

  var css = doc.createElement('style');
  css.textContent =
    '.tela-cheia-btn{position:fixed;left:18px;bottom:18px;z-index:9999;display:flex;align-items:center;gap:8px;' +
    'padding:10px 16px;border:0;border-radius:999px;cursor:pointer;font:600 13px/1 "Montserrat",system-ui,sans-serif;' +
    'color:#fff;background:linear-gradient(180deg,#14788c,#0c5868);box-shadow:0 6px 18px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.25);' +
    'transition:transform .15s ease,box-shadow .15s ease}' +
    '.tela-cheia-btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.25)}' +
    '.tela-cheia-btn svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2}' +
    '@media print{.tela-cheia-btn{display:none}}';
  doc.head.appendChild(css);

  var btn = doc.createElement('button');
  btn.type = 'button';
  btn.className = 'tela-cheia-btn';
  doc.body.appendChild(btn);

  var ICONE_ABRIR = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"/></svg>';
  var ICONE_SAIR = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3M16 3v3a2 2 0 0 0 2 2h3M8 21v-3a2 2 0 0 0-2-2H3M16 21v-3a2 2 0 0 1 2-2h3"/></svg>';

  function emTelaCheia() { return !!(doc.fullscreenElement || doc.webkitFullscreenElement); }
  function atualizar() {
    var on = emTelaCheia();
    btn.innerHTML = (on ? ICONE_SAIR : ICONE_ABRIR) + '<span>' + (on ? 'Sair da tela cheia' : 'Tela cheia') + '</span>';
    btn.title = on ? 'Sair da tela cheia (Esc)' : 'Ver em tela cheia';
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
