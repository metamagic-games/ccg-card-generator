# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`ccg-card-generator` is a small npm library that turns an array of card objects into a printable PDF sheet of trading cards. It composes HTML/CSS pages from the data, then rasterises them to PDF via `html-pdf-chrome` (which drives a headless Chrome). Default cards render as one `card-section-<key>` div per property, with values parsed as markdown via `marked`.

Published as `ccg-card-generator` on npm. Public API is a single default-exported function: `generatePdf(cards, options) → Promise<{ destination, cardCount }>`.

## Commands

```sh
npm install         # install deps (required before tests/build run)
npm run build       # Babel-compile src/ → lib/ and copy stylesheets
npm test            # Jest, uses --passWithNoTests
npm run format      # prettier --write src/
```

`husky` runs `pretty-quick --staged` as a pre-commit hook. Tests under `examples/` are ignored by `jest.config.js`.

## Layout

```
src/
  index.js                          # re-exports generatePdf
  scripts/generate/
    pdf/index.js                    # public entry — validates input, merges defaults, calls html → html-pdf-chrome
    pdf/index.spec.js
    pdf/README.md                   # documents pdfOptions.printOptions
    html/index.js                   # computes cards-per-page, reads CSS, wraps with @page
    html/createHtmlPages.js         # default per-card / per-page renderer
    html/*.spec.js
  styles/prototype.css              # default stylesheet shipped in lib/
examples/
  basic/                            # default renderer
  mtg/                              # custom htmlGenerator (MTG-style frame)
  scrapyard/                        # large deck, A4 paper, custom dimensions
  google-sheets/                    # scaffold for sheet-driven decks (not yet wired)
  examples-to-migrate/              # legacy material, not maintained
```

Each example has its own `package.json` and `npm run build` (`babel-node ./src/createCards`) that produces `cards.pdf` + `debug.html` in the example directory.

## Architecture notes

- **`generatePdf`** is the only public export. It validates that `cards` is a non-empty array, deep-merges user `pageDimensions` / `cardDimensions` / `pdfOptions` with the defaults at the top of `pdf/index.js`, then delegates to `generateHTML`.
- **`generateHTML`** computes `cardsPerPage` from page/card dimensions, splits the card list into pages, reads the stylesheet from disk with `fs.readFileSync`, and emits an `<html>` document with a `@page { size: ...mm ...mm }` rule.
- **`createHtmlPages`** is the default `htmlGenerator`. Users can pass their own `htmlGenerator(dimensions, cardPages) → string` to fully control card markup (see `examples/mtg`).
- **Markdown:** the default renderer pipes each card field through `marked.parse(String(value))`, so values can contain markdown.
- **Units:** page and card dimensions are in **mm**. `pdfOptions.printOptions.paperWidth` / `paperHeight` are in **inches** (Chrome's convention) — examples convert via `/ 25.4`.

## Coding conventions

- ES modules in `src/`, transpiled by Babel (`@babel/preset-env`) to `lib/` for publishing.
- Tests live alongside implementation as `*.spec.js`, run by Jest. `__mocks__/file-mock.js` handles static asset imports.
- Prettier for formatting; no ESLint config in repo.
- TDD where applicable (see `pdf/index.spec.js` for the style: mock `html-pdf-chrome` and `fs`, then assert behaviour).

## Things to watch for

- **`npm test` fails with `jest: command not found`** until `npm install` has been run — `node_modules/` is not committed.
- **Don't break the public API surface** — the single default export and its options object are what published consumers depend on. Bumping `package.json` `version` is a publish action and shouldn't be done casually.
- **`examples/` is excluded from Jest** (`testPathIgnorePatterns` + `modulePathIgnorePatterns`); don't rely on running their tests from the repo root.
- **Stylesheet path defaults** assume the library is installed under `./node_modules/ccg-card-generator/...`. When developing in-repo, pass an explicit `style` path (the examples do).
- **`debug: true`** writes `debug.html` into the **current working directory**, not next to the output PDF. Useful for inspecting what's being sent to Chrome.

## Task management

Per the user's global instructions: track work in GitHub issues, reference them from PRs with `Fixes #X` / `Closes #X`, and prefer creating new issues over leaving `TODO` comments in code.
