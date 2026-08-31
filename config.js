window.SITE_CONFIG = Object.freeze({
  PRECO_BASICO: "10",
  LINK_BASICO: "",
  PRECO_COMPLETO: "19,90",
  LINK_COMPLETO: "",
  LINK_UPGRADE: "",
  EMAIL_SUPORTE: "academiadigital10@gmail.com",
  WISTIA_VIDEO_PRINCIPAL: "",
  WISTIA_DEPOIMENTO_1: "",
  WISTIA_DEPOIMENTO_2: ""
});

document.querySelector(".promo-dot")?.remove();
document.querySelector(".mobile-sticky-cta")?.remove();
document.querySelector(".final-cta")?.remove();

const footerLogo = document.querySelector(".footer-logo");
if (footerLogo) footerLogo.style.width = "min(180px, 58vw)";

document.querySelector(".hero .hero-copy-wrap > .eyebrow")?.remove();
document.querySelector(".hero-points span:first-child")?.remove();

const showcaseSubtitle = document.querySelector(".showcase .section-heading > p:last-child");
if (showcaseSubtitle) {
  showcaseSubtitle.textContent = "Veja alguns dos modelos que você terá acesso. Escolha, edite com seus dados e comece a usar.";
}

// Demonstra uma única vez, no celular, que a galeria pode ser arrastada.
const mobileGallery = document.querySelector(".showcase .gallery");
if (
  mobileGallery &&
  window.matchMedia("(max-width: 939px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let cancelled = false;
  let played = false;
  let frame = null;
  let timer = null;

  const cancelDemo = () => {
    cancelled = true;
    if (frame) cancelAnimationFrame(frame);
    if (timer) clearTimeout(timer);
    mobileGallery.style.scrollSnapType = "";
  };

  ["touchstart", "pointerdown"].forEach((eventName) => {
    mobileGallery.addEventListener(eventName, cancelDemo, { once: true, passive: true });
  });

  const animateScroll = (target, duration, done) => {
    const start = mobileGallery.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    const step = (now) => {
      if (cancelled) return;
      const p = Math.min((now - startTime) / duration, 1);
      const eased = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      mobileGallery.scrollLeft = start + distance * eased;
      if (p < 1) frame = requestAnimationFrame(step);
      else if (typeof done === "function") done();
    };

    frame = requestAnimationFrame(step);
  };

  const playDemo = () => {
    if (played || cancelled) return;
    played = true;
    const maxScroll = Math.max(0, mobileGallery.scrollWidth - mobileGallery.clientWidth);
    const distance = Math.min(88, maxScroll);
    if (distance < 24) return;

    mobileGallery.style.scrollSnapType = "none";
    animateScroll(distance, 1800, () => {
      timer = setTimeout(() => {
        animateScroll(0, 1500, () => {
          mobileGallery.style.scrollSnapType = "";
        });
      }, 420);
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      currentObserver.disconnect();
      timer = setTimeout(playDemo, 550);
    }, { threshold: .4 });
    observer.observe(mobileGallery);
  } else {
    timer = setTimeout(playDemo, 1800);
  }
}

const pricingTitle = document.querySelector("#pricing-title");
if (pricingTitle) {
  pricingTitle.innerHTML = 'Por que ficar só com o básico quando você pode ter a <span class="premium-highlight">biblioteca completa</span>?';
}

const pricingSubtitle = document.querySelector(".pricing .section-heading > p:last-child");
if (pricingSubtitle) {
  pricingSubtitle.innerHTML = 'Mais de <b>75 MIL planilhas</b>, acesso <b>vitalício</b>, dashboards, atualizações e <b>todos os bônus</b> por apenas R$19,90.';
}

// R$79,60 com 75% de desconto resulta exatamente em R$19,90.
const completePriceRow = document.querySelector(".price-row-complete");
if (completePriceRow) {
  completePriceRow.innerHTML = `
    <div class="premium-price-compact">
      <div class="premium-promo-hot">75% DE PROMOÇÃO SOMENTE HOJE</div>
      <div class="premium-old-price">De <span>R$79,60</span> por</div>
      <div class="premium-installment"><span>4x de</span> <strong>R$5,82</strong></div>
      <div class="premium-cash-price">ou <strong>R$19,90 à vista</strong></div>
    </div>
  `;
}

const completeButton = document.querySelector(".price-complete .cta-primary");
if (completeButton) {
  completeButton.textContent = "SIM, EU QUERO O PLANO COMPLETO!";
}

const siteEnhancementStyle = document.createElement("style");
siteEnhancementStyle.textContent = `
  @media (max-width: 939px) {
    .hero-logo {
      width: min(140px, 42vw) !important;
      height: 44px !important;
      margin-bottom: 14px !important;
    }

    .pricing .section-heading { margin-bottom: 34px; }
    .price-complete { order: -1; }

    .premium-promo-hot {
      font-size: 10px;
      padding: 8px 11px;
    }

    .premium-old-price { margin-top: 14px; font-size: 12px; }
    .premium-old-price span { font-size: 17px; }

    .premium-installment { margin-top: 5px; }
    .premium-installment span { font-size: 21px; }
    .premium-installment strong { font-size: clamp(40px, 12vw, 48px); }
    .premium-cash-price { margin-top: 7px; font-size: 13px; }
  }

  @media (min-width: 940px) {
    .hero-logo { width: 190px !important; height: 58px !important; }
    .pricing .section-heading { max-width: 790px; margin-bottom: 44px; }
    .price-complete { transform: translateY(-8px) scale(1.018); }
    .premium-installment span { font-size: 24px; }
    .premium-installment strong { font-size: 52px; }
  }

  .pricing {
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 76% 18%, rgba(49,190,125,.12), transparent 25rem),
      radial-gradient(circle at 15% 82%, rgba(15,111,70,.06), transparent 22rem),
      linear-gradient(180deg, #fbfdfc 0%, #f3f9f6 100%) !important;
  }

  .pricing::before {
    content: "";
    position: absolute;
    width: 360px;
    height: 360px;
    right: -190px;
    top: 90px;
    border: 1px solid rgba(49,190,125,.11);
    border-radius: 50%;
    pointer-events: none;
  }

  .pricing .container-pricing { position: relative; z-index: 1; }
  .pricing .section-heading > p:last-child { max-width: 650px; margin-inline: auto; }

  #pricing-title .premium-highlight {
    position: relative;
    display: inline-block;
    color: transparent;
    background: linear-gradient(100deg, #0f6f46 0%, #19a968 35%, #73e9ad 52%, #22bd76 70%, #0f6f46 100%);
    background-size: 220% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: premiumTextShine 5s ease-in-out infinite;
    filter: drop-shadow(0 0 9px rgba(49,190,125,.18));
  }

  #pricing-title .premium-highlight::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 4%;
    right: 4%;
    bottom: 1px;
    height: 9px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(49,190,125,.24), transparent);
    filter: blur(7px);
    opacity: .72;
  }

  .price-basic {
    border-color: #e4ebe7 !important;
    box-shadow: 0 10px 30px rgba(24,66,44,.06) !important;
  }

  .price-complete {
    isolation: isolate;
    overflow: visible;
    color: #111713 !important;
    border: 2px solid #23b974 !important;
    background: linear-gradient(180deg, #fff 0%, #fbfffd 100%) !important;
    box-shadow: 0 30px 75px rgba(15,111,70,.18), 0 8px 24px rgba(26,169,104,.10) !important;
  }

  .price-complete::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -10px;
    border-radius: 25px;
    background: linear-gradient(135deg, rgba(49,190,125,.18), rgba(15,111,70,.03) 45%, rgba(115,233,173,.14));
    filter: blur(20px);
    opacity: .68;
    pointer-events: none;
  }

  .price-complete::after {
    content: "";
    position: absolute;
    top: -2px;
    left: 14%;
    right: 14%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, #8df3bd, #24ba75, transparent);
    box-shadow: 0 0 13px rgba(49,190,125,.42);
    pointer-events: none;
  }

  .price-complete .value-badge {
    background: linear-gradient(110deg, #0d6841, #1fba71 55%, #0d6841) !important;
    box-shadow: 0 8px 22px rgba(15,111,70,.22);
  }

  .price-complete .plan-kicker { color: #0d7447; }
  .price-complete .plan-head h3,
  .price-complete .feature-list li strong,
  .price-complete .bonus-title h4 { color: #07100b !important; }

  .price-complete .plan-head p:last-child,
  .price-complete .feature-list li,
  .price-complete .bonus-panel,
  .price-complete .bonus-panel ol,
  .price-complete .bonus-panel li { color: #202722 !important; }

  .price-complete .complete-visual img {
    filter: drop-shadow(0 23px 27px rgba(15,111,70,.18));
  }

  .price-row-complete {
    position: relative;
    display: block !important;
    margin-top: 8px;
    padding: 18px 0 14px !important;
  }

  .price-row-complete::before {
    content: "";
    position: absolute;
    left: 18%;
    right: 18%;
    top: 7px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(49,190,125,.30), transparent);
  }

  .premium-price-compact {
    display: block !important;
    width: 100%;
    text-align: center;
  }

  .premium-promo-hot {
    display: inline-block;
    max-width: 100%;
    border-radius: 7px;
    color: #fff;
    background: linear-gradient(105deg, #c82720, #ef5b22);
    box-shadow: 0 8px 20px rgba(200,39,32,.18);
    font-weight: 900;
    letter-spacing: .055em;
  }

  .premium-old-price {
    color: #59625d !important;
    font-weight: 700;
  }

  .premium-old-price span {
    color: #d32222 !important;
    font-weight: 900;
    text-decoration-line: line-through;
    text-decoration-color: #e21e1e;
    text-decoration-thickness: 3px;
    text-decoration-skip-ink: none;
  }

  .premium-installment {
    display: flex !important;
    align-items: baseline !important;
    justify-content: center !important;
    gap: 7px;
    line-height: .92;
  }

  .premium-installment span,
  .premium-installment strong {
    color: transparent !important;
    background: linear-gradient(105deg, #0b7547, #18b56d 55%, #0c7b49);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .premium-installment span {
    font-weight: 900;
    letter-spacing: -.035em;
  }

  .premium-installment strong {
    margin: 0 !important;
    padding: 0 !important;
    font-weight: 950 !important;
    line-height: .9 !important;
    letter-spacing: -.055em !important;
    text-shadow: none !important;
  }

  .premium-cash-price { color: #515b55 !important; font-weight: 700; }
  .premium-cash-price strong {
    color: #111713 !important;
    font-size: 18px !important;
    font-weight: 900 !important;
    letter-spacing: -.015em !important;
    text-shadow: none !important;
  }

  .price-complete .cta-primary {
    position: relative !important;
    z-index: 4 !important;
    display: inline-flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    overflow: hidden;
    width: 100% !important;
    min-height: 58px;
    color: #fff !important;
    background: linear-gradient(115deg, #159459, #22c276 55%, #0d7c4a) !important;
    box-shadow: 0 14px 30px rgba(17,143,84,.25) !important;
    transition: transform .2s ease, box-shadow .2s ease, filter .2s ease !important;
  }

  .price-complete .cta-primary::after {
    content: "";
    position: absolute;
    top: -45%;
    bottom: -45%;
    left: -45%;
    width: 28%;
    transform: skewX(-18deg);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.45), transparent);
    opacity: 0;
    pointer-events: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .price-complete .cta-primary:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 18px 38px rgba(17,143,84,.36) !important;
      filter: saturate(1.06);
    }

    .price-complete .cta-primary:hover::after {
      left: 118%;
      opacity: 1;
      transition: left .58s ease, opacity .18s ease;
    }
  }

  .price-complete .cta-primary:active { transform: translateY(1px) !important; }
  .price-complete .access-note,
  .price-complete .security-line { color: #344039 !important; }

  @keyframes premiumTextShine {
    0%, 22% { background-position: 100% 50%; }
    55%, 100% { background-position: 0% 50%; }
  }

  @media (prefers-reduced-motion: reduce) {
    #pricing-title .premium-highlight { animation: none !important; }
    .price-complete .cta-primary,
    .price-complete .cta-primary::after { transition: none !important; }
  }
`;
document.head.appendChild(siteEnhancementStyle);
