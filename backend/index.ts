import { Hono } from "hono";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { rateLimiter } from "hono-rate-limiter";
import apiRoute from "./routes/api.routes.js";
import frontendRoute from "./routes/frontend.routes.js";

const app = new Hono();

//  Middleware  //
app.use(logger());
app.use(
  rateLimiter({
    windowMs: 60 * 1000 * 1, // 1 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Method to generate custom identifiers for clients.
    // store: ... , // Redis, MemoryStore, etc. See below.
  })
);

app.use(
  "/assets/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, "/public"),
  })
);

//  Routes  //
app.route("/", frontendRoute);
app.route("/api", apiRoute);

//  Serve  //
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
