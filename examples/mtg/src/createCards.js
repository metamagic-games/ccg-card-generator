import generateCards from "ccg-card-generator";

import input from "../cards.config";
import generateMtgCards from "./generateMtgCards";

const options = {
  debug: true,
  style: "./src/styles/mtg.css",
  destination: "./cards.pdf",
  htmlGenerator: generateMtgCards,
  page: {
    height: 297,
    width: 210,
    padding: 5,
  },
  card: {
    height: 88,
    width: 63,
    margin: 2,
    border: 1,
  },
  pdfOptions: {
    printOptions: {
      displayHeaderFooter: false,
      marginTop: 0,
      marginRight: 0,
      marginLeft: 0,
      marginBottom: 0,
      printBackground: true,
      paperWidth: 210 / 25.4,
      paperHeight: 297 / 25.4,
    }
  }
};

generateCards(input.cards, options);