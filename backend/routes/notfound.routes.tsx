import { Hono } from "hono";
import NotFoundPage from "../../frontend/pages/NotFoundPage.js";

const frontendRoute = new Hono();

frontendRoute.get("/*", (c) => {
  return c.render(<NotFoundPage />);
});

export default frontendRoute;
