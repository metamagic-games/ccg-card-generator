import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";
import path from "path";
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

const defaultStylesheet = path.join(__dirname, "../../../styles/prototype.css");

const writeDebugHTML = async (html) => {
  try {
    await fs.promises.writeFile("debug.html", html);
  } catch (err) {
    throw new Error(`Failed to write debug HTML: ${err.message}`);
  }
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