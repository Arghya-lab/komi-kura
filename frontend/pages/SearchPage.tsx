import type { IMiniMangaItem } from "../../@types/manga.js";
import { searchManga } from "../../backend/services/FetchManga.js";
import LandingSection from "../ui/LandingSection.js";
import { Layout } from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import PosterGrid from "../ui/PosterGrid.js";

async function SearchPage({ searchQuery }: { searchQuery: string }) {
  let searchMangaRes: IMiniMangaItem[] = [];
  const response = await searchManga(searchQuery);

  searchMangaRes = [
    ...searchMangaRes,
    ...response.results.map((manga) => ({
      id: manga.id,
      name: manga.title,
      imgSrc: manga.image,
      chapterCount: manga.totalChapters as number | undefined,
      rating: manga.rating as number | undefined,
    })),
  ];

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle={`search result for ${searchQuery}`}>
        <PosterGrid mangaList={searchMangaRes} />
      </LandingSection>
    </Layout>
  );
}

export default SearchPage;
