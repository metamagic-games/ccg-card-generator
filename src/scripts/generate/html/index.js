import _ from "lodash";
import fs from "fs";

import createHtmlPages from "./createHtmlPages";

const getCardsPerPage = (dimensions) => {
  const cardsPerRow = Math.floor(
    (dimensions.page.width - dimensions.page.padding) /
      (dimensions.card.width + dimensions.card.margin + dimensions.card.border),
  );
  const cardsPerColumn = Math.floor(
    (dimensions.page.height - dimensions.page.padding) /
      (dimensions.card.height +
        dimensions.card.margin +
        dimensions.card.border),
  );

  return cardsPerRow * cardsPerColumn;
};

const generateHTML = (cards, styles, dimensions) => {
  const cardsPerPage = getCardsPerPage(dimensions);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  let cardPages = Array(totalPages)
    .fill("")
    .map((x) => []);

  cards.forEach((card, i) => {
    const page = Math.floor(i / cardsPerPage);
    cardPages[page].push(card);
  });

  const css = fs.readFileSync(styles, function (err) {
    if (err) console.log(err);
  });

  return `
    <html>
      <head>
        <style>
          ${css}
        </style>
      </head>
      
      ${createHtmlPages(dimensions, cardPages)}
    </html>
  `;
};

export default generateHTML;
