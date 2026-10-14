import { expect, test } from "vitest";
import { highlight } from "../../src/components/highlight";

test("keeps the line text intact", () => {
  const line = '    pub total: u64 where total <= MAX // "sum" 0x1F';
  expect(
    highlight(line)
      .map((token) => token.text)
      .join(""),
  ).toBe(line);
});

test("classifies keywords, types, literals and comments", () => {
  const kinds = highlight('pub fn f(x: u32) -> Option[Meter] = 1_000 // "c"')
    .filter((token) => token.kind !== "plain")
    .map((token) => [token.kind, token.text]);
  expect(kinds).toEqual([
    ["keyword", "pub"],
    ["keyword", "fn"],
    ["type", "u32"],
    ["type", "Option"],
    ["type", "Meter"],
    ["number", "1_000"],
    ["comment", '// "c"'],
  ]);
});

test("leaves constants and identifiers plain", () => {
  expect(
    highlight("samples <= MAX_SAMPLES").every(
      (token) => token.kind === "plain",
    ),
  ).toBe(true);
});
