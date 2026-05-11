# ccg-card-generator

[![npm version](https://badge.fury.io/js/ccg-card-generator.svg)](https://badge.fury.io/js/ccg-card-generator) [![GitHub version](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator.svg)](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator)

Quickly generate pages of trading cards. Useful for rapid prototyping.

---

## Usage

For working examples, see the [`examples/`](./examples) directory.

```js
const generatePdf = require("ccg-card-generator").default;

const cards = [
  { name: "Goblin", type: "Creature", value: 1, text: "**Haste**. A fast little thing." },
  { name: "Fireball", type: "Spell", value: 3, text: "Deal 3 damage to any target." },
];

const options = {
  debug: true,
  destination: "./cards.pdf",
  // Optional: override the default stylesheet
  // style: "./my-styles.css",
  // Optional: forward print options to html-pdf-chrome
  pdfOptions: {
    printOptions: { displayHeaderFooter: false },
  },
};

generatePdf(cards, options);
```

### Options

| Option           | Type     | Default                     | Description                                              |
| ---------------- | -------- | --------------------------- | -------------------------------------------------------- |
| `destination`    | string   | `"./output.pdf"`            | Output file path.                                        |
| `style`          | string   | bundled `prototype.css`     | Path to a CSS file applied to the cards.                 |
| `debug`          | boolean  | `false`                     | When true, also writes the rendered HTML to `debug.html`.|
| `pageDimensions` | object   | `{ width: 216, height: 282, padding: 5 }` (mm) | Overrides for the page layout. |
| `cardDimensions` | object   | `{ width: 59, height: 82, margin: 2, border: 1 }` (mm) | Overrides for individual card sizing. |
| `pdfOptions`     | object   | sensible defaults           | Forwarded to [`html-pdf-chrome`](https://github.com/westy92/html-pdf-chrome). |
| `htmlGenerator`  | function | built-in                    | Optional custom HTML generator for advanced layouts.     |

Each card is a plain object — keys become `card-section-<key>` CSS classes, and values are rendered as markdown.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome!
