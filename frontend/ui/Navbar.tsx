function Navbar() {
  return (
    <>
      <link rel="stylesheet" href="/assets/styles/navbar.css" />
      <header class="navbar">
        <a href="/" class="navbar-heading">
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
        <form class="search-form">
          <input
            type="text"
            placeholder="Search anything..."
            class="search-input"
            value=""
          />
          <button type="button" class="clear-button" aria-label="Clear search">
            <span class="clear-icon icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </span>
          </button>
          <button type="submit" class="search-button">
            <span class="search-icon icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="search-icon-svg"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </span>
          </button>
        </form>
      </header>

      <script type="module" src="/assets/scripts/navbar.js"></script>
    </>
  );
}

export default Navbar;
