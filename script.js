(() => {
  "use strict";

  const cfg = window.SITE_CONFIG || {};

  function updateDate() {
    const target = document.querySelector("#promo-date");
    if (!target) return;
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      day: "2-digit",
      month: "long"
    }).format(new Date());
    target.textContent = `CONDIÇÃO ESPECIAL DISPONÍVEL HOJE, ${formatted.toUpperCase()} — PAGAMENTO ÚNICO`;
  }

  function updateYear() {
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  function configureCheckoutLinks() {
    const map = {
      completo: cfg.LINK_COMPLETO,
      basico: cfg.LINK_BASICO,
      upgrade: cfg.LINK_UPGRADE
    };

    document.querySelectorAll("[data-checkout]").forEach((button) => {
      const url = map[button.dataset.checkout];
      if (typeof url === "string" && /^https?:\/\//i.test(url.trim())) {
        button.href = url.trim();
        button.rel = "noopener";
      } else {
        button.hidden = true;
      }
    });
  }

  function configureFaq() {
    const items = [...document.querySelectorAll(".faq details")];
    items.forEach((item) => {
      item.addEventListener("toggle", () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function wistiaEmbed(mediaId, ratio = "16 / 9") {
    const frame = document.createElement("iframe");
    frame.src = `https://fast.wistia.net/embed/iframe/${encodeURIComponent(mediaId)}?seo=false&videoFoam=true`;
    frame.allow = "autoplay; fullscreen";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    frame.title = "Vídeo";
    frame.style.aspectRatio = ratio;
    return frame;
  }

  function configureWistia() {
    const hero = document.querySelector('[data-wistia-slot="hero"]');
    if (hero && cfg.WISTIA_HERO) {
      hero.appendChild(wistiaEmbed(cfg.WISTIA_HERO, "9 / 16"));
      hero.hidden = false;
    }

    const ids = [cfg.WISTIA_DEPOIMENTO_1, cfg.WISTIA_DEPOIMENTO_2].filter(Boolean);
    const section = document.querySelector("[data-testimonials]");
    const grid = document.querySelector("[data-testimonial-grid]");
    if (section && grid && ids.length) {
      ids.forEach((id) => {
        const wrap = document.createElement("div");
        wrap.className = "testimonial-video";
        wrap.appendChild(wistiaEmbed(id));
        grid.appendChild(wrap);
      });
      section.hidden = false;
    }
  }

  function revealOnScroll() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(".problem-item, .benefit-card, .gallery-card, .overview-grid article, .price-card, .guarantee-card");
    targets.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    targets.forEach((el) => observer.observe(el));
  }

  updateDate();
  updateYear();
  configureCheckoutLinks();
  configureFaq();
  configureWistia();
  revealOnScroll();
})();
