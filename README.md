# NaN website

The website of NaN, a systems language for the AI era: a landing page, a getting started guide and the language specification. It is published at https://nan-language.github.io.

## Installation

Requires Node 22 and pnpm 10. From the repository root:

```bash
pnpm install
```

## Usage

```bash
pnpm spec
pnpm dev
```

`pnpm spec` fetches the language specification from the [nan repository](https://github.com/nan-language/nan) into `.spec/`; run it again to update it. `pnpm dev` then serves the site locally with live reload. `pnpm build` fetches the specification and writes the static site to `dist/` and `pnpm preview` serves that build. Pushes to `main` are deployed to GitHub Pages.

## Commands

| Command        | Purpose                                                           |
| -------------- | ----------------------------------------------------------------- |
| `pnpm spec`    | Fetch the specification into `.spec/`                             |
| `pnpm dev`     | Serve the site locally with live reload                           |
| `pnpm build`   | Fetch the specification, type-check and build the site to `dist/` |
| `pnpm preview` | Serve the built site                                              |
| `pnpm format`  | Format all files                                                  |
| `pnpm lint`    | Lint                                                              |
| `pnpm test`    | Run all tests                                                     |
