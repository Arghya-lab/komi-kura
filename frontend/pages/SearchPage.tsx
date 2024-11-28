import type { IMiniMangaItem } from "../../@types/manga.js";
import { searchManga } from "../../backend/services/FetchManga.js";
import isErrorInFetching from "../../lib/isErrorInFetching.js";
import LandingSection from "../ui/LandingSection.js";
import Layout from "../ui/Layout.js";
import Navbar from "../ui/Navbar.js";
import Pagination from "../ui/Pagination.js";
import PosterGrid from "../ui/PosterGrid.js";
import ErrorPage from "./ErrorPage.js";
import NotFoundPage from "./NotFoundPage.js";

async function SearchPage({
  searchQuery,
  pageNo,
}: {
  searchQuery: string;
  pageNo: string | number;
}) {
  pageNo = Number(pageNo);

  let searchMangaRes: IMiniMangaItem[] = [];
  const response = await searchManga(searchQuery, pageNo);

  if (isErrorInFetching(response)) {
    return <ErrorPage message={response.error} />;
  }

  searchMangaRes = response.results.map((manga) => ({
    id: manga.id,
    name: manga.title,
    imgSrc: manga.image,
    chapterCount: manga.totalChapters as number | undefined,
    rating: manga.rating as number | undefined,
  }));

  if (searchMangaRes.length === 0) return <NotFoundPage />;

  return (
    <Layout>
      <Navbar />
      <LandingSection landingTitle={`search result for ${searchQuery}`}>
        <PosterGrid mangaList={searchMangaRes} />
        <Pagination
          currentPage={pageNo}
          totalPage={response.totalPages}
          isNextPagePresent={response.hasNextPage}
          generatePageHref={(pageNo) => `/search/${searchQuery}?page=${pageNo}`}
        />
      </LandingSection>
      <script type="module" src="/public/scripts/pagination.js"></script>
    </Layout>
  );
}

export default SearchPage;
