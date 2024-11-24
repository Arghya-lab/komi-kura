import { getMangaInfo } from "../../backend/services/FetchManga.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import OverviewSection from "../ui/OverviewSection.js";
// import { mangaInfoDemo } from "../../mangaInfoDemo.js";
import convertDescriptionToString from "../../lib/convertDescriptionToString.js";
import convertTitleToString from "../../lib/convertTitleToString.js";
import classNames from "classnames";
import CharactersSection from "../ui/CharactersSection.js";
import RecommendationsSection from "../ui/RecommendationsSection.js";
import ChaptersSection from "../ui/ChaptersSection.js";

async function InfoPage({ mangaId }: { mangaId: string }) {
  const mangaInfo = await getMangaInfo(mangaId);
  // const mangaInfo = mangaInfoDemo;

  const window = new JSDOM("").window;
  const DOMPurify = createDOMPurify(window);
  const safeHtml = DOMPurify.sanitize(
    convertDescriptionToString(mangaInfo.description)
  );

  const overviewString = (<OverviewSection mangaInfo={mangaInfo} />).toString();
  const charactersString = (
    <CharactersSection mangaInfo={mangaInfo} />
  ).toString();
  const recommendationsString = (
    <RecommendationsSection mangaInfo={mangaInfo} />
  ).toString();
  const chaptersString = (<ChaptersSection mangaInfo={mangaInfo} />).toString();

  return (
    <Layout>
      <link rel="stylesheet" href="/assets/styles/info-page.css" />
      <Navbar />
      <div class="header-wrap">
        {mangaInfo.cover && (
          <div
            class="banner"
            style={`background-image: url(${mangaInfo.cover});`}
          >
            <div class="shadow" />
          </div>
        )}
        <div class={classNames("header", { "no-banner": !mangaInfo.cover })}>
          <div
            class={classNames("cover-wrap", { "no-banner": !mangaInfo.cover })}
          >
            <div class="cover">
              <div class="image-background" />
              <img src={mangaInfo.image} class="image" />
            </div>
            <div class="actions">
              <button class="add">Add to List</button>
              <button class="favourite">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="svg-inline--fa fa-heart fa-w-16"
                >
                  <path
                    fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                    class=""
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="content-container">
            <div class="content">
              <h1 class="heading">{convertTitleToString(mangaInfo.title)}</h1>
              <article
                class="description"
                dangerouslySetInnerHTML={{
                  __html: safeHtml,
                }}
              ></article>
            </div>
            <div class="nav">
              <button class="nav-btn" data-btn-type="overview">
                overview
              </button>
              <button class="nav-btn" data-btn-type="characters">
                characters
              </button>
              <button class="nav-btn" data-btn-type="recommendations">
                recommendations
              </button>
              <button class="nav-btn" data-btn-type="chapters">
                chapters
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="info-container">
        {/* <OverviewSection mangaInfo={mangaInfo} /> */}
        {/* <CharactersSection mangaInfo={mangaInfo} /> */}
        {/* <RecommendationsSection mangaInfo={mangaInfo} /> */}
        {/* <ChaptersSection mangaInfo={mangaInfo} /> */}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.mangaInfo = ${JSON.stringify({
            overview: overviewString,
            characters: charactersString,
            recommendations: recommendationsString,
            chapters: chaptersString,
            mangaChaptersData: mangaInfo.chapters,
          })};`,
        }}
      ></script>
      <script type="module" src="/assets/scripts/info-page.js"></script>
    </Layout>
  );
}

export default InfoPage;
