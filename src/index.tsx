import { Hono } from "hono";
import { logger } from "hono/logger";
import { Top } from "./TestTsx.js";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.use(logger());

app.use(
  "/assets/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, "/public"),
  })
);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/jsx", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
