import fetchMangaList from "../../backend/services/fetchMangaList.js";
import isErrorInFetching from "../../lib/isErrorInFetching.js";
import LandingSection from "../ui/LandingSection.js";
import Layout from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import PosterGrid from "../ui/PosterGrid.js";
import ErrorPage from "./ErrorPage.js";

async function PopularPage() {
  const popularList = await fetchMangaList("popular");

  if (isErrorInFetching(popularList))
    return <ErrorPage message={popularList.error} />;

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle="popular">
        <PosterGrid mangaList={popularList} />
      </LandingSection>
    </Layout>
  );
}

export default PopularPage;
