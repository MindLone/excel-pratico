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
  const footerLogo = document.createElement("div");
  footerLogo.className = "footer-logo-correcta";
  footerLogo.setAttribute("role", "img");
  footerLogo.setAttribute("aria-label", "Planilhas Práticas");
  footerLogo.style.cssText = "width:min(250px,70vw);aspect-ratio:2.5/1;overflow:hidden;margin-bottom:12px;";

  const footerLogoImage = document.createElement("img");
  footerLogoImage.src = "/assets/logotipo-correta.png";
  footerLogoImage.alt = "";
  footerLogoImage.loading = "lazy";
  footerLogoImage.decoding = "async";
  footerLogoImage.style.cssText = "display:block;width:100%;height:100%;object-fit:cover;object-position:center;";

  footerLogo.appendChild(footerLogoImage);
  oldFooterLogo.replaceWith(footerLogo);
}
