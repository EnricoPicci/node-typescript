import * as fs from 'fs';
// import pdfjsLib = require('pdfjs-dist');
// import * as pdfjsLib from 'pdfjs-dist';
import { PDFJSStatic } from 'pdfjs-dist';
const pdfjsLib: PDFJSStatic = require('pdfjs-dist');

import {NodeCanvasFactory} from './node-canvas-factory';

export class PdfThumbnailGenerator {
    pdfThumbnail(pdfUrl: string) {
        // Read the PDF file into a typed array so PDF.js can load it.
        const rawData = new Uint8Array(fs.readFileSync(pdfUrl));
        // Load the PDF file.
        pdfjsLib.getDocument(rawData).then(function (pdfDocument) {
            console.log('# PDF document loaded.');
        
            // Get the first page.
            console.log('pages for ' + pdfUrl, pdfDocument.numPages);
            pdfDocument.getPage(1).then(function (page) {
            // Render the page on a Node canvas with 100% scale.
            var viewport = page.getViewport(1.0);
            var canvasFactory = new NodeCanvasFactory();
            var canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
            var renderContext = {
                canvasContext: canvasAndContext.context,
                viewport: viewport,
                canvasFactory: canvasFactory
            };
        
            page.render(renderContext).then(function () {
                // Convert the canvas to an image buffer.
                var image = canvasAndContext.canvas.toBuffer();
                const outputFile = pdfUrl + '.png';
                console.log(outputFile);
                fs.writeFile(outputFile, image, function (error) {
                if (error) {
                    console.error('Error: ' + error);
                } else {
                    console.log('Finished converting first page of PDF file to a PNG image.');
                }
                });
            });
            });
        }).catch(function(reason) {
            console.log(reason);
        });
    }
}
