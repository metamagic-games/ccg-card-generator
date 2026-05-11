# Example: scrapyard

A larger deck (~1280 lines of card data) printed to A4 with custom page and card dimensions. Useful as a reference for tuning page layout and PDF print options.

## Files

- `cards.config.js` – the deck.
- `src/createCards.js` – calls `generateCards` with custom `pageDimensions` (A4, 8 mm padding), `cardDimensions` (63 × 88 mm), and a `pdfOptions.printOptions` block that zeroes out margins and sets `paperWidth` / `paperHeight` to match A4.
- `src/styles/scrapheap.css` – the stylesheet.

## Run it

From this directory:

```sh
npm install
npm run build
```

Output: `cards.pdf` plus `debug.html`.

## Notes

`createCards.js` has commented-out snippets for sorting/filtering the deck before generation – handy if you want to produce, e.g., only commons in alphabetical order.
