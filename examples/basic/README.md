# Example: basic

Minimal example showing how to drive `ccg-card-generator` from a small JSON config and the default renderer.

## Files

- `cards.config.js` – the array of card objects.
- `src/createCards.js` – calls `generateCards(input.cards, options)`.
- `src/styles/basic.css` – the stylesheet applied to the rendered cards.

## Run it

From this directory:

```sh
npm install
npm run build
```

That executes `babel-node ./src/createCards`, which writes `cards.pdf` (and `debug.html`, since `debug: true`) into this directory.

## Customising

- Edit `cards.config.js` to change the cards.
- Edit `src/createCards.js` to change `destination`, `style`, or page/card dimensions.
- Swap `style` for your own CSS file to restyle.
