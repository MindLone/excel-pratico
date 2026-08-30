# Planilhas Práticas

Landing page mobile-first para a oferta Planilhas Práticas. O projeto foi feito com HTML, CSS e JavaScript puros para carregar rápido e ser simples de editar.

## Estrutura

```text
.
├── index.html                         # Página principal
├── styles.css                        # Todo o visual do site
├── script.js                         # Data da oferta e links dos checkouts
├── assets/
│   ├── dashboards/                   # Imagens dos dashboards
│   ├── logo-fundo-claro.webp
│   ├── logo-fundo-escuro.webp
│   ├── plano-basico.webp
│   └── plano-completo.webp
├── upgrade-planilhas/index.html      # Oferta de upgrade por R$ 15
├── politica-de-privacidade/index.html
└── vercel.json                       # Configuração de publicação e cache
```

## Onde alterar os links de checkout

Abra `script.js` e cole os três links no começo do arquivo:

```js
const LINKS = {
  checkoutCompleto: "COLE_AQUI",
  checkoutUpgrade: "COLE_AQUI",
  checkoutBasico: "COLE_AQUI",
};
```

Enquanto os links estiverem vazios, os botões exibem uma mensagem de que o checkout será adicionado em breve.

## Onde adicionar os vídeos da Wistia

No `index.html`, procure por `WISTIA`. Existem três comentários bem visíveis:

- Vídeo principal: vertical, proporção 9:16;
- Depoimento 01: horizontal, proporção 16:9;
- Depoimento 02: horizontal, proporção 16:9.

Substitua o bloco `video-placeholder` correspondente pelo código de incorporação fornecido pela Wistia. Não use código configurado para abrir em outra página ou pop-up.

## Como adicionar as quatro planilhas restantes

1. Converta cada imagem para WebP e salve em `assets/dashboards/`;
2. Abra `index.html`;
3. Procure por `PLANILHAS 01–04`;
4. Troque cada card de “Imagem em breve” por um card igual aos dashboards anteriores.

## Testar no computador

Na pasta do projeto, execute:

```bash
python3 -m http.server 4173
```

Depois abra `http://localhost:4173`.

## Publicação

O site é estático e não possui etapa de compilação. Ao conectar este repositório ao Vercel, mantenha o diretório raiz como `./` e deixe o framework como “Other”.

## Pendências antes de anunciar

- Adicionar os três links de checkout;
- Incorporar os três vídeos da Wistia;
- Adicionar `PLANILHA_01` a `PLANILHA_04`;
- Configurar domínio e ferramenta de métricas/anúncios;
- Revisar a Política de Privacidade depois de escolher checkout, métricas e pixels definitivos.
