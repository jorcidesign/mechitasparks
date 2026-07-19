const body = document.body;
const header = document.querySelector<HTMLElement>('[data-site-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menuClose = document.querySelector<HTMLButtonElement>('[data-menu-close]');
const nav = document.querySelector<HTMLElement>('[data-site-nav]');
const backdrop = document.querySelector<HTMLElement>('[data-nav-backdrop]');
let lastFocused: HTMLElement | null = null;

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')
  );
}

function closeMenu() {
  if (!header || !menuToggle || !nav) return;
  header.removeAttribute('data-menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
  nav.setAttribute('aria-hidden', 'true');
  body.classList.remove('menu-open');
  lastFocused?.focus();
}

function openMenu() {
  if (!header || !menuToggle || !nav) return;
  lastFocused = document.activeElement as HTMLElement;
  header.setAttribute('data-menu-open', '');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Cerrar menú');
  nav.setAttribute('aria-hidden', 'false');
  body.classList.add('menu-open');
  getFocusable(nav)[0]?.focus();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  isOpen ? closeMenu() : openMenu();
});

menuClose?.addEventListener('click', closeMenu);
backdrop?.addEventListener('click', closeMenu);
nav?.addEventListener('click', (event) => {
  if ((event.target as HTMLElement).closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
  if (event.key !== 'Tab' || !nav || nav.getAttribute('aria-hidden') === 'true') return;

  const focusable = getFocusable(nav);
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
});

document.querySelectorAll<HTMLElement>('[data-faq-item]').forEach((item) => {
  const button = item.querySelector<HTMLButtonElement>('button');
  const answer = item.querySelector<HTMLElement>('.faq-item__answer');
  if (!button || !answer) return;

  button.addEventListener('click', () => {
    const willOpen = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(willOpen));
    answer.hidden = !willOpen;
  });
});

const dateInput = document.querySelector<HTMLInputElement>('input[type="date"]');
if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

const bookingForm = document.querySelector<HTMLFormElement>('[data-booking-form]');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const phone = bookingForm.dataset.whatsapp;
  const message = [
    'Hola MechitaSparks, quiero cotizar un beauty bar para mi evento.',
    '',
    `Nombre: ${data.get('name')}`,
    `Mi WhatsApp: ${data.get('phone')}`,
    `Tipo de evento: ${data.get('event')}`,
    `Fecha estimada: ${data.get('date')}`,
    `Ubicación: ${data.get('location')}`,
    data.get('details') ? `Detalles: ${data.get('details')}` : ''
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

declare global {
  interface Window {
    gsap?: {
      registerPlugin: (plugin: unknown) => void;
      from: (targets: unknown, vars: Record<string, unknown>) => unknown;
      fromTo: (targets: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => unknown;
      to: (targets: unknown, vars: Record<string, unknown>) => unknown;
      utils: { toArray: <T>(selector: string) => T[] };
    };
    ScrollTrigger?: unknown;
  }
}

function setupMotion() {
  const gsap = window.gsap;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!gsap || !window.ScrollTrigger || reducedMotion) return;

  gsap.registerPlugin(window.ScrollTrigger);
  document.documentElement.classList.add('gsap-ready');

  gsap.from('[data-hero-copy] > *', {
    y: 30,
    opacity: 0,
    duration: 0.65,
    stagger: 0.09,
    ease: 'back.out(1.25)'
  });

  gsap.from('[data-hero-visual]', {
    scale: 0.88,
    rotation: 3,
    opacity: 0,
    duration: 0.9,
    delay: 0.18,
    ease: 'back.out(1.3)'
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.fromTo(
      element,
      { y: 24 },
      {
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      }
    );
  });
}

if (document.readyState === 'complete') setupMotion();
else window.addEventListener('load', setupMotion, { once: true });

export {};
