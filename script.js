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
    target.innerHTML = `🔥 PROMOÇÃO DE <span style="display:inline-block;padding:2px 7px;margin:0 3px;border-radius:4px;background:#e30613;color:#ffe600;font-weight:900;box-shadow:0 0 0 1px rgba(255,230,0,.12) inset;">75% DE DESCONTO</span> SOMENTE HOJE, ${formatted.toUpperCase()}`;
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
          <div class="main-video-slot" data-wistia-slot="main" aria-label="Vídeo de apresentação">
            <img
              class="main-video-cover"
              src="/assets/capa-video-nova.png"
              alt="Aperte o play"
              width="941"
              height="1672"
              loading="eager"
              decoding="async"
            />
          </div>
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
        width:min(100%,380px);
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
        aspect-ratio:9/16;
        overflow:hidden;
        display:grid;
        place-items:center;
        border-radius:12px;
        background:
          radial-gradient(circle at 50% 45%,rgba(49,190,125,.10),transparent 42%),
          linear-gradient(145deg,#f8fbf9,#eef7f2);
      }
      .main-video-cover{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius:12px;
        display:block;
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
        z-index:2;
      }
      .main-video-section .section-cta{
        margin-top:24px;
      }
      @media (max-width:640px){
        .main-video-section{padding:36px 0 38px}
        .main-video-shell{
          width:min(92vw,380px);
          padding:4px;
          border-radius:14px;
        }
        .main-video-slot{border-radius:10px}
        .main-video-cover{border-radius:10px}
      }
    `;
    document.head.appendChild(style);
  }

  function configureReviewVideoSection() {
    const section = document.querySelector(".package-overview");
    const oldGrid = section?.querySelector(".overview-grid");
    if (!section || !oldGrid) return;

    oldGrid.className = "review-video-grid";
    oldGrid.innerHTML = `
      <div class="review-video-shell">
        <div class="review-video-slot" data-wistia-slot="review-1" aria-label="Avaliação em vídeo 1"></div>
      </div>
      <div class="review-video-shell">
        <div class="review-video-slot" data-wistia-slot="review-2" aria-label="Avaliação em vídeo 2"></div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .package-overview .review-video-grid{
        width:min(100%,1080px);
        margin:34px auto 0;
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:22px;
        align-items:center;
      }
      .review-video-shell{
        position:relative;
        padding:5px;
        border:1px solid rgba(94,224,159,.52);
        border-radius:17px;
        background:linear-gradient(145deg,rgba(88,217,152,.13),rgba(255,255,255,.025));
        box-shadow:0 20px 50px rgba(0,0,0,.22),0 0 0 1px rgba(255,255,255,.025) inset;
      }
      .review-video-slot{
        position:relative;
        width:100%;
        aspect-ratio:16/9;
        overflow:hidden;
        display:grid;
        place-items:center;
        border-radius:12px;
        background:
          radial-gradient(circle at 50% 45%,rgba(76,218,147,.13),transparent 35%),
          linear-gradient(145deg,#10271d,#08140f);
      }
      .review-video-slot iframe,
      .review-video-slot wistia-player,
      .review-video-slot .wistia_embed{
        position:absolute!important;
        inset:0!important;
        width:100%!important;
        height:100%!important;
        border:0!important;
        border-radius:12px!important;
        overflow:hidden!important;
        display:block!important;
      }
      .review-video-slot:empty::before{
        content:"";
        width:62px;
        height:62px;
        border-radius:50%;
        border:1px solid rgba(95,224,159,.38);
        background:rgba(255,255,255,.055);
        box-shadow:0 10px 30px rgba(0,0,0,.22),0 0 25px rgba(88,217,152,.08);
      }
      .review-video-slot:empty::after{
        content:"";
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-38%,-50%);
        width:0;
        height:0;
        border-top:9px solid transparent;
        border-bottom:9px solid transparent;
        border-left:14px solid #61dfa0;
      }
      @media (max-width:760px){
        .package-overview .review-video-grid{
          width:min(100%,580px);
          grid-template-columns:1fr;
          gap:16px;
          margin-top:26px;
        }
        .review-video-shell{padding:4px;border-radius:14px}
        .review-video-slot{border-radius:10px}
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
      main.innerHTML = "";
      main.appendChild(wistiaEmbed(cfg.WISTIA_VIDEO_PRINCIPAL, "9 / 16"));
    }

    const reviewSlots = [
      [document.querySelector('[data-wistia-slot="review-1"]'), cfg.WISTIA_DEPOIMENTO_1],
      [document.querySelector('[data-wistia-slot="review-2"]'), cfg.WISTIA_DEPOIMENTO_2]
    ];

    reviewSlots.forEach(([slot, mediaId]) => {
      if (!slot || !mediaId) return;
      slot.innerHTML = "";
      slot.appendChild(wistiaEmbed(mediaId));
    });

    const legacySection = document.querySelector("[data-testimonials]");
    if (legacySection) legacySection.hidden = true;
  }

  function revealOnScroll() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(".benefit-card, .gallery-card, .review-video-shell, .price-card, .guarantee-card");
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
  configureReviewVideoSection();
  configureWistia();
  revealOnScroll();
})();
