import { Html, Head, Main, NextScript } from 'next/document';

const head = {
  title: 'sample template',
  description: 'sample template description',
  url: 'https://sample.io',
};
const CustomDocument = () => (
  <Html lang="ja">
    <Head>
      <meta name="description" content={head.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={head.title} />
      <meta property="og:url" content={head.url} />
      <meta property="og:description" content={head.description} />
      <meta property="og:site_name" content={head.title} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
export default CustomDocument;
