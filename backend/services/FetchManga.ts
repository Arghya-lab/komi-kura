import { META, PROVIDERS_LIST } from "@consumet/extensions";
import { HTTPException } from "hono/http-exception";

export const searchManga = async (
  query: string,
  page: number = 1,
  perPage: number = 20
) => {
  const anilist = new META.Anilist.Manga();
  try {
    return await anilist.search(query, page, perPage);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error occur while searching for results:: " + error,
    });
  }
};

export const getMangaInfo = async (mangaId: string, provider?: string) => {
  let anilist = new META.Anilist.Manga();
  if (typeof provider !== "undefined") {
    const possibleProvider = PROVIDERS_LIST.MANGA.find(
      (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
    );
    anilist = new META.Anilist.Manga(possibleProvider);
  }

  try {
    return await anilist.fetchMangaInfo(mangaId);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error occur while getting manga info:: " + error,
    });
  }
};

export const getMangaPages = async (
  chapterId: string,
  provider?:
    | "MangaDex"
    | "ComicK"
    | "MangaHere"
    | "MangaKakalot"
    | "Mangasee123"
    | "Mangapark"
    | "MangaPill"
    | "MangaReader"
    | "FlameScans"
    | "MangaHost"
    | "BRMangas"
) => {
  let anilist = new META.Anilist.Manga();
  if (typeof provider !== "undefined") {
    const possibleProvider = PROVIDERS_LIST.MANGA.find(
      (p) => p.name.toLowerCase() === provider.toLocaleLowerCase()
    );
    anilist = new META.Anilist.Manga(possibleProvider);
  }

  try {
    return await anilist.fetchChapterPages(chapterId);
  } catch (error) {
    throw new HTTPException(500, {
      message: "Error occur while getting manga pages:: " + error,
    });
  }
};
