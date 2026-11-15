// Home and Voice Therapy Appointments booking modal.
(() => {
  const dialog = document.getElementById('vf-booking-modal');
  if (!dialog || dialog.dataset.initialized || typeof dialog.showModal !== 'function') return;
  const panel = dialog.querySelector('.vf-booking-panel');
  const close = dialog.querySelector('.vf-booking-close');
  const title = dialog.querySelector('.vf-booking-title');
  if (!panel || !close || !title) return;
  dialog.dataset.initialized = 'true';
  let trigger;
  let frame;
  let previousOverflow = '';
  let previousScroll = { x: 0, y: 0 };
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[data-vf-booking]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== 'https://voice-focus.selectandbook.com' || !url.pathname.startsWith('/appointment/')) return;
    event.preventDefault();
    trigger = link;
    const label = link.getAttribute('data-vf-booking-title') || 'Book an appointment';
    title.textContent = label;
    if (!frame) {
      frame = document.createElement('iframe');
      frame.className = 'vf-booking-frame';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      panel.appendChild(frame);
    }
    frame.title = label + ' with Voice Focus';
    // Keep the current form when reopening the same service; switch only for a different one.
    if (frame.getAttribute('src') !== url.href) frame.src = url.href;
    if (!dialog.open) {
      previousOverflow = document.documentElement.style.overflow;
      previousScroll = { x: window.scrollX, y: window.scrollY };
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
    }
    close.focus({ preventScroll: true });
  });
  close.addEventListener('click', event => { event.preventDefault(); dialog.close(); });
  close.addEventListener('keydown', event => {
    if (event.key === ' ') { event.preventDefault(); dialog.close(); }
  });
  let backdropDown = false;
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
  };
  dialog.addEventListener('pointerdown', event => { backdropDown = outside(event); });
  dialog.addEventListener('click', event => {
    if (backdropDown && outside(event)) dialog.close();
    backdropDown = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    window.scrollTo(previousScroll.x, previousScroll.y);
  });
})();
