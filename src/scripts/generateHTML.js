import  _ from "lodash";
import fs from "fs";

// ---------------------------------

export const parseHTML = (targetURL, style, markdownOptions) => {
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
				</div>
			</body>
		</html>
	`;
};