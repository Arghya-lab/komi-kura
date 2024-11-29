import type { IMangaChapter } from "@consumet/extensions";

export default function getPrevNextChapter(
  chapters: IMangaChapter[],
  currentChapterId: string
):
  | {
      prevChapter?: IMangaChapter;
      currChapter?: IMangaChapter;
      nextChapter?: IMangaChapter;
    }
  | undefined {
  const currChapterIdx = chapters.findIndex((ch) => ch.id === currentChapterId);
  if (currChapterIdx === -1) return;

  return {
    prevChapter: chapters[currChapterIdx - 1] ?? undefined,
    currChapter: chapters[currChapterIdx] ?? undefined,
    nextChapter: chapters[currChapterIdx + 1] ?? undefined,
  };
}
