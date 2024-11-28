import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve, join } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// Function to gather all .ts and .scss files in a directory and its subdirectories
function getEntryFiles(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory()
      ? getEntryFiles(fullPath)
      : entry.isFile() &&
        (entry.name.endsWith(".ts") || entry.name.endsWith(".scss"))
      ? [fullPath]
      : [];
  });
  return files.length ? files.map((file) => resolve(file)) : [];
}

const entryFiles = getEntryFiles("frontend/assets");

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "frontend/assets/static/**",
          dest: "static",
        },
      ],
    }),
  ],
  build: {
    outDir: "public",
    rollupOptions: {
      input: entryFiles,
      output: {
        entryFileNames: (chunk) =>
          chunk.name.endsWith(".css")
            ? "styles/[name].css"
            : "scripts/[name].js",
        assetFileNames: (asset) => {
          if (asset?.name?.endsWith(".css")) return "styles/[name][extname]";
          if (asset?.name?.endsWith(".js")) return "scripts/[name][extname]";
          return "public/[name][extname]";
        },
        manualChunks(id) {
          // Organize chunks
          if (id.includes("node_modules")) {
            if (id.includes("@tabler/icons-react")) {
              return "icons";
            }
            return "vendor";
          }
        },
      },
    },
    minify: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
