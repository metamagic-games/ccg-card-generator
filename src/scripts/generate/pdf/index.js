import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";
import generateHtml from "../html";

const HEIGHT = 282;
const WIDTH = 216;

const defaultDimensions = {
  page: {
    height: HEIGHT,
    width: WIDTH,
    padding: 5,
  },
  card: {
    height: 82,
    width: 59,
    margin: 2,
    border: 1,
  },
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

const defaultStylesheet: "./node_modules/ccg-card-generator/lib/styles/prototype.css";

const writeDebugHTML = (html) => {
  console.log("Saving interim HTML...");

  fs.writeFile("debug.html", html, function (err) {
    if (err) console.log(err);
  });
};

const generatePdf = (cards, options) => {
  const {
  	debug=true,
  	destination="./output.pdf", 
  	pdfOptions, 
  	style=defaultStylesheet,
  	dimensions=defaultDimensions,
  } = options

  if (debug) console.log(cards, options)

  console.log("Generating cards...");
  if (debug) console.log(style, dimensions)

  const html = generateHtml(cards, style, dimensions);

  if (debug) {
    writeDebugHTML(html);
  }

  console.log("Creating PDF...");

  const printOptions = {
  	...defaultPdfOptions,
  	...pdfOptions, 
  }
  console.log("Print options:", printOptions);

  return htmlPdfChrome
    .create(html, printOptions)
    .then((newPdf) => newPdf.toFile(destination || "test.pdf"))
    .then((_) => console.log(`${destination} generated`));
};

export default generatePdf;