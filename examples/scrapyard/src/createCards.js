import input from "../cards.config";
import generateCards from "ccg-card-generator";

const options = {
  debug: true,
  style: "./src/styles/scrapheap.css",
  destination: "./cards.pdf",
  pageDimensions: {
    height: 297,
    width: 210,
    padding: 8,
  },
  cardDimensions: {
    height: 88,
    width: 63,
    margin: 0,
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

// const sortedCards = input.cards
// sortedCards.sort((a,b) => a.name < b.name ? -1 : 1)

// generateCards(sortedCards, options);

// const sortedCards = input.cards.map(card=>card.rarity === "Common")
// sortedCards.sort((a,b) => a.name < b.name ? -1 : 1)

// generateCards(sortedCards, options);