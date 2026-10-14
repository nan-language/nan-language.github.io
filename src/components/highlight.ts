export type TokenKind =
  "comment" | "keyword" | "type" | "number" | "text" | "plain";

export type Token = { kind: TokenKind; text: string };

const KEYWORDS = new Set([
  "and",
  "await",
  "closed",
  "const",
  "else",
  "enum",
  "example",
  "fail",
  "fails",
  "fn",
  "for",
  "if",
  "impl",
  "interface",
  "let",
  "linear",
  "match",
  "mut",
  "not",
  "or",
  "pkg",
  "pub",
  "requires",
  "ensures",
  "return",
  "struct",
  "take",
  "trusted",
  "try",
  "uses",
  "var",
  "where",
  "while",
]);

const TYPE = /^(?:[A-Z][a-z0-9]\w*|[A-Z]|[iuf]\d+|bool|char)$/;

const PATTERN =
  /(\/\/.*)|("(?:[^"\\]|\\.)*")|\b(0x[0-9A-Fa-f_]+|\d[\d_]*(?:\.\d+)?(?:[iu]\d+)?)\b|\b([A-Za-z_]\w*)\b/g;

export function highlight(line: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of line.matchAll(PATTERN)) {
    const [text, comment, quoted, number, word] = match;
    const kind: TokenKind = comment
      ? "comment"
      : quoted
        ? "text"
        : number
          ? "number"
          : KEYWORDS.has(word)
            ? "keyword"
            : TYPE.test(word)
              ? "type"
              : "plain";
    if (kind === "plain") continue;
    if (match.index > last) {
      tokens.push({ kind: "plain", text: line.slice(last, match.index) });
    }
    tokens.push({ kind, text });
    last = match.index + text.length;
  }
  if (last < line.length)
    tokens.push({ kind: "plain", text: line.slice(last) });
  return tokens;
}
