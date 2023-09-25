import input from "../cards.config";
import generateCards from "ccg-card-generator";

const options = {
  debug: true,
  style: "./src/styles/scrapheap.css",
  destination: "./cards.pdf",
  pageDimensions: {
    height: 297,
    width: 210,
    padding: 5,
  },
  cardDimensions: {
    height: 88,
    width: 63,
    margin: 0,
    border: 1,
  },
};

generateCards(input.cards, options);