# PDF print options

`pdfOptions` is forwarded as-is to [`html-pdf-chrome`](https://github.com/westy92/html-pdf-chrome), which in turn drives Chrome's `Page.printToPDF`. The fields documented below live under `pdfOptions.printOptions`:

```js
generateCards(cards, {
  pdfOptions: {
    printOptions: { /* options below */ },
  },
});
```

## Options

| Option                     | Type      | Default      | Description                                                                                       |
| -------------------------- | --------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `landscape`                | `boolean` | `false`      | Paper orientation.                                                                                |
| `displayHeaderFooter`      | `boolean` | `false`      | Whether to render a header and footer band on each page.                                          |
| `printBackground`          | `boolean` | `false`      | Print CSS background graphics.                                                                    |
| `scale`                    | `number`  | `1`          | Scale factor applied to the webpage rendering.                                                    |
| `paperWidth`               | `number`  | `8.5`        | Paper width, **in inches**.                                                                       |
| `paperHeight`              | `number`  | `11`         | Paper height, **in inches**.                                                                      |
| `marginTop`                | `number`  | ~`0.4`       | Top margin in inches (default ≈ 1 cm).                                                            |
| `marginBottom`             | `number`  | ~`0.4`       | Bottom margin in inches (default ≈ 1 cm).                                                         |
| `marginLeft`               | `number`  | ~`0.4`       | Left margin in inches (default ≈ 1 cm).                                                           |
| `marginRight`              | `number`  | ~`0.4`       | Right margin in inches (default ≈ 1 cm).                                                          |
| `pageRanges`               | `string`  | `""`         | Page ranges to print, e.g. `"1-5, 8, 11-13"`. Empty means all pages.                              |
| `ignoreInvalidPageRanges`  | `boolean` | `false`      | Silently skip parseable-but-invalid ranges (e.g. `"3-2"`).                                        |
| `headerTemplate`           | `string`  | —            | HTML template for the print header. See below.                                                    |
| `footerTemplate`           | `string`  | —            | HTML template for the print footer (same format as `headerTemplate`).                             |
| `preferCSSPageSize`        | `boolean` | `false`      | If true, honour the page size from CSS rather than rescaling to fit `paperWidth` × `paperHeight`. |

### `ccg-card-generator` defaults

The library's own defaults (applied before your `pdfOptions` are merged in) are:

```js
{
  printOptions: {
    displayHeaderFooter: false,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
}
```

So unless you override them, Chrome's 1 cm defaults for margins are replaced with zero — which is what you usually want for card sheets.

### `headerTemplate` / `footerTemplate`

Should be valid HTML. The following classes inject printing values:

- `date` – formatted print date
- `title` – document title
- `url` – document location
- `pageNumber` – current page number
- `totalPages` – total pages in the document

For example, `<span class="title"></span>` renders a span containing the document title.
