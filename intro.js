// Gestiona el modal de bienvenida (intro overlay)
(function(){
  function qs(sel){ return document.querySelector(sel); }
  const overlay = qs('#intro-overlay');
  if(!overlay) return;

  const btnEnter = qs('#intro-enter');
  const btnNever = qs('#intro-never');
  const FOCUSABLE = 'a[href], area[href], input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function isDismissed(){
    try{ return localStorage.getItem('sion_intro_dismissed') === '1'; }catch(e){ return false; }
  }

  function show(){
    lastFocused = document.activeElement;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden','false');
    // focus primer elemento
    const first = overlay.querySelector(FOCUSABLE) || overlay;
    first.focus();
    trapFocus(true);
  }

  function hide(persist){
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden','true');
    trapFocus(false);
    if(persist){
      try{ localStorage.setItem('sion_intro_dismissed','1'); }catch(e){}
    }
    // devolver foco razonable
    try{ if(lastFocused) lastFocused.focus(); }catch(e){}
  }

  function trapFocus(enable){
    if(!enable){ document.removeEventListener('keydown', onKeydown); return; }
    document.addEventListener('keydown', onKeydown);
  }

  function onKeydown(e){
    if(e.key === 'Escape' || e.key === 'Esc'){
      e.preventDefault(); hide(false); return;
    }
    if(e.key === 'Tab'){
      const nodes = Array.from(overlay.querySelectorAll(FOCUSABLE)).filter(n => n.offsetParent !== null);
      if(nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length-1];
      if(e.shiftKey){
        if(document.activeElement === first){ e.preventDefault(); last.focus(); }
      } else {
        if(document.activeElement === last){ e.preventDefault(); first.focus(); }
      }
    }
  }

  // handlers
  btnEnter && btnEnter.addEventListener('click', function(){ hide(false); });
  btnNever && btnNever.addEventListener('click', function(){ hide(true); });

  // Mostrar salvo que ya lo hayan descartado
  document.addEventListener('DOMContentLoaded', function(){
    if(!isDismissed()) show();
  });
})();
