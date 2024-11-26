import type { IMiniMangaItem } from "../../@types/manga.js";
import convertTitleToString from "../../lib/convertTitleToString.js";
import MangaPoster from "./MangaPoster.js";

function PosterGrid({ mangaList }: { mangaList: IMiniMangaItem[] }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/styles/poster-grid.css" />
      <link rel="stylesheet" href="/assets/styles/manga-poster.css" />
      <div class="grid-items">
        {mangaList.map((manga) => (
          <MangaPoster
            id={manga.id}
            name={convertTitleToString(manga.name)}
            imgSrc={manga.imgSrc || ""}
          />
        ))}
      </div>
    </>
  );
}

export default PosterGrid;
