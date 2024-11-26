import type { IMiniMangaItem } from "../../@types/manga.js";

function MangaPoster({
  id,
  imgSrc,
  name,
  chapterCount,
  rating,
}: IMiniMangaItem) {
  return (
    <a class="poster-container" href={`/info/${id}`}>
      <div class="cover">
        <div class="image-background" />
        <img src={imgSrc} class="image" />
        <div class="info-chip-container">
          {chapterCount && (
            <div class="info-chip chapter-count-chip">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-table-of-contents"
                >
                  <path d="M16 12H3" />
                  <path d="M16 18H3" />
                  <path d="M16 6H3" />
                  <path d="M21 12h.01" />
                  <path d="M21 18h.01" />
                  <path d="M21 6h.01" />
                </svg>
              </span>
              <span>{chapterCount}</span>
            </div>
          )}
          {rating && (
            <div class="info-chip rating-chip">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
              </span>
              <span>{rating}</span>
            </div>
          )}
        </div>
      </div>
      <div class="content">
        <p class="name">{name}</p>
      </div>
    </a>
  );
}

export default MangaPoster;
