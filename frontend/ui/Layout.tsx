import { html } from "hono/html";
import type { JSX } from "hono/jsx/jsx-runtime";

export default function Layout({ children }: { children: any }) {
  return html`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" href="/public/static/favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="/public/static/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            href="/public/static/favicon-96x96.png"
            sizes="96x96"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/public/static/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="komi kura" />
          <link rel="manifest" href="/public/static/manifest.json" />
          <meta name="theme-color" content="#000000" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" CrossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" href="/public/styles/global.css" />
          <title>Komi Kura</title>
        </head>
        <body>
          ${children}
          <script type="module" src="/public/scripts/main.js"></script>
        </body>
      </html>`;
}
