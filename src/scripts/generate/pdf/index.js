import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";
import generateHtml from "../html";

const defaultPageDimensions = {
  height: 282,
  width: 216,
  padding: 5,
};

const defaultCardDimensions = {
  height: 82,
  width: 59,
  margin: 2,
  border: 1,
};

const defaultPdfOptions = {
  printOptions: {
    displayHeaderFooter: false,
    marginTop: 0,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
  },
};

const defaultStylesheet = "./node_modules/ccg-card-generator/lib/styles/prototype.css";

const writeDebugHTML = (html) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("debug.html", html, (err) => {
      if (err) {
        reject(new Error(`Failed to write debug HTML: ${err.message}`));
      } else {
        resolve();
      }
    });
  });
};

const generatePdf = async (cards, options = {}) => {
  if (!Array.isArray(cards)) {
    throw new Error("Cards must be an array");
  }

  if (cards.length === 0) {
    throw new Error("Cards array cannot be empty");
  }

  const {
    debug = false,
    destination = "./output.pdf",
    pdfOptions,
    style = defaultStylesheet,
    pageDimensions,
    cardDimensions,
    htmlGenerator,
  } = options;

  const dimensions = {
    page: {
      ...defaultPageDimensions,
      ...pageDimensions,
    },
    card: {
      ...defaultCardDimensions,
      ...cardDimensions,
    },
  };

  const html = generateHtml(cards, style, dimensions, htmlGenerator);

  if (debug) {
    await writeDebugHTML(html);
  }

  const printOptions = {
    ...defaultPdfOptions,
    ...pdfOptions,
  };

  const pdf = await htmlPdfChrome.create(html, printOptions);
  await pdf.toFile(destination);

  return { destination, cardCount: cards.length };
};

export default generatePdf;