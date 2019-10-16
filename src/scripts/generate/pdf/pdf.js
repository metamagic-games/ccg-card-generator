import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";
import generateHtml, { htmlBody, } from "../html";

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

const generatePdf = ( cards, destination, options, ) => {
	console.log('Generating cards...')

	console.log("Options:", options);

	const style = options.customStyles 
		? options.customStyles 
		: ( stylesheets[options.style] || stylesheets.prototype );
	
	const dimensions = options.customDimensions || elementDimensions;

	const bodyGenerator = options.bodyGenerator || htmlBody

	const html = generateHtml( cards, style, dimensions, bodyGenerator );

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

	console.log("Finished!");
};

export default generatePdf;
