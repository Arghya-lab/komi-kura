import { Hono } from "hono";
import fetchMangaList from "../services/fetchMangaList.js";
import {
  getMangaInfo,
  getMangaPages,
  searchManga,
} from "../services/FetchManga.js";

const apiRoute = new Hono();

apiRoute.get("/trending", async (c) => {
  return c.json(await fetchMangaList("trending"));
});

apiRoute.get("/popular", async (c) => {
  return c.json(await fetchMangaList("popular"));
});

apiRoute.get("/top-100", async (c) => {
  return c.json(await fetchMangaList("top-100"));
});

apiRoute.get("/search/:query", async (c) => {
  return c.json(await searchManga(c.req.param().query));
});

apiRoute.get("/info/:mangaId", async (c) => {
  return c.json(await getMangaInfo(c.req.param().mangaId));
});

apiRoute.get("/pages/:chapterId", async (c) => {
  return c.json(await getMangaPages(c.req.param().chapterId));
});

export default apiRoute;
