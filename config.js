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

const oldFooterLogo = document.querySelector(".footer-logo");
if (oldFooterLogo) {
  const footerLogoImage = document.createElement("img");
  footerLogoImage.className = "footer-logo-correcta";
  footerLogoImage.src = "/assets/logo-footer-transparente.svg";
  footerLogoImage.alt = "Planilhas Práticas";
  footerLogoImage.loading = "lazy";
  footerLogoImage.decoding = "async";
  footerLogoImage.width = 1469;
  footerLogoImage.height = 465;
  footerLogoImage.style.cssText = "display:block;width:min(250px,70vw);height:auto;margin-bottom:12px;image-rendering:auto;";
  oldFooterLogo.replaceWith(footerLogoImage);
}
