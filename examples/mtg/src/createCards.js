import generateCards from "ccg-card-generator";

import input from "../cards.config";
import generateMtgCards from "./generateMtgCards";

const options = {
  debug: true,
  style: "./src/styles/mtg.css",
  destination: "./cards.pdf",
  htmlGenerator: generateMtgCards,
};

generateCards(input.cards, options);