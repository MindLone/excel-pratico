# Planilhas Práticas

Landing page de vendas estática, mobile-first, feita em HTML, CSS e JavaScript puros para manter carregamento rápido e edição simples.

## Estrutura

```text
.
├── index.html                         # Landing page principal
├── config.js                          # Preços, checkouts, e-mail e IDs da Wistia
├── styles.css                         # Sistema visual e responsividade
├── script.js                         # Interações, Wistia, FAQ e data da oferta
├── assets/
│   ├── dashboards/                   # 12 dashboards reais
│   ├── planilhas/                    # 4 planilhas reais
│   ├── logo-fundo-claro.webp
│   ├── logo-fundo-escuro.webp
│   ├── plano-basico.webp
│   └── plano-completo.webp
├── upgrade-planilhas/index.html      # Oferta auxiliar de upgrade
├── politica-de-privacidade/index.html
└── vercel.json
```

## Configuração rápida

As informações variáveis ficam em `config.js`:

```js
window.SITE_CONFIG = Object.freeze({
  PRECO_BASICO: "10",
  LINK_BASICO: "",
  PRECO_COMPLETO: "19,90",
  LINK_COMPLETO: "",
  LINK_UPGRADE: "",
  EMAIL_SUPORTE: "academiadigital10@gmail.com",
  WISTIA_HERO: "",
  WISTIA_DEPOIMENTO_1: "",
  WISTIA_DEPOIMENTO_2: ""
});
```

Use URLs HTTPS reais nos três campos `LINK_*`. Enquanto um checkout não estiver configurado, o respectivo botão não é exibido publicamente; o site não mostra link falso nem mensagem de placeholder.

Para os vídeos, informe somente o **Media ID** da Wistia. O vídeo principal é incorporado em 9:16 e os dois depoimentos em 16:9. Se os IDs estiverem vazios, essas áreas permanecem ocultas.

## Rotas

- `/` — landing page principal
- `/upgrade-planilhas/` — upgrade do Plano Básico
- `/politica-de-privacidade/` — Política de Privacidade
- `/upgarade-planilhas/` — redireciona permanentemente para a rota correta, preservando links antigos

## Teste local

```bash
python3 -m http.server 4173
```

Abra `http://localhost:4173`.

## Vercel

O projeto não possui etapa de build. Na Vercel, use o diretório raiz `./` e framework `Other`. O projeto já contém cache longo para imagens e headers básicos em `vercel.json`.

## Antes de iniciar tráfego pago

1. Preencher os três links reais de checkout em `config.js`.
2. Preencher os IDs reais da Wistia quando os vídeos estiverem disponíveis.
3. Validar pixels/métricas e a política de privacidade conforme os serviços efetivamente utilizados.
4. Fazer uma compra de teste em cada fluxo antes de anunciar.