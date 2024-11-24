import type { IMiniMangaItem } from "../../@types/manga.js";

function PosterGrid({ mangaList }: { mangaList: IMiniMangaItem[] }) {
  return (
    <>
      <link rel="stylesheet" href="/assets/styles/poster-grid.css" />
      <div class="grid-items">
        {mangaList.map((manga) => (
          <a href={`/info/${manga.id}`} class="media-card">
            <div class="cover">
              <div class="image-background" />
              <img src={manga.coverImage} class="image" />
            </div>
            <p class="title">{manga.title}</p>
          </a>
        ))}
      </div>
    </>
  );
}

export default PosterGrid;
