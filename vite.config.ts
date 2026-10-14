import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";
import { pages } from "./src/links";
import { spec } from "./tools/spec/plugin";

export default defineConfig({
  plugins: [react(), spec()],
  build: {
    rollupOptions: {
      input: Object.values(pages).map((path) =>
        resolve(import.meta.dirname, `.${path}index.html`),
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
    passWithNoTests: true,
  },
});
