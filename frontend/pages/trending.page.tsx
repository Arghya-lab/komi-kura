import fetchMangaList from "../../backend/services/fetchMangaList.js";
import LandingSection from "../ui/LandingSection.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import PosterGrid from "../ui/PosterGrid.js";

async function TrendingPage() {
  const trendingList = await fetchMangaList("trending");

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle="trending">
        <PosterGrid mangaList={trendingList} />
      </LandingSection>
    </Layout>
  );
}

export default TrendingPage;
