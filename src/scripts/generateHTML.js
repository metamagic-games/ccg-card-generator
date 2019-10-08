import  _ from "lodash";
import fs from "fs";

// ---------------------------------

export const generateHTML = ( cards, style, dimensions) => {
	console.log(cards, style, dimensions)

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
			
			<body class="document">
				<div class="pages">
					${
						cardPages.map( ( cardPage, i ) => {
							return `
								<div 
									class="page page-${i}"
									style="
										height: ${dimensions.page.height}mm;
										width: ${dimensions.page.width}mm;
										max-height: ${dimensions.page.height}mm;
										max-width: ${dimensions.page.width}mm;
										padding: ${dimensions.page.padding}mm;
									"
								>
									${ 
										cardPage.map( ( card, i, ) => {
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
											})
											.join(" ")
									}
								</div>
							`
						}).join('')
					}
				</div>
			</body>
		</html>
	`;
};