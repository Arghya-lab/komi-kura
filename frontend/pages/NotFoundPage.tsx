import Layout from "../ui/Layout.js";

function NotFoundPage() {
  return (
    <Layout>
      <link rel="stylesheet" href="/public/styles/not-found-page.css" />
      <div class="not-found-container">
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
        <div class="contents">
          <p class="heading">Looking for something?</p>
          <p class="info">
            We're sorry. The Web address you entered is not a functioning page
            on our site.
          </p>
          <div class="link-container">
            <span class="triangle-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-triangle"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z" />
              </svg>
            </span>
            <span class="home-link">
              Go to Komi Kura's <a href="/home">Home</a> Page
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;
