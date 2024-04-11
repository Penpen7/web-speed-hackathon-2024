import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { ClientApp } from '@wsh-2024/app/src/index';

const app = new Hono();

async function createHTML({ body, styleTags }: { body: string; styleTags: string }): Promise<string> {
  const htmlContent = `
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <link href="/assets/favicon.ico" rel="icon" />
    <title>WSH 2024</title>
    <link as="image" crossorigin="anonymous" href="/assets/cyber-toon.svg" rel="preload" />
    <link as="image" crossorigin="anonymous" href="/assets/hero-image.webp" rel="preload" />
    <script id="inject-data" type="application/json"></script>
    <script type="text/javascript" src="/client.global.js" defer></script>
    <style id="tag"></style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
  `;

  const content = htmlContent
    .replaceAll('<div id="root"></div>', `<div id="root">${body}</div>`)
    .replaceAll('<style id="tag"></style>', styleTags);

  return content;
}

app.get('*', async (c) => {
  const sheet = new ServerStyleSheet();

  try {
    const body = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <StaticRouter location={c.req.path}>
          <ClientApp />
        </StaticRouter>,
      ),
    );

    const styleTags = sheet.getStyleTags();
    const html = await createHTML({ body, styleTags });

    return c.html(html);
  } catch (cause) {
    throw new HTTPException(500, { cause, message: 'SSR error.' });
  } finally {
    sheet.seal();
  }
});

export { app as ssrApp };
