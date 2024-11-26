import fetchMangaList from "../../backend/services/fetchMangaList.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import LandingSection from "../ui/LandingSection.js";
import PosterGrid from "../ui/PosterGrid.js";

async function HomePage() {
  const [trendingList, popularList, topList] = await Promise.all([
    fetchMangaList("trending"),
    fetchMangaList("popular"),
    fetchMangaList("top-100"),
  ]);

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle="trending" showViewAll>
        <PosterGrid mangaList={trendingList.slice(0, 8)} />
      </LandingSection>
      <LandingSection landingTitle="popular" showViewAll>
        <PosterGrid mangaList={popularList.slice(0, 8)} />
      </LandingSection>
      <LandingSection landingTitle="top" showViewAll>
        <PosterGrid mangaList={topList.slice(0, 8)} />
      </LandingSection>
    </Layout>
  );
}

export default HomePage;
