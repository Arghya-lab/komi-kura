import type { IMangaInfo } from "@consumet/extensions";
import type { MangaChapterType } from "../../@types/manga.js";

function ChaptersSection({ mangaInfo }: { mangaInfo: IMangaInfo }) {
  const chapters = mangaInfo.chapters as MangaChapterType[] | undefined;

  if (!chapters) return null;

  return (
    <>
      <link rel="stylesheet" href="/public/styles/chapters-section.css" />
      <link rel="stylesheet" href="/public/styles/pagination.css" />
      <section class="chapters">
        <h3 class="heading">chapters</h3>
        <div class="chapter-container"></div>
      </section>
    </>
  );
}

export default ChaptersSection;
