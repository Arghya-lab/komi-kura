import type { IMangaChapter } from "@consumet/extensions";
import getPrevNextChapter from "./getPrevNextCurrChapter.js";

export default function getNextPrevChapterPageLink(
  chapters?: IMangaChapter[],
  currChapterId?: string,
  mangaId?: string
): {
  prevChapterPageLink?: string;
  nextChapterPageLink?: string;
} {
  if (!chapters || !currChapterId || !mangaId) return {};

  const { nextChapter, prevChapter } =
    getPrevNextChapter(chapters, currChapterId) || {};

  return {
    prevChapterPageLink: prevChapter
      ? `/read/${mangaId}/${prevChapter.id}`
      : undefined,
    nextChapterPageLink: nextChapter
      ? `/read/${mangaId}/${nextChapter.id}`
      : undefined,
  };
}
