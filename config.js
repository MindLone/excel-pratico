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
if (footerLogo) {
  footerLogo.style.width = "min(180px, 58vw)";
}

// Limpeza do topo para priorizar a experiência no celular.
document.querySelector(".hero .hero-copy-wrap > .eyebrow")?.remove();
document.querySelector(".hero-points span:first-child")?.remove();

// Restaura a versão curta aprovada para a vitrine sem regravar o HTML inteiro.
const showcaseSubtitle = document.querySelector(".showcase .section-heading > p:last-child");
if (showcaseSubtitle) {
  showcaseSubtitle.textContent = "Veja alguns dos modelos que você terá acesso. Escolha, edite com seus dados e comece a usar.";
}

// No celular, demonstra uma única vez que a galeria pode ser arrastada para o lado.
const mobileGallery = document.querySelector(".showcase .gallery");
if (
  mobileGallery &&
  window.matchMedia("(max-width: 939px)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let galleryDemoCancelled = false;
  let galleryDemoPlayed = false;
  let galleryDemoFrame = null;
  let galleryDemoTimer = null;

  const cancelGalleryDemo = () => {
    galleryDemoCancelled = true;
    if (galleryDemoFrame) cancelAnimationFrame(galleryDemoFrame);
    if (galleryDemoTimer) clearTimeout(galleryDemoTimer);
    mobileGallery.style.scrollSnapType = "";
  };

  ["touchstart", "pointerdown"].forEach((eventName) => {
    mobileGallery.addEventListener(eventName, cancelGalleryDemo, { once: true, passive: true });
  });

  const animateGalleryScroll = (target, duration, onDone) => {
    const start = mobileGallery.scrollLeft;
    const distance = target - start;
    const startedAt = performance.now();

    const step = (now) => {
      if (galleryDemoCancelled) return;
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      mobileGallery.scrollLeft = start + distance * eased;

      if (progress < 1) {
        galleryDemoFrame = requestAnimationFrame(step);
      } else if (typeof onDone === "function") {
        onDone();
      }
    };

    galleryDemoFrame = requestAnimationFrame(step);
  };

  const playGalleryDemo = () => {
    if (galleryDemoPlayed || galleryDemoCancelled) return;
    galleryDemoPlayed = true;

    const maxScroll = Math.max(0, mobileGallery.scrollWidth - mobileGallery.clientWidth);
    const demoDistance = Math.min(88, maxScroll);
    if (demoDistance < 24) return;

    mobileGallery.style.scrollSnapType = "none";
    animateGalleryScroll(demoDistance, 1800, () => {
      galleryDemoTimer = setTimeout(() => {
        animateGalleryScroll(0, 1500, () => {
          mobileGallery.style.scrollSnapType = "";
        });
      }, 420);
    });
  };

  if ("IntersectionObserver" in window) {
    const galleryObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      galleryDemoTimer = setTimeout(playGalleryDemo, 550);
    }, { threshold: 0.4 });

    galleryObserver.observe(mobileGallery);
  } else {
    galleryDemoTimer = setTimeout(playGalleryDemo, 1800);
  }
}

// Destaque premium da seção de ofertas.
const pricingTitle = document.querySelector("#pricing-title");
if (pricingTitle) {
  pricingTitle.innerHTML = 'Por que ficar só com o básico quando você pode ter a <span class="premium-highlight">biblioteca completa</span>?';
}

// Mantém o preço do pacote completo sincronizado na oferta visível.
const pricingSubtitle = document.querySelector(".pricing .section-heading > p:last-child");
if (pricingSubtitle) {
  pricingSubtitle.innerHTML = 'Mais de <b>75 MIL planilhas</b>, acesso <b>vitalício</b>, dashboards, atualizações e <b>todos os bônus</b> por apenas R$19,90.';
}

// Reforça a ancoragem e o parcelamento real do Pacote Completo.
const completePriceRow = document.querySelector(".price-row-complete");
if (completePriceRow) {
  completePriceRow.innerHTML = `
    <div class="premium-price-offer">
      <div class="premium-promo-ribbon">46% DE PROMOÇÃO SOMENTE HOJE</div>
      <div class="premium-old-price">De <span>R$37,00</span></div>
      <div class="premium-installment" aria-label="4 parcelas de 5 reais e 82 centavos">
        <span class="premium-installment-count">4x de</span>
        <strong>R$5,82</strong>
      </div>
      <div class="premium-cash-price">ou <strong>R$19,90 à vista</strong></div>
    </div>
  `;
}

