import axios from "axios";
import { load } from "cheerio";
import type {
  ILandingMangaCategory,
  IMiniMangaItem,
} from "../../@types/manga.js";
import { HTTPException } from "hono/http-exception";

export default async function fetchMangaList(type: ILandingMangaCategory) {
  // return [
  //   {
  //     id: "105778",
  //     title: "Chainsaw Man",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx105778-74YTFlQzcFPg.png",
  //   },
  //   {
  //     id: "132144",
  //     title: "Hwasangwihwan",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132144-i5B4VnG9sRgh.png",
  //   },
  //   {
  //     id: "118586",
  //     title: "Sousou no Frieren",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx118586-F0Lp86XQV7du.jpg",
  //   },
  //   {
  //     id: "106130",
  //     title: "Blue Lock",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx106130-AZn3dTaSXM4z.jpg",
  //   },
  //   {
  //     id: "119257",
  //     title: "Jeonjijeok Dokja Sijeom",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119257-KzlNZtgbRzxF.jpg",
  //   },
  //   {
  //     id: "136204",
  //     title: "Cheonmaneun Pyeongbeomhage Sal Su Eopda",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx136204-D4ON9gggIHeX.jpg",
  //   },
  //   {
  //     id: "132029",
  //     title: "Dandadan",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132029-jIm1KsPcIwIl.jpg",
  //   },
  //   {
  //     id: "97852",
  //     title: "Komi-san wa, Komyushou desu.",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx97852-IKHEoAxYXPCo.jpg",
  //   },
  //   {
  //     id: "159930",
  //     title: "Muhanui Mabeopsa",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx159930-pX4aWN9aqihH.jpg",
  //   },
  //   {
  //     id: "119521",
  //     title: "Bukgeom Jeongi",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119521-qYqxFvn0NnXo.png",
  //   },
  //   {
  //     id: "170400",
  //     title: "Byeoreul Pumeun Swordmaster",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b170400-tRtb2zCDUGot.jpg",
  //   },
  //   {
  //     id: "106434",
  //     title: "Hitomi-chan wa Hitomishiri",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106434-0XVrugvoaYNG.jpg",
  //   },
  //   {
  //     id: "106929",
  //     title: "Eleceed",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106929-flAUvHZDUz5v.jpg",
  //   },
  //   {
  //     id: "170724",
  //     title: "Wangui Himeuro Hoegwihanda",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b170724-ZRBQGuYBi3nU.png",
  //   },
  //   {
  //     id: "144946",
  //     title: "Gachiakuta",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx144946-hVT51dFKLtH9.jpg",
  //   },
  //   {
  //     id: "135325",
  //     title: "Natae Gongja, Nolyeog Cheonjae Doeda",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx135325-YAhEGWro8zFK.jpg",
  //   },
  //   {
  //     id: "98263",
  //     title: "Tongari Boushi no Atelier",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx98263-680UsgNS8BlD.jpg",
  //   },
  //   {
  //     id: "140475",
  //     title: "Kaoru Hana wa Rin to Saku",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140475-QEGtrmdvbpOv.jpg",
  //   },
  //   {
  //     id: "30013",
  //     title: "ONE PIECE",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-ulXvn0lzWvsz.jpg",
  //   },
  //   {
  //     id: "127783",
  //     title: "Mudanggihyeop",
  //     coverImage:
  //       "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx127783-w815MAkxXYr6.jpg",
  //   },
  // ];
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
  } catch (error) {
    throw new HTTPException(500, {
      message: `Error while fetching ${type} manga list:: ` + error,
    });
  }
}
