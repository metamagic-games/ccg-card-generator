# Example: mtg

Demonstrates passing a **custom `htmlGenerator`** to render cards in a Magic: The Gathering-style frame instead of the default markdown layout.

## Files

- `cards.config.js` – sample MTG-shaped card data (name, color, mana, type, text, flavor).
- `src/createCards.js` – wires up `generateCards` with `htmlGenerator: generateMtgCards`, A4 paper, and 63 × 88 mm cards.
- `src/generateMtgCards.js` – the custom HTML generator: builds the card frame, art, type line, text box, and footer.
- `src/styles/mtg.css` – the MTG-styled stylesheet.

## Run it

From this directory:

```sh
npm install
npm run build
```

Output: `cards.pdf` plus `debug.html` (since `debug: true`).

## How the custom renderer works

`generateCards` accepts an `htmlGenerator(dimensions, cardPages) => string` function. The default implementation iterates `Object.keys(card)` and renders each value as markdown into a `card-section-<key>` div. This example replaces that with a hand-written frame that pulls specific fields (`card.name`, etc.) out of each card object — useful when you want full control over markup rather than the generic key-per-section layout.
