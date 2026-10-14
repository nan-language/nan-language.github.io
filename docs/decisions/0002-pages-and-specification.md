# 0002. Pages and specification

Status: accepted

## Context

The site grows from one landing page to several pages, among them the language specification. The specification is 42 Markdown chapters in `docs/spec` of `nan-language/nan`, and it changes with the language. GitHub Pages serves static files only.

## Decision

- Each page has its own HTML entry, built by Vite as a multi-page app. Pages link to each other by plain URLs, without a client-side router.
- `pnpm spec` fetches `docs/spec` from the main branch of `nan-language/nan` by a shallow, sparse git clone into `.spec/`, which is not committed. `pnpm build` runs it first.
- A Vite plugin renders each chapter from Markdown to HTML at build time with marked, as its own lazily loaded module. The spec page picks the chapter from its `chapter` query parameter.
- TypeScript is checked as two projects: the site, for the browser, and the build tools, for Node.

## Consequences

- The site holds no copy of the specification; each deploy shows the specification as of that deploy, and a change to it appears on the next one.
- Building needs network access to GitHub.
- Chapter links are rewritten from file paths to chapter URLs, and heading ids follow GitHub's rule, so the specification's own anchors keep working.
