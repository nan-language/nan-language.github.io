import { expect, test } from "vitest";
import { renderChapter } from "../../../tools/spec/markdown";

test("links to chapters lead to the chapter page", () => {
  const html = renderChapter("[Lines](01-lexical.md#lines), [terms](#terms)");
  expect(html).toContain('href="?chapter=01-lexical#lines"');
  expect(html).toContain('href="#terms"');
});

test("headings get the ids chapter links use", () => {
  const html = renderChapter(
    "## Output contract\n\n## `nan check` and `nan fmt`\n\n## Output contract",
  );
  expect(html).toContain('id="output-contract"');
  expect(html).toContain('id="nan-check-and-nan-fmt"');
  expect(html).toContain('id="output-contract-1"');
});

test("highlights NaN code and escapes raw HTML", () => {
  const html = renderChapter("```nan\npub fn f()\n```\n\nA <b>tag</b>.");
  expect(html).toContain('<span class="t-keyword">pub</span>');
  expect(html).toContain("&lt;b&gt;tag&lt;/b&gt;");
});
