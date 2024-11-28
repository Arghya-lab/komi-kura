import { getMangaPages } from "../../backend/services/FetchManga.js";
import isErrorInFetching from "../../lib/isErrorInFetching.js";
import Layout from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import ErrorPage from "./ErrorPage.js";

async function ReadPage({
  chapterId,
  mangaId,
}: {
  mangaId: string;
  chapterId: string;
}) {
  const pages = await getMangaPages(chapterId);

  if (isErrorInFetching(pages)) return <ErrorPage message={pages.error} />;

  return (
    <Layout>
      <link rel="stylesheet" href="/public/styles/read-page.css" />
      <Navbar />
      <div class="main-container">
        <section id="page-container"></section>
        <div class="menu-overlay">
          <div class="bottom-bar">
            <div class="title-bar"></div>
            <div class="action-wrapper">
              <div class="select-wrapper">
                <select name="chapter-select" class="chapter-select"></select>
              </div>
              <div class="page-setting-wrapper">
                <button class="page-view-setting setting-option"></button>
                {/* <button class="two-pages-container setting-option">
                  <span class="two-page-logo-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32.6"
                      height="56"
                      viewBox="0 0 12 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-rectangle-vertical"
                    >
                      <rect width="12" height="20" x="0" y="2" rx="2"></rect>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32.6"
                      height="56"
                      viewBox="0 0 14 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-rectangle-vertical"
                    >
                      <rect width="12" height="20" x="0" y="2" rx="2"></rect>
                    </svg>
                  </span>

                  <span class="text-info">2 pages</span>
                </button> */}
                <button class="fullscreen-button setting-option"></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.pages = ${JSON.stringify(pages)};
          window.chapterId = ${JSON.stringify(chapterId)};
          window.mangaId = ${JSON.stringify(mangaId)};`,
        }}
      ></script>
      <script type="module" src="/public/scripts/read-page2.js"></script>
    </Layout>
  );
}

export default ReadPage;
