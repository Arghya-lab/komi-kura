import axios from "axios";
import { load } from "cheerio";
import type {
  ILandingMangaCategory,
  IMiniMangaItem,
} from "../../@types/manga.js";

export default async function fetchMangaList(type: ILandingMangaCategory) {
  try {
    const url = `https://anilist.co/search/manga/${type}`;
    const { data } = await axios.get(url);
    const $ = load(data);

    const mangaList: IMiniMangaItem[] = [];

    $(".results.cover > .media-card").each((index, element) => {
      const link = $(element).find("a.cover").attr("href") || "";
      const name = $(element).find("a.title").text().trim();
      const imgSrc = $(element).find("a.cover > img").attr("src");

      const match = link.match(/\/manga\/(\d+)\//);
      if (match && name && imgSrc) {
        mangaList.push({
          id: match[1],
          name,
          imgSrc,
        });
      }
    });

    return mangaList;
  } catch {
    return {
      error: `Error while fetching ${type} manga list`,
    };
  }
}
