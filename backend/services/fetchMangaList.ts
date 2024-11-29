import axios from "axios";
import { load } from "cheerio";
import type {
  ILandingMangaCategory,
  IMiniMangaItem,
} from "../../@types/manga.js";

let savedFetchMangaList: {
  [key in ILandingMangaCategory]?: IMiniMangaItem[];
} & { savedAt: string } = {
  popular: [],
  trending: [],
  "top-100": [],
  savedAt: new Date(new Date().getTime() - 25 * 60 * 60 * 1000).toISOString(),
};

const isMoreThan24HoursOld = (savedDatetime: string) => {
  const savedDate = new Date(savedDatetime);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate.getTime() - savedDate.getTime();

  // Check if the difference is more than 24 hours (in milliseconds)
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000;
  return differenceInMilliseconds > twentyFourHoursInMilliseconds;
};

export default async function fetchMangaList(type: ILandingMangaCategory) {
  if (!isMoreThan24HoursOld(savedFetchMangaList.savedAt)) {
    return savedFetchMangaList[type];
  }

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

    // Update the saved data and timestamp
    savedFetchMangaList[type] = mangaList;
    savedFetchMangaList.savedAt = new Date().toISOString();

    return mangaList;
  } catch {
    return {
      error: `Error while fetching ${type} manga list`,
    };
  }
}
