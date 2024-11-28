import { Hono } from "hono";
import HomePage from "../../frontend/pages/home.page.js";
import InfoPage from "../../frontend/pages/info.page.js";
import TrendingPage from "../../frontend/pages/trending.page.js";
import PopularPage from "../../frontend/pages/popular.page.js";
import TopPage from "../../frontend/pages/top.page.js";
import ReadPage from "../../frontend/pages/Read.page.js";
import SearchPage from "../../frontend/pages/SearchPage.js";
import NotFoundPage from "../../frontend/pages/NotFoundPage.js";

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

frontendRoute.get("/search/:searchQuery", (c) => {
  return c.render(
    <SearchPage
      searchQuery={c.req.param().searchQuery}
      pageNo={c.req.query("page") || 1}
    />
  );
});

frontendRoute.get("/info/:mangaId", (c) => {
  return c.render(<InfoPage mangaId={c.req.param().mangaId} />);
});

frontendRoute.get("/read/:mangaId/:chapterId", (c) => {
  return c.render(
    <ReadPage
      mangaId={c.req.param().mangaId}
      chapterId={c.req.param().chapterId}
    />
  );
});

export default frontendRoute;
