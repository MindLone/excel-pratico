(() => {
  "use strict";

  const cfg = window.SITE_CONFIG || {};


  function configureContentProtection() {
    let rightClickAttempts = 0;
    let attemptsTimer;
    let hideTimer;
    let notice;

    function showProtectionNotice() {
      if (!notice) {
        notice = document.createElement("div");
        notice.setAttribute("role", "status");
        notice.setAttribute("aria-live", "polite");
        notice.textContent = "Conteúdo protegido por direitos autorais. Cópia ou reprodução sem autorização é proibida.";
        Object.assign(notice.style, {
          position: "fixed",
          zIndex: "2147483647",
          left: "50%",
          bottom: "22px",
          width: "min(560px, calc(100vw - 28px))",
          padding: "14px 18px",
          border: "1px solid rgba(108, 231, 169, .4)",
          borderRadius: "12px",
          background: "rgba(7, 27, 18, .96)",
          color: "#ffffff",
          boxShadow: "0 16px 42px rgba(0, 0, 0, .28)",
          font: "700 13px/1.45 Inter, system-ui, sans-serif",
          textAlign: "center",
          pointerEvents: "none",
          opacity: "0",
          transform: "translate(-50%, 12px)",
          transition: "opacity .2s ease, transform .2s ease"
        });
        document.body.appendChild(notice);
      }

      clearTimeout(hideTimer);
      requestAnimationFrame(() => {
        notice.style.opacity = "1";
        notice.style.transform = "translate(-50%, 0)";
      });
      hideTimer = setTimeout(() => {
        notice.style.opacity = "0";
        notice.style.transform = "translate(-50%, 12px)";
      }, 3200);
    }

    document.addEventListener("contextmenu", (event) => {
      if (event.target.closest("input, textarea, [contenteditable='true']")) return;

      event.preventDefault();
      rightClickAttempts += 1;
      clearTimeout(attemptsTimer);
      attemptsTimer = setTimeout(() => {
        rightClickAttempts = 0;
      }, 4000);

      if (rightClickAttempts < 2) return;
      rightClickAttempts = 0;
      showProtectionNotice();
    }, { capture: true });

    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      const primaryModifier = event.ctrlKey || event.metaKey;
      const blockedSourceShortcut = primaryModifier && key === "u";
      const blockedDevToolsShortcut =
        key === "f12" ||
        (primaryModifier && event.shiftKey && ["i", "j", "c", "l"].includes(key));

      if (!blockedSourceShortcut && !blockedDevToolsShortcut) return;

      event.preventDefault();
      event.stopPropagation();
      showProtectionNotice();
    }, { capture: true });

    document.addEventListener("dragstart", (event) => {
      if (event.target instanceof HTMLImageElement) event.preventDefault();
    });
  }

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

  function updateContactEmail() {
    const oldEmail = "academiadigital10@gmail.com";
    const newEmail = "excelavancadoea@gmail.com";
    document.querySelectorAll(`a[href="mailto:${oldEmail}"]`).forEach((link) => {
      link.href = `mailto:${newEmail}`;
      link.textContent = newEmail;
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
      }
    `;
    document.head.appendChild(style);
  }

  function configureReviewsCarousel() {
    const carousel = document.querySelector("[data-reviews-carousel]");
    if (!carousel) return;

    const viewport = carousel.querySelector(".reviews-viewport");
    const track = carousel.querySelector(".reviews-track");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pauses = new Set(["offscreen"]);
    let userPaused = motion.matches;
    let frame = null;
    let previousTime = 0;
    let position = 0;
    let loopWidth = 0;
    let interactionTimer;

    document.querySelector(".review-dialog")?.remove();
    carousel.querySelector(".reviews-controls")?.remove();
    const hint = carousel.querySelector(".reviews-hint");
    if (hint) hint.textContent = "Deslize para ver mais.";

    const cards = [...track.children].map((card) => {
      if (card.tagName !== "BUTTON") return card;
      const staticCard = document.createElement("div");
      staticCard.className = card.className;
      staticCard.innerHTML = card.innerHTML;
      card.replaceWith(staticCard);
      return staticCard;
    });

    const cueStyle = document.createElement("style");
    cueStyle.textContent = `
      .reviews-carousel{position:relative}
      .review-card{cursor:default!important;pointer-events:none;user-select:none}
      .reviews-nav{
        position:absolute;
        z-index:4;
        top:46%;
        transform:translateY(-50%);
        width:36px;
        height:54px;
        display:grid;
        place-items:center;
        padding:0;
        border:1px solid rgba(124,228,177,.18);
        border-radius:999px;
        background:rgba(13,28,21,.58);
        color:rgba(216,238,226,.78);
        font:300 30px/1 Inter,system-ui,sans-serif;
        cursor:pointer;
        backdrop-filter:blur(5px);
        box-shadow:0 8px 22px rgba(0,0,0,.12);
        transition:background .18s ease,border-color .18s ease,transform .18s ease;
      }
      .reviews-nav-prev{left:4px}
      .reviews-nav-next{right:4px}
      .reviews-nav:focus-visible{outline:2px solid #7ce4b1;outline-offset:3px}
      @media (hover:hover){
        .reviews-nav:hover{background:rgba(13,28,21,.78);border-color:rgba(124,228,177,.42)}
      }
      @media (max-width:699px){
        .reviews-nav{width:36px;height:52px;font-size:28px}
        .reviews-nav-prev{left:-2px}
        .reviews-nav-next{right:-2px}
      }
    `;
    document.head.appendChild(cueStyle);

    // A second copy makes the visual loop continuous; assistive technology reads each review once.
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelector("img").alt = "";
      track.appendChild(clone);
    });

    const measure = () => {
      loopWidth = track.children[cards.length].offsetLeft - cards[0].offsetLeft;
      position = viewport.scrollLeft;
    };

    const animate = (now) => {
      if (previousTime) position += Math.min(now - previousTime, 64) * .022;
      previousTime = now;
      if (loopWidth > 0 && position >= loopWidth) position %= loopWidth;
      viewport.scrollLeft = position;
      frame = requestAnimationFrame(animate);
    };

    const updatePlayback = () => {
      const playing = !userPaused && pauses.size === 0;
      if (!playing && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
      if (playing && frame === null) {
        position = viewport.scrollLeft;
        previousTime = 0;
        frame = requestAnimationFrame(animate);
      }
    };

    const pause = (reason, active) => {
      if (active) pauses.add(reason);
      else pauses.delete(reason);
      updatePlayback();
    };

    const allowReading = () => {
      clearTimeout(interactionTimer);
      pause("reading", true);
      interactionTimer = setTimeout(() => pause("reading", false), 8000);
    };

    const move = (direction) => {
      allowReading();
      measure();
      const step = cards[1].offsetLeft - cards[0].offsetLeft;
      let target = (Math.round(viewport.scrollLeft / step) + direction) * step;
      if (target < 0) {
        viewport.scrollLeft += loopWidth;
        target += loopWidth;
      } else if (target > loopWidth) {
        viewport.scrollLeft -= loopWidth;
        target -= loopWidth;
      }
      viewport.scrollTo({ left: target, behavior: motion.matches ? "auto" : "smooth" });
    };

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.className = "reviews-nav reviews-nav-prev";
    previousButton.setAttribute("aria-label", "Avaliação anterior");
    previousButton.innerHTML = '<span aria-hidden="true">‹</span>';

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className = "reviews-nav reviews-nav-next";
    nextButton.setAttribute("aria-label", "Próxima avaliação");
    nextButton.innerHTML = '<span aria-hidden="true">›</span>';

    previousButton.addEventListener("click", () => move(-1));
    nextButton.addEventListener("click", () => move(1));
    carousel.append(previousButton, nextButton);

    viewport.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") pause("hover", true);
    });
    viewport.addEventListener("pointerleave", () => pause("hover", false));
    viewport.addEventListener("pointerdown", () => pause("pointer", true), { passive: true });
    const releasePointer = () => {
      if (!pauses.has("pointer")) return;
      allowReading();
      pause("pointer", false);
    };
    window.addEventListener("pointerup", releasePointer, { passive: true });
    window.addEventListener("pointercancel", releasePointer, { passive: true });
    viewport.addEventListener("wheel", allowReading, { passive: true });
    viewport.addEventListener("focusin", () => pause("focus", true));
    viewport.addEventListener("focusout", () => {
      queueMicrotask(() => pause("focus", viewport.contains(document.activeElement)));
    });
    viewport.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    });
    document.addEventListener("visibilitychange", () => pause("hidden", document.hidden));
    motion.addEventListener("change", (event) => {
      userPaused = event.matches;
      updatePlayback();
    });
    const visibility = new IntersectionObserver(([entry]) => pause("offscreen", !entry.isIntersecting), { threshold: .1 });
    visibility.observe(viewport);
    new ResizeObserver(measure).observe(viewport);
    measure();
    updatePlayback();
  }

  function configureWistia() {
    const main = document.querySelector('[data-wistia-slot="main"]');
    if (main && cfg.WISTIA_VIDEO_PRINCIPAL) {
      const player = document.createElement("wistia-player");
      player.setAttribute("media-id", cfg.WISTIA_VIDEO_PRINCIPAL);
      player.setAttribute("aspect", "0.5625");
      main.replaceChildren(player);
    }

    const legacySection = document.querySelector("[data-testimonials]");
    if (legacySection) legacySection.hidden = true;
  }

  function revealOnScroll() {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll(".benefit-card, .gallery-card, .price-card, .guarantee-card");
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

  configureContentProtection();
  updateDate();
  updateYear();
  updateContactEmail();
  configureCheckoutLinks();
  configureFaq();
  configureMainVideoSection();
  configureReviewsCarousel();
  configureWistia();
  revealOnScroll();
})();