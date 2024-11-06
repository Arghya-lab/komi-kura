import { prettyPrintJson } from "pretty-print-json";
import { getMangaInfo } from "../../backend/services/FetchManga.js";
import { Layout } from "../ui/Layout.js";

async function InfoPage({ mangaId }: { mangaId: string }) {
  // const mangaInfo = await getMangaInfo(mangaId);

  return (
    <Layout>
      <div>InfoPage</div>
      {mangaId}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/pretty-print-json@3.0/dist/css/pretty-print-json.css"
      />

      <section id="json-viewer"></section>
      <script type="module" src="/assets/scripts/info-page.js"></script>
    </Layout>
  );
}

export default InfoPage;
