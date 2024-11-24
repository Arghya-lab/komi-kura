import { getMangaPages } from "../../backend/services/FetchManga.js";
// import { pages } from "../../pages.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";

async function ReadPage({ chapterId }: { chapterId: string }) {
  const pages = await getMangaPages(chapterId);

  return (
    <Layout>
      <link rel="stylesheet" href="/assets/styles/read-page.css" />
      <Navbar />
      <section class="page-container"></section>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.pages = ${JSON.stringify(pages)};`,
        }}
      ></script>
      <script type="module" src="/assets/scripts/read-page.js"></script>
    </Layout>
  );
}

export default ReadPage;
