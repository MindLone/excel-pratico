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
const completePrice = document.querySelector(".price-row-complete strong");
if (completePrice) {
  completePrice.innerHTML = '<small>R$</small> 19,90';
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
    color: #118352;
  }

  .price-complete .plan-head h3 {
    color: #102d20;
    text-shadow: 0 1px 0 rgba(255,255,255,.9);
  }

  .price-complete .complete-visual img {
    filter: drop-shadow(0 23px 27px rgba(15,111,70,.18));
  }

  .price-row-complete {
    position: relative;
  }

  .price-row-complete::before {
    content: "";
    position: absolute;
    left: 18%;
    right: 18%;
    top: 7px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(49,190,125,.32), transparent);
  }

  .price-row-complete strong {
    color: #0d7d4b !important;
    text-shadow: 0 4px 18px rgba(49,190,125,.16);
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

  .price-complete .security-line {
    color: #496558;
  }

  @keyframes premiumTextShine {
    0%, 22% { background-position: 100% 50%; }
    55%, 100% { background-position: 0% 50%; }
  }

  @keyframes badgeShine {
    0%, 30% { background-position: 100% 50%; }
    65%, 100% { background-position: 0% 50%; }
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
    .price-complete .cta-primary,
    .price-complete .cta-primary::after {
      animation: none !important;
    }
  }
`;
document.head.appendChild(siteEnhancementStyle);
