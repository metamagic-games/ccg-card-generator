const generateCard = (card, dimensions) => {
  return `
    <div 
      class="card" 
      style="
        height: ${dimensions.card.height}mm;
        width: ${dimensions.card.width}mm;
        margin-bottom: ${dimensions.card.margin}mm;
        margin-right: ${dimensions.card.margin}mm;
      "
    >
      ${
        Object.keys(card).map((key) => {
          const value = card[key]

          return `
            <div class="card-section-${key}">
              ${ value }
            </div>
          `
        }).join('')
      }
    </div>
  `;
}

const generatePage = (cardPage, pageNumber, dimensions) => {
  return `
    <div 
      class="page page-${pageNumber}"
      style="
        height: ${dimensions.page.height}mm;
        width: ${dimensions.page.width}mm;
        max-height: ${dimensions.page.height}mm;
        max-width: ${dimensions.page.width}mm;
        padding: ${dimensions.page.padding}mm;
      "
    >
      ${ 
        cardPage.map( ( card ) => {
            return generateCard(card, dimensions)
          })
          .join(" ")
      }
    </div>
  `
}

const createHtmlPages = (dimensions, cardPages) => {
  return `
    <body class="document">
      <div class="pages">
        ${
          cardPages.map( ( cardPage, i ) => {
            return generatePage(cardPage, i, dimensions)
          }).join('')
        }
      </div>
    </body>
  `
}

export default createHtmlPages