(function(){
  const tabs     = document.querySelectorAll('.tab');
  const fill     = document.querySelector('.tabs-fill');
  const track    = document.querySelector('.tabs-track');
  const INTERVAL = 5000;
  let current    = 0, timer;

  function moveFillTo(tabEl) {
    // calculate position relative to track
    const trackRect = track.getBoundingClientRect();
    const tabRect   = tabEl.getBoundingClientRect();
    const offsetTop = tabRect.top - trackRect.top;
    const height    = tabRect.height;

    // reset & animate
    fill.style.transition = 'none';
    fill.style.top    = offsetTop + 'px';
    fill.style.height = '0px';
    // force reflow
    void fill.offsetWidth;
    // animate height
    fill.style.transition = `height ${INTERVAL}ms linear`;
    fill.style.height     = height + 'px';
  }

  function activate(idx) {
    clearTimeout(timer);
    // deactivate old
    tabs[current].classList.remove('active');
    tabs[current].setAttribute('aria-selected','false');
    // activate new
    current = idx;
    const tab = tabs[current];
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    // move & animate fill
    moveFillTo(tab);
    // schedule next
    timer = setTimeout(()=>activate((current+1)%tabs.length), INTERVAL);
  }

  // clicking resets timer
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      activate(parseInt(tab.dataset.index,10));
    });
  });
  // pause on hover entire section
  const section = document.querySelector('.saas-section');
  section.addEventListener('mouseenter', ()=> clearTimeout(timer));
  section.addEventListener('mouseleave', ()=> timer = setTimeout(()=>activate((current+1)%tabs.length), INTERVAL));

  // kick off
  window.addEventListener('DOMContentLoaded', ()=>activate(0));
})();
