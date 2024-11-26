import { getMangaPages } from "../../backend/services/FetchManga.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";

async function ReadPage({ chapterId }: { chapterId: string }) {
  const pages = await getMangaPages(chapterId);

  return (
    <Layout>
      <link rel="stylesheet" href="/assets/styles/read-page.css" />
      <Navbar />
      <section id="page-container">
        <img />
      </section>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.pages = ${JSON.stringify(pages)};`,
        }}
      ></script>
      {/* <script
        src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
        async
      ></script> */}
      <script type="module" src="/assets/scripts/read-page.js"></script>
    </Layout>
  );
}

export default ReadPage;
