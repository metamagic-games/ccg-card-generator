import generateCards from "ccg-card-generator";

import input from "../cards.config";
import generateMtgCards from "./generateMtgCards";

const dimensions = {
  page: {
    height: 282,
    width: 216,
    padding: 5,
  },
  card: {
    height: 88,
    width: 63,
    margin: 2,
    border: 1,
  },
};

const options = {
  debug: true,
  style: "./src/styles/mtg.css",
  destination: "./cards.pdf",
  htmlGenerator: generateMtgCards,
  dimensions,
};

generateCards(input.cards, options);