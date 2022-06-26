import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Relatórios ad-hoc baseados em um banco de dados populados com dados da api do github" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
