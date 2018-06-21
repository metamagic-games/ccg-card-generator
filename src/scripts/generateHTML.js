import  _ from "lodash";
import fs from "fs";

// ---------------------------------

export const generateHTML = ( cards, style, ) => {
	console.log(style);
	return `
		<html>
			<head>
				<style>
					${ fs.readFileSync(style, function(err) {
							if (err) console.log(err);
						}) }
				</style>
			</head>
			
			<body class = "document">
				<div class = "pages">
					${ 
						cards.map( ( card, cardCount, ) => {
								return `
									<div class = "card">
										<div class = "card-name">
											${ card.name }
										</div>
										
										<div class = "card-text">
											${ card.text }
										</div>
									</div>
								`;
							})
							.join(" ")
					}
				</div>
			</body>
		</html>
	`;
};