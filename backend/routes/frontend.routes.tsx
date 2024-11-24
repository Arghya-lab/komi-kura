import { Hono } from "hono";
import HomePage from "../../frontend/pages/home.page.js";
import InfoPage from "../../frontend/pages/info.page.js";
import TrendingPage from "../../frontend/pages/trending.page.js";
import PopularPage from "../../frontend/pages/popular.page.js";
import TopPage from "../../frontend/pages/top.page.js";
import ReadPage from "../../frontend/pages/Read.page.js";

const frontendRoute = new Hono();

frontendRoute.get("/", (c) => {
  return c.redirect("/home");
});

frontendRoute.get("/home", (c) => {
  return c.render(<HomePage />);
});

frontendRoute.get("/trending", (c) => {
  return c.render(<TrendingPage />);
});

frontendRoute.get("/popular", (c) => {
  return c.render(<PopularPage />);
});

frontendRoute.get("/top", (c) => {
  return c.render(<TopPage />);
});

frontendRoute.get("/info/:mangaId", (c) => {
  return c.html(<InfoPage mangaId={c.req.param().mangaId} />);
});

frontendRoute.get("/read/:chapterId", (c) => {
  return c.html(<ReadPage chapterId={c.req.param().chapterId} />);
});

export default frontendRoute;
