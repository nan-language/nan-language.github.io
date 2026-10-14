import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import { renderChapter } from "./markdown.ts";
import { specDir, specPath, specRepository } from "./source.ts";

const INDEX = "virtual:spec";
const RESOLVED = `\0${INDEX}`;

function chapterFiles(): string[] {
  if (!existsSync(specDir)) {
    throw new Error(`No specification in ${specDir}: run pnpm spec`);
  }
  return readdirSync(specDir)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function indexModule(): string {
  const commit = readFileSync(join(specDir, "commit"), "utf8").trim();
  const chapters = chapterFiles().map((file) => {
    const slug = file.slice(0, -".md".length);
    const heading = readFileSync(join(specDir, file), "utf8").split("\n")[0];
    const title = heading.replace(/^# /, "");
    return `{ slug: ${JSON.stringify(slug)}, title: ${JSON.stringify(title)}, load: () => import(${JSON.stringify(`${INDEX}/${slug}`)}) }`;
  });
  return [
    `export const commit = ${JSON.stringify(commit)};`,
    `export const source = ${JSON.stringify(`${specRepository}/blob/${commit}/${specPath}`)};`,
    `export const chapters = [\n${chapters.join(",\n")}\n];`,
  ].join("\n");
}

export function spec(): Plugin {
  return {
    name: "nan-spec",
    resolveId(id) {
      if (id === INDEX || id.startsWith(`${INDEX}/`)) return `\0${id}`;
    },
    load(id) {
      if (id === RESOLVED) return indexModule();
      if (!id.startsWith(`${RESOLVED}/`)) return;
      const file = resolve(specDir, `${id.slice(RESOLVED.length + 1)}.md`);
      this.addWatchFile(file);
      const html = renderChapter(readFileSync(file, "utf8"));
      return `export default ${JSON.stringify(html)};`;
    },
  };
}
