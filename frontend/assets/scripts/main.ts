import type { IMangaInfo } from "@consumet/extensions";
import type { MangaChapterType } from "../../../@types/manga.js";

export interface MangaChapterPageType {
  page: number;
  img: string;
}

export interface MangaInfo {
  mangaId: string;
  overview: string;
  characters: string;
  recommendations: string;
  chapters: string;
  mangaChaptersData?: MangaChapterType[];
}

declare global {
  interface Window {
    pages?: MangaChapterPageType[];
    mangaInfo?: MangaInfo;
    mangaInfoJson?: IMangaInfo;
    chapterId?: string;
    mangaId?: string;
    paginate?: (pageNo: number) => unknown;
  }
}
