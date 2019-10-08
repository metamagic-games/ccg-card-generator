import fs from "fs";
import * as htmlPdfChrome from "html-pdf-chrome";
import { generateHTML, } from "./generateHTML.js";

// ---------------------------------

const height = 282 
const width = 216

const stylesheets = {
	"prototype": "./node_modules/ccg-card-generator/lib/styles/prototype.css",
};

const elementDimensions = {
	"page": {
		"height": height,
		"width": width,
		"padding": 5,
	},
	"card": {
		"height": 82,
		"width": 59,
		"margin": 2,
		"border": 1,
	}
}

const pdfOptions = {
	"printOptions": {
		"displayHeaderFooter": false,
		marginTop: 0,
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
		// marginTop: elementDimensions.page.margin,
		// marginRight: elementDimensions.page.margin,
		// marginLeft: elementDimensions.page.margin,
		// marginBottom: elementDimensions.page.margin,
	},
};

// ---------------------------------

const generatePDF = ( cards, destination, options, ) => {
	const style = options.customStyles 
		? options.customStyles 
		: ( stylesheets[options.style] || stylesheets.prototype );
	
	const dimensions = options.customDimensions || elementDimensions;

	const html = generateHTML( cards, style, dimensions );

	console.log("Options:", options);

	if (options.debug) {
		console.log("Saving interim HTML...");

		fs.writeFile("debug.html", html, function(err) {
			if (err) console.log(err);
		});
	}

	console.log("Creating PDF...");

	const printOptions = options.pdfOptions || pdfOptions

	htmlPdfChrome.create(
		html, 
		printOptions,
	).then((newPdf) => newPdf.toFile(destination || "test.pdf"));
};

export default generatePDF;
