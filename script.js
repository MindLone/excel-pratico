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

  function configureMainVideoSection() {
    const section = document.querySelector(".problem");
    if (!section) return;

    section.removeAttribute("aria-labelledby");
    section.className = "section main-video-section";
    section.innerHTML = `
      <div class="container">
        <div class="main-video-shell">
          <div class="main-video-slot" data-wistia-slot="main" aria-label="Vídeo de apresentação"></div>
        </div>
        <div class="section-cta">
          <a class="text-cta" href="#ofertas">QUERO FACILITAR MINHA ROTINA <span aria-hidden="true">→</span></a>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .main-video-section{
        padding:54px 0 48px;
        background:#fff;
      }
      .main-video-shell{
        width:min(100%,1040px);
        margin:0 auto;
        padding:6px;
        border:2px solid var(--green);
        border-radius:18px;
        background:linear-gradient(145deg,rgba(49,190,125,.14),rgba(15,111,70,.035));
        box-shadow:0 18px 48px rgba(20,112,70,.12);
      }
      .main-video-slot{
        position:relative;
        width:100%;
        aspect-ratio:16/9;
        overflow:hidden;
        display:grid;
        place-items:center;
        border-radius:12px;
        background:
          radial-gradient(circle at 50% 45%,rgba(49,190,125,.10),transparent 42%),
          linear-gradient(145deg,#f8fbf9,#eef7f2);
      }
      .main-video-slot iframe,
      .main-video-slot wistia-player,
      .main-video-slot .wistia_embed{
        position:absolute!important;
        inset:0!important;
        width:100%!important;
        height:100%!important;
        border:0!important;
        border-radius:12px!important;
        overflow:hidden!important;
        display:block!important;
      }
      .main-video-slot:empty::before{
        content:"";
        width:72px;
        height:72px;
        border:1px solid rgba(15,111,70,.22);
        border-radius:50%;
        background:rgba(255,255,255,.72);
        box-shadow:0 10px 26px rgba(15,111,70,.10);
      }
      .main-video-slot:empty::after{
        content:"";
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-38%,-50%);
        width:0;
        height:0;
        border-top:11px solid transparent;
        border-bottom:11px solid transparent;
        border-left:17px solid var(--green-dark);
      }
      .main-video-section .section-cta{
        margin-top:24px;
      }
      @media (max-width:640px){
        .main-video-section{padding:36px 0 38px}
        .main-video-shell{padding:4px;border-radius:14px}
        .main-video-slot{border-radius:10px}
        .main-video-slot:empty::before{width:56px;height:56px}
        .main-video-slot:empty::after{border-top-width:8px;border-bottom-width:8px;border-left-width:13px}
      }
    `;
    document.head.appendChild(style);
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
    const main = document.querySelector('[data-wistia-slot="main"]');
    if (main && cfg.WISTIA_VIDEO_PRINCIPAL) {
      main.appendChild(wistiaEmbed(cfg.WISTIA_VIDEO_PRINCIPAL));
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
    const targets = document.querySelectorAll(".benefit-card, .gallery-card, .overview-grid article, .price-card, .guarantee-card");
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
  configureMainVideoSection();
  configureWistia();
  revealOnScroll();
})();
