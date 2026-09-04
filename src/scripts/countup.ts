/**
 * Shared count-up used by the hero trust stats and the reviews rating, so the
 * two animate identically. Any `[data-countup]` element animates its number
 * from 0 to `data-countup-to` when its snap-section becomes the one in view
 * (SnapScript sets `data-seen` on the current section) — or immediately if it
 * is not inside a snap-section.
 *
 * Attributes:
 *   data-countup            marker
 *   data-countup-to         target number (required)
 *   data-countup-decimals   fraction digits shown (default 0)
 *   data-countup-delay      ms to wait before counting (default 0) — orchestration
 *   data-countup-fill       present -> also drives `--countup-fill` 0% -> 100%
 *   [data-countup-num]      child holding the number text (default: the element)
 *
 * Progressive enhancement: the final value already sits in the markup, so no-JS
 * shows it; reduced motion leaves it untouched.
 */
const DURATION = 1800;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function animate(el: HTMLElement) {
  const numEl = el.querySelector<HTMLElement>('[data-countup-num]') ?? el;
  const target = parseFloat(el.dataset.countupTo ?? '');
  if (!Number.isFinite(target)) return;

  const decimals = parseInt(el.dataset.countupDecimals ?? '0', 10) || 0;
  const delay = parseInt(el.dataset.countupDelay ?? '0', 10) || 0;
  const hasFill = el.hasAttribute('data-countup-fill');
  const lang = document.documentElement.lang === 'en' ? 'en' : 'ro';
  const fmt = (v: number) =>
    v.toLocaleString(lang, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const finalText = numEl.textContent ?? '';

  // Reduced motion: leave the final value (and any full fill) as authored.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  numEl.textContent = fmt(0);
  if (hasFill) el.style.setProperty('--countup-fill', '0%');

  const run = () => {
    const begin = () => {
      const start = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        const v = target * easeOut(p);
        numEl.textContent = fmt(v);
        if (hasFill) el.style.setProperty('--countup-fill', `${target ? (v / target) * 100 : 100}%`);
        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          numEl.textContent = finalText;
          if (hasFill) el.style.setProperty('--countup-fill', '100%');
        }
      };
      requestAnimationFrame(frame);
    };
    // Stagger the launch so a hero count-up does not fire in the same instant
    // as the headline animation.
    if (delay > 0) window.setTimeout(begin, delay);
    else begin();
  };

  // Fire only once the visitor is on the section this stat belongs to. Reusing
  // SnapScript's `data-seen` keeps it from starting when a sliver peeks in.
  const section = el.closest<HTMLElement>('[data-snap-section]');
  if (!section || section.hasAttribute('data-seen')) {
    run();
  } else {
    const mo = new MutationObserver(() => {
      if (section.hasAttribute('data-seen')) {
        mo.disconnect();
        run();
      }
    });
    mo.observe(section, { attributes: true, attributeFilter: ['data-seen'] });
  }
}

function init() {
  document.querySelectorAll<HTMLElement>('[data-countup]').forEach(animate);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
