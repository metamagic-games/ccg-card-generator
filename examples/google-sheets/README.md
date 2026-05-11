# Example: google-sheets

Starting point for sourcing cards from a Google Sheet rather than a hand-edited JS file.

> **Note:** at the moment `cards.config.js` is the same static export as the [basic example](../basic/README.md) — the Google Sheets fetch logic is not yet wired up. Treat this directory as scaffolding to drop a sheet-fetcher into.

## Files

- `cards.config.js` – currently a static `module.exports = { cards: [...] }`. Replace with code that reads from your sheet and exports the same shape.
- `src/createCards.js` – calls `generateCards(input.cards, options)` with the default renderer.
- `src/styles/basic.css` – the stylesheet.

## Run it

From this directory:

```sh
npm install
npm run build
```

Output: `cards.pdf` plus `debug.html`.

## Wiring up a sheet

`cards.config.js` only needs to export `{ cards: Array<object> }`, so any code path that produces such an array works — e.g., fetch a CSV export of your sheet at build time and parse it into card objects before `module.exports`.
