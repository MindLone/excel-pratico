/*
 * CONFIGURAÇÃO RÁPIDA
 * Cole os links definitivos entre as aspas abaixo quando estiverem prontos.
 */
const LINKS = {
  checkoutCompleto: "",
  checkoutUpgrade: "",
  checkoutBasico: "",
};

function atualizarDataDaOferta() {
  const elemento = document.querySelector("#promo-date");
  if (!elemento) return;

  const hoje = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  elemento.textContent = `🔥 CONDIÇÃO ESPECIAL DISPONÍVEL HOJE (${hoje}) 🔥`;
}

function configurarCheckouts() {
  const mapa = {
    completo: LINKS.checkoutCompleto,
    upgrade: LINKS.checkoutUpgrade,
    basico: LINKS.checkoutBasico,
  };

  document.querySelectorAll("[data-checkout]").forEach((botao) => {
    const tipo = botao.dataset.checkout;
    const url = mapa[tipo];

    if (url) {
      botao.href = url;
      return;
    }

    botao.addEventListener("click", (evento) => {
      evento.preventDefault();
      const mensagem = botao.parentElement?.querySelector("[data-checkout-message]");
      if (mensagem) mensagem.hidden = false;
    });
  });
}

function configurarFaq() {
  const perguntas = document.querySelectorAll(".faq details");
  perguntas.forEach((pergunta) => {
    pergunta.addEventListener("toggle", () => {
      if (!pergunta.open) return;
      perguntas.forEach((outra) => {
        if (outra !== pergunta) outra.open = false;
      });
    });
  });
}

function atualizarAno() {
  document.querySelectorAll("[data-current-year]").forEach((elemento) => {
    elemento.textContent = String(new Date().getFullYear());
  });
}

atualizarDataDaOferta();
configurarCheckouts();
configurarFaq();
atualizarAno();
