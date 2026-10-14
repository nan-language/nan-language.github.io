import { expect, test } from "vitest";
import { annotations, sample } from "../../../src/pages/home/content";

test("every annotation points at the line holding its keyword", () => {
  const lines = sample.split("\n");
  for (const { line, keyword } of annotations) {
    expect(lines[line - 1], `line ${line}`).toMatch(
      new RegExp(`\\b${keyword}\\b`),
    );
  }
});
