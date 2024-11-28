import { html } from "hono/html";

function ErrorPage({ message }: { message: string }) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          href="/public/static/favicon.ico"
          type="image/x-icon"
        />
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

        <link rel="stylesheet" href="/public/styles/global.css" />
        <link rel="stylesheet" href="/public/styles/error-page.css" />
        <title>Komi Kura</title>
      </head>
      <body>
        <div class="error-container">
          <div class="logo-container">
            <a href="/home" class="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 92 42"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                cached="false"
              >
                <text
                  dx="0"
                  dy="0"
                  font-size="3.35"
                  font-weight="700"
                  transform="matrix(5 0 0 5 7.3 26.922155)"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="0"
                >
                  <tspan y="0" font-weight="700" stroke-width="0">
                    Komi Kura
                  </tspan>
                </text>
              </svg>
            </a>
          </div>
          <p>${message}</p>
          <a href="/home">Go to home page</a>
        </div>
      </body>
    </html>`;
}

export default ErrorPage;
