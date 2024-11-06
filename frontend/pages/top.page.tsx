import fetchMangaList from "../../backend/services/fetchMangaList.js";
import LandingSection from "../ui/LandingSection.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import PosterGrid from "../ui/PosterGrid.js";

async function TopPage() {
  const topList = await fetchMangaList("top-100");

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle="top">
        <PosterGrid mangaList={topList} />
      </LandingSection>
    </Layout>
  );
}

export default TopPage;
