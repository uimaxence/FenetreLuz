/**
 * Interactions du site (léger, sans dépendance) :
 * - révélation au scroll, compteurs, header compact, méga-menus, menu mobile,
 * - filtres réalisations, formulaire de devis, barre de progression de lecture.
 * Ré-initialisé à chaque navigation (ClientRouter → astro:page-load).
 */

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Révélation au scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in)');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Compteurs ---------- */
function initCounters() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    if (!Number.isFinite(target) || reduceMotion()) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 },
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Header ---------- */
let scrollBound = false;
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  update();
  if (!scrollBound) {
    window.addEventListener('scroll', () => {
      const h = document.getElementById('header');
      if (h) h.classList.toggle('is-scrolled', window.scrollY > 24);
    }, { passive: true });
    scrollBound = true;
  }

  // Méga-menus
  const items = header.querySelectorAll<HTMLElement>('.has-mega');
  const closeAll = (except?: HTMLElement) => {
    items.forEach((it) => {
      if (it !== except) {
        it.classList.remove('open');
        it.querySelector('button')?.setAttribute('aria-expanded', 'false');
      }
    });
  };
  const isDesktop = () => window.matchMedia('(min-width: 1025px) and (hover: hover)').matches;
  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('button');
    if (!btn) return;
    let timer: number | undefined;
    const open = () => {
      closeAll(item);
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    };
    btn.addEventListener('click', () => (item.classList.contains('open') ? close() : open()));
    item.addEventListener('mouseenter', () => {
      if (!isDesktop()) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(open, 60);
    });
    item.addEventListener('mouseleave', () => {
      if (!isDesktop()) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(close, 120);
    });
    item.addEventListener('focusout', (e) => {
      const next = (e as FocusEvent).relatedTarget as Node | null;
      if (isDesktop() && next && !item.contains(next)) close();
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAll();
      closeMobile();
    }
  });
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target as Node)) closeAll();
  });

  // Menu mobile — le panneau démarre sous le bord réel du header (la barre d'info au-dessus peut être visible ou non)
  const burger = header.querySelector<HTMLButtonElement>('.burger');
  const nav = header.querySelector<HTMLElement>('.nav');
  const closeMobile = () => {
    document.body.classList.remove('nav-open');
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Ouvrir le menu');
  };
  burger?.addEventListener('click', () => {
    const openNow = !document.body.classList.contains('nav-open');
    if (openNow && nav) nav.style.top = `${Math.round(header.getBoundingClientRect().bottom)}px`;
    document.body.classList.toggle('nav-open', openNow);
    burger.setAttribute('aria-expanded', String(openNow));
    burger.setAttribute('aria-label', openNow ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  header.querySelectorAll<HTMLAnchorElement>('.nav a').forEach((a) => a.addEventListener('click', closeMobile));
}

/* ---------- Filtres réalisations ---------- */
function initFilters() {
  const root = document.querySelector<HTMLElement>('[data-filters]');
  if (!root) return;
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-real]'));
  const empty = document.querySelector<HTMLElement>('[data-filters-empty]');
  const count = document.querySelector<HTMLElement>('[data-filters-count]');
  const state: Record<string, string> = { prestation: 'all', zone: 'all' };

  const apply = () => {
    let visible = 0;
    cards.forEach((card) => {
      const ok =
        (state.prestation === 'all' || card.dataset.prestation === state.prestation) &&
        (state.zone === 'all' || card.dataset.zone === state.zone);
      card.hidden = !ok;
      if (ok) {
        visible++;
        card.style.setProperty('--d', `${Math.min(visible, 12) * 40}ms`);
        card.classList.remove('in');
        requestAnimationFrame(() => card.classList.add('in'));
      }
    });
    if (empty) empty.hidden = visible > 0;
    if (count) count.textContent = String(visible);
    const url = new URL(location.href);
    Object.entries(state).forEach(([k, v]) => (v === 'all' ? url.searchParams.delete(k) : url.searchParams.set(k, v)));
    history.replaceState(null, '', url);
  };

  root.querySelectorAll<HTMLButtonElement>('button[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.filter!;
      state[key] = btn.dataset.value!;
      root.querySelectorAll<HTMLButtonElement>(`button[data-filter="${key}"]`).forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      apply();
    });
  });

  // état initial depuis l'URL (?prestation=…&zone=…)
  const params = new URLSearchParams(location.search);
  (['prestation', 'zone'] as const).forEach((k) => {
    const v = params.get(k);
    if (v) {
      const btn = root.querySelector<HTMLButtonElement>(`button[data-filter="${k}"][data-value="${v}"]`);
      if (btn) btn.click();
    }
  });
}

