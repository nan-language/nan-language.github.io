import { Marked } from "marked";
import { highlight } from "../../src/components/highlight.ts";

const CHAPTER_LINK = /^(\d{2}-[a-z0-9-]+)\.md(#.*)?$/;

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
};

function escape(text: string): string {
  return text.replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

export function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
    .replace(/ /g, "-");
}

export function chapterHref(href: string): string {
  return href.replace(
    CHAPTER_LINK,
    (_, chapter: string, anchor = "") => `?chapter=${chapter}${anchor}`,
  );
}

function highlightNan(code: string): string {
  return code
    .split("\n")
    .map((line) =>
      highlight(line)
        .map(({ kind, text }) =>
          kind === "plain"
            ? escape(text)
            : `<span class="t-${kind}">${escape(text)}</span>`,
        )
        .join(""),
    )
    .join("\n");
}

export function renderChapter(markdown: string): string {
  const seen = new Map<string, number>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const slug = slugify(text);
        const count = seen.get(slug) ?? 0;
        seen.set(slug, count + 1);
        const id = count === 0 ? slug : `${slug}-${count}`;
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
      link({ href, tokens }) {
        return `<a href="${escape(chapterHref(href))}">${this.parser.parseInline(tokens)}</a>`;
      },
      code({ text, lang }) {
        const body = lang === "nan" ? highlightNan(text) : escape(text);
        return `<pre><code>${body}</code></pre>\n`;
      },
      html({ text }) {
        return escape(text);
      },
    },
  });
  return marked.parse(markdown, { async: false });
}
