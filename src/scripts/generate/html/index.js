import fs from "fs";

import createHtmlPages from "./createHtmlPages";

const getCardsPerPage = (dimensions) => {
  const cardsPerRow = Math.floor(
    (dimensions.page.width - dimensions.page.padding * 2) /
      (dimensions.card.width + dimensions.card.margin + dimensions.card.border),
  );
  
  const cardsPerColumn = Math.floor(
    (dimensions.page.height - dimensions.page.padding * 2) /
      (dimensions.card.height +
        dimensions.card.margin +
        dimensions.card.border),
  );

  return cardsPerRow * cardsPerColumn;
};

const chunk = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const generateHTML = (cards, styles, dimensions, htmlGenerator = createHtmlPages) => {
  const cardPages = chunk(cards, getCardsPerPage(dimensions));
  const css = fs.readFileSync(styles, "utf8");

  return `
    <html>
      <head>
        <style>
          ${css}

          @page {
            size: ${dimensions.page.width}mm ${dimensions.page.height}mm;
          }
        </style>
      </head>
      
      ${htmlGenerator(dimensions, cardPages)}
    </html>
  `;
};

export default generateHTML;
