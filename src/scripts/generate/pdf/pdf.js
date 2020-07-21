import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";
import generateHtml, { htmlBody, } from "../html";

// ---------------------------------

const HEIGHT = 282 
const WIDTH = 216

const stylesheets = {
	"prototype": "./node_modules/ccg-card-generator/lib/styles/prototype.css",
};

const elementDimensions = {
	"page": {
		"height": HEIGHT,
		"width": WIDTH,
		"padding": 5,
	},
	"card": {
		"height": 82,
		"width": 59,
		"margin": 2,
		"border": 1,
	}
}

const defaultPdfOptions = {
	"printOptions": {
		"displayHeaderFooter": false,
		marginTop: 0,
		marginRight: 0,
		marginLeft: 0,
		marginBottom: 0,
	},
};

const writeDebugHTML = (html) => {
	console.log("Saving interim HTML...");

	fs.writeFile("debug.html", html, function(err) {
		if (err) console.log(err);
	});
}

const generatePdf = ( cards, destination="./output.pdf", options, ) => {
	console.log('Generating cards...')

	const style = options.customStyles 
		? options.customStyles 
		: ( stylesheets[options.style] || stylesheets.prototype );
	
	const dimensions = options.customDimensions || elementDimensions;

	const bodyGenerator = options.bodyGenerator || htmlBody

	const html = generateHtml( cards, style, dimensions, bodyGenerator );

	if (options.debug) {
		writeDebugHTML(html)
	}

	console.log("Creating PDF...");

	const printOptions = options.pdfOptions || defaultPdfOptions
	console.log("Print options:", printOptions);

	return htmlPdfChrome
		.create(
			html, 
			printOptions,
		)
		.then((newPdf) => newPdf.toFile(destination || "test.pdf"))
		.then(_=>console.log(`${destination} generated`))
};

export default generatePdf;