const siteEnhancementStyle = document.createElement("style");
siteEnhancementStyle.textContent = `
  @media (max-width: 939px) {
    .hero-logo {
      width: min(140px, 42vw) !important;
      height: 44px !important;
      margin-bottom: 14px !important;
    }

    .pricing .section-heading {
      margin-bottom: 34px;
    }

    .price-complete {
      order: -1;
    }

    .premium-price-offer {
      padding: 20px 10px 17px;
    }

    .premium-promo-ribbon {
      width: min(100%, 300px);
      font-size: 10px;
      letter-spacing: .065em;
    }

    .premium-old-price {
      margin-top: 17px;
      font-size: 13px;
    }

    .premium-installment {
      margin-top: 7px;
      gap: 7px;
    }

    .premium-installment-count {
      font-size: clamp(25px, 8vw, 32px) !important;
    }

    .premium-installment strong {
      font-size: clamp(48px, 15.2vw, 63px) !important;
    }

    .premium-cash-price {
      margin-top: 9px;
      font-size: 13px;
    }
  }

  @media (min-width: 940px) {
    .hero-logo {
      width: 190px !important;
      height: 58px !important;
    }

    .pricing .section-heading {
      max-width: 790px;
      margin-bottom: 44px;
    }

    .price-complete {
      transform: translateY(-8px) scale(1.018);
    }

    .premium-price-offer {
      padding: 24px 14px 20px;
    }

    .premium-installment-count {
      font-size: 31px !important;
    }

    .premium-installment strong {
      font-size: 68px !important;
    }
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

  .pricing .container-pricing {
    position: relative;
    z-index: 1;
  }

  #pricing-title .premium-highlight {
    position: relative;
    display: inline-block;
    color: transparent;
    background: linear-gradient(100deg, #0f6f46 0%, #19a968 24%, #73e9ad 48%, #22bd76 66%, #0f6f46 100%);
    background-size: 240% 100%;
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

  .pricing .section-heading > p:last-child {
    max-width: 650px;
    margin-inline: auto;
  }

  .price-basic {
    border-color: #e4ebe7 !important;
    box-shadow: 0 10px 30px rgba(24,66,44,.06) !important;
  }

  .price-complete {
    isolation: isolate;
    overflow: visible;
    color: #101612 !important;
    border: 2px solid #23b974 !important;
    background: linear-gradient(180deg, #ffffff 0%, #fbfffd 100%) !important;
    box-shadow:
      0 30px 75px rgba(15,111,70,.18),
      0 8px 24px rgba(26,169,104,.10) !important;
  }

  .price-complete::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: -10px;
    border-radius: 25px;
    background: linear-gradient(135deg, rgba(49,190,125,.20), rgba(15,111,70,.03) 45%, rgba(115,233,173,.16));
    filter: blur(20px);
    opacity: .72;
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
    box-shadow: 0 0 13px rgba(49,190,125,.52);
    pointer-events: none;
  }

  .price-complete .value-badge {
    background: linear-gradient(110deg, #0d6841, #1fba71 55%, #0d6841) !important;
    background-size: 180% 100% !important;
    box-shadow: 0 8px 22px rgba(15,111,70,.25), 0 0 0 3px rgba(49,190,125,.08);
    animation: badgeShine 5.5s ease-in-out infinite;
  }

  .price-complete .plan-kicker {
    color: #0c7446;
  }

  .price-complete .plan-head h3 {
    color: #07100b !important;
    text-shadow: 0 1px 0 rgba(255,255,255,.9);
  }

  .price-complete .plan-head p:last-child,
  .price-complete .feature-list li,
  .price-complete .bonus-panel,
  .price-complete .bonus-panel ol,
  .price-complete .bonus-panel li {
    color: #1a211d !important;
  }

  .price-complete .feature-list li strong,
  .price-complete .bonus-title h4 {
    color: #07100b !important;
  }

  .price-complete .complete-visual img {
    filter: drop-shadow(0 23px 27px rgba(15,111,70,.18));
  }

  .price-row-complete {
    position: relative;
    margin-top: 5px;
    padding: 17px 0 16px !important;
  }

  .price-row-complete::before {
    content: "";
    position: absolute;
    left: 12%;
    right: 12%;
    top: 7px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(49,190,125,.36), transparent);
  }

  .price-row-complete > .premium-price-offer {
    position: relative;
    display: block !important;
    width: 100%;
    overflow: hidden;
    text-align: center;
    border: 1px solid rgba(35,185,116,.18);
    border-radius: 17px;
    background:
      radial-gradient(circle at 50% 58%, rgba(76,231,151,.12), transparent 42%),
      linear-gradient(180deg, rgba(248,255,251,.95), rgba(239,250,244,.78));
    box-shadow:
      0 18px 42px rgba(15,111,70,.08),
      inset 0 1px 0 rgba(255,255,255,.95);
  }

  .premium-price-offer::before,
  .premium-price-offer::after {
    content: "✦";
    position: absolute;
    color: #38c982;
    font-size: 14px;
    text-shadow: 0 0 12px rgba(56,201,130,.65);
    animation: priceSparkle 2.8s ease-in-out infinite;
    pointer-events: none;
  }

  .premium-price-offer::before {
    left: 8%;
    top: 48%;
  }

  .premium-price-offer::after {
    right: 8%;
    top: 61%;
    animation-delay: 1.15s;
  }

  .premium-promo-ribbon {
    position: relative;
    z-index: 2;
    margin: 0 auto;
    padding: 9px 13px;
    border: 1px solid rgba(126,244,184,.36);
    border-radius: 999px;
    color: #f3fff8;
    background: linear-gradient(105deg, #0b6840, #1fba71 52%, #0b6840);
    background-size: 190% 100%;
    box-shadow: 0 10px 25px rgba(15,111,70,.20), 0 0 18px rgba(49,190,125,.12);
    font-weight: 900;
    text-align: center;
    animation: promoRibbonShine 5s ease-in-out infinite;
  }

  .premium-old-price {
    position: relative;
    z-index: 2;
    color: #b52323 !important;
    font-weight: 800;
    letter-spacing: .01em;
  }

  .premium-old-price span {
    color: #c82020 !important;
    font-size: 19px !important;
    font-weight: 900;
    text-decoration-line: line-through;
    text-decoration-color: #e21e1e;
    text-decoration-thickness: 3px;
    text-decoration-skip-ink: none;
  }

  .premium-installment {
    position: relative;
    z-index: 2;
    display: flex !important;
    align-items: baseline !important;
    justify-content: center !important;
    flex-wrap: wrap;
    line-height: .88;
  }

  .premium-installment-count,
  .premium-installment strong {
    margin: 0 !important;
    padding: 0 !important;
    color: transparent !important;
    background: linear-gradient(100deg, #0b7446 0%, #18b56d 28%, #68e7a7 49%, #1ac676 66%, #087342 100%);
    background-size: 230% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 6px 15px rgba(25,181,109,.18));
    animation: premiumPriceShine 4.2s ease-in-out infinite;
  }

  .premium-installment-count {
    font-weight: 900 !important;
    letter-spacing: -.04em;
  }

  .premium-installment strong {
    position: relative;
    font-weight: 950 !important;
    line-height: .86 !important;
    letter-spacing: -.065em !important;
  }

  .premium-cash-price {
    position: relative;
    z-index: 2;
    color: #47524b !important;
    font-weight: 700;
  }

  .premium-cash-price strong {
    color: #07100b !important;
    font-size: 20px !important;
    font-weight: 900 !important;
    letter-spacing: -.02em !important;
    text-shadow: none !important;
  }

  .price-complete .cta-primary {
    position: relative;
    overflow: hidden;
    min-height: 58px;
    background: linear-gradient(115deg, #159459, #22c276 52%, #0d7c4a) !important;
    background-size: 170% 100% !important;
    box-shadow: 0 16px 36px rgba(17,143,84,.30), 0 0 0 1px rgba(255,255,255,.14) inset !important;
    animation: premiumButtonGlow 4.8s ease-in-out infinite;
  }

  .price-complete .cta-primary::after {
    content: "";
    position: absolute;
    top: -35%;
    bottom: -35%;
    left: -38%;
    width: 26%;
    transform: skewX(-18deg);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent);
    animation: premiumButtonSweep 4.8s ease-in-out infinite;
    pointer-events: none;
  }

  .price-complete .access-note,
  .price-complete .security-line {
    color: #2d3932 !important;
  }

  @keyframes premiumTextShine {
    0%, 22% { background-position: 100% 50%; }
    55%, 100% { background-position: 0% 50%; }
  }

  @keyframes badgeShine {
    0%, 30% { background-position: 100% 50%; }
    65%, 100% { background-position: 0% 50%; }
  }

  @keyframes promoRibbonShine {
    0%, 25% { background-position: 100% 50%; }
    60%, 100% { background-position: 0% 50%; }
  }

  @keyframes premiumPriceShine {
    0%, 20% { background-position: 100% 50%; }
    55%, 100% { background-position: 0% 50%; }
  }

  @keyframes priceSparkle {
    0%, 100% { opacity: .24; transform: scale(.72) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.18) rotate(12deg); }
  }

  @keyframes premiumButtonGlow {
    0%, 100% { background-position: 0% 50%; box-shadow: 0 16px 36px rgba(17,143,84,.26), 0 0 0 1px rgba(255,255,255,.14) inset; }
    50% { background-position: 100% 50%; box-shadow: 0 18px 42px rgba(17,143,84,.36), 0 0 0 1px rgba(255,255,255,.18) inset; }
  }

  @keyframes premiumButtonSweep {
    0%, 55% { left: -38%; opacity: 0; }
    62% { opacity: 1; }
    82% { left: 115%; opacity: 0; }
    100% { left: 115%; opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    #pricing-title .premium-highlight,
    .price-complete .value-badge,
    .premium-promo-ribbon,
    .premium-installment-count,
    .premium-installment strong,
    .premium-price-offer::before,
    .premium-price-offer::after,
    .price-complete .cta-primary,
    .price-complete .cta-primary::after {
      animation: none !important;
    }
  }
`;
document.head.appendChild(siteEnhancementStyle);
