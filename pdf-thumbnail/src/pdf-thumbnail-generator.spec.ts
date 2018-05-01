import { PdfThumbnailGenerator } from './pdf-thumbnail-generator';
import { expect } from 'chai';
import 'mocha';

describe('PdfThumbnailGenerator class', () => {

  it('should generate a .png thumbnail', () => {
    const pdfThumbnailGenerator = new PdfThumbnailGenerator();
    const pdfUrl = __dirname + '/test.pdf';
    const pdfUrl2 = __dirname + '/test-2.pdf';
    const pdfUrl3 = __dirname + '/test-3.pdf';
    const pdfUrl4 = __dirname + '/test-4.pdf';
    let result = pdfThumbnailGenerator.pdfThumbnail(pdfUrl);
    result = pdfThumbnailGenerator.pdfThumbnail(pdfUrl2);
    result = pdfThumbnailGenerator.pdfThumbnail(pdfUrl3);
    result = pdfThumbnailGenerator.pdfThumbnail(pdfUrl4);
    expect(result).to.equal('ABCD');
  });

});
