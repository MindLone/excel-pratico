window.SITE_CONFIG = Object.freeze({
  PRECO_BASICO: "10",
  LINK_BASICO: "",
  PRECO_COMPLETO: "37",
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

const mobileHeroStyle = document.createElement("style");
mobileHeroStyle.textContent = `
  @media (max-width: 939px) {
    .hero-logo {
      width: min(140px, 42vw) !important;
      height: 44px !important;
      margin-bottom: 14px !important;
    }
  }

  @media (min-width: 940px) {
    .hero-logo {
      width: 190px !important;
      height: 58px !important;
    }
  }
`;
document.head.appendChild(mobileHeroStyle);
