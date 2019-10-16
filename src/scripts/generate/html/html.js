import  _ from "lodash";
import fs from "fs";
import generateHtmlBody from './htmlBody'

const generateHTML = (cards, style, dimensions, bodyGenerator) => {
	const cardsPerRow = Math.floor( ( dimensions.page.width - dimensions.page.padding ) / ( dimensions.card.width + dimensions.card.margin + dimensions.card.border ))
	const cardsPerColumn = Math.floor( ( dimensions.page.height - dimensions.page.padding ) / ( dimensions.card.height + dimensions.card.margin + dimensions.card.border ))
	const cardsPerPage = cardsPerRow * cardsPerColumn

	const pages = Math.ceil(cards.length / cardsPerPage)

	let cardPages = Array(pages)
		.fill('')
		.map(x=>[])

	cards.forEach((card, i) => {
		const page = Math.floor((i) / cardsPerPage)
		cardPages[page].push(card)
	})

	return `
		<html>
			<head>
				<style>
					${ fs.readFileSync(style, function(err) {
							if (err) console.log(err);
						}) }
				</style>
			</head>
			
			${
				bodyGenerator
					? bodyGenerator(dimensions, cardPages)
					: generateHtmlBody(dimensions, cardPages)
			}
		</html>
	`;
};

export default generateHTML