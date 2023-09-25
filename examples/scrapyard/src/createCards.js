import input from "../cards.config";
import generateCards from "ccg-card-generator";

const options = {
  debug: true,
  style: "./src/styles/scrapheap.css",
  destination: "./cards.pdf",
};

generateCards(input.cards, options);