/* ---------- Formulaire de devis ---------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-devis]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-status]');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = Object.fromEntries(new FormData(form).entries());
      form.classList.add('is-sending');
      if (submit) submit.disabled = true;
      if (status) {
        status.hidden = false;
        status.dataset.state = 'sending';
        status.textContent = 'Envoi en cours…';
      }
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, page: location.pathname }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) throw new Error(json.error || 'Erreur serveur');
        form.classList.add('is-sent');
        form.querySelector<HTMLElement>('[data-fields]')?.setAttribute('hidden', '');
        if (status) {
          status.dataset.state = 'ok';
          status.innerHTML =
            '<strong>Merci, votre demande est bien envoyée.</strong> Un conseiller LUZ vous rappelle sous 48 h ouvrées pour convenir d’un rendez-vous.';
        }
      } catch (err) {
        if (status) {
          status.dataset.state = 'error';
          status.innerHTML =
            'L’envoi n’a pas abouti. Vous pouvez réessayer ou nous appeler directement : <a href="tel:+33546704838">05 46 70 48 38</a> (Jonzac) · <a href="tel:+33546213721">05 46 21 37 21</a> (Royan).';
        }
      } finally {
        form.classList.remove('is-sending');
        if (submit) submit.disabled = false;
      }
    });
  });
}

/* ---------- Barre de lecture (articles) ---------- */
function initReadingBar() {
  const bar = document.querySelector<HTMLElement>('[data-reading-bar]');
  const article = document.querySelector<HTMLElement>('[data-article]');
  if (!bar || !article) return;
  const update = () => {
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const done = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
    bar.style.transform = `scaleX(${total > 0 ? done / total : 1})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ---------- Galerie (réalisation) ---------- */
function initGallery() {
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => {
    const main = g.querySelector<HTMLElement>('[data-gallery-main]');
    const thumbs = g.querySelectorAll<HTMLButtonElement>('[data-gallery-thumb]');
    if (!main || thumbs.length < 2) return;
    thumbs.forEach((t) => {
      t.addEventListener('click', () => {
        const pic = t.querySelector('picture, img');
        if (!pic) return;
        main.classList.add('is-switching');
        window.setTimeout(() => {
          main.innerHTML = '';
          const clone = pic.cloneNode(true) as HTMLElement;
          clone.querySelectorAll('img').forEach((img) => {
            img.removeAttribute('loading');
            img.removeAttribute('sizes');
          });
          main.appendChild(clone);
          main.classList.remove('is-switching');
        }, 140);
        thumbs.forEach((x) => x.classList.toggle('is-active', x === t));
      });
    });
  });
}

/* ---------- Diaporamas automatiques (cartes réalisations) ---------- */
let sliderTimers: number[] = [];
function initSliders() {
  sliderTimers.forEach((t) => window.clearInterval(t));
  sliderTimers = [];
  const sliders = Array.from(document.querySelectorAll<HTMLElement>('[data-slider]'));
  if (!sliders.length || reduceMotion()) return;
  const running = new Map<HTMLElement, number>();
  const start = (el: HTMLElement, index: number) => {
    if (running.has(el)) return;
    const slides = el.querySelectorAll<HTMLElement>('.rcard__slide');
    const dots = el.querySelectorAll<HTMLElement>('.rcard__dots i');
    if (slides.length < 2) return;
    let i = Number(el.dataset.slide ?? 0);
    // cadence décalée d'une carte à l'autre pour éviter un changement simultané
    const period = 3600 + (index % 5) * 450;
    const t = window.setInterval(() => {
      i = (i + 1) % slides.length;
      el.dataset.slide = String(i);
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
    }, period);
    running.set(el, t);
    sliderTimers.push(t);
  };
  const stop = (el: HTMLElement) => {
    const t = running.get(el);
    if (t !== undefined) {
      window.clearInterval(t);
      running.delete(el);
    }
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) start(el, sliders.indexOf(el));
        else stop(el);
      });
    },
    { threshold: 0.35 },
  );
  sliders.forEach((s) => io.observe(s));
}

function init() {
  document.body.classList.remove('nav-open');
  initReveal();
  initCounters();
  initHeader();
  initFilters();
  initForms();
  initReadingBar();
  initGallery();
  initSliders();
}

document.addEventListener('astro:page-load', init);
