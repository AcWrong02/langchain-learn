/**
 * Document Description: https://js.langchain.com/docs/integrations/document_loaders/file_loaders/pdf/#overview
 */
import * as pdfParse from "pdf-parse/lib/pdf-parse.js";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("./Loader/files/github-copliot.pdf");

async function main() {
  const pdfs = await loader.load();
  console.log(pdfs);
  /**
   * document Array
   * each document is a page
   * each page has a content and metadata
   * metadata has page number, total pages, and metadata
   */
}

main();

const loader1 = new PDFLoader("./Loader/files/github-copliot.pdf", {
  splitPages: false,
});

const pdfs1 = await loader1.load();
console.log(pdfs1);
/**
 * document Object
 * content is the text of the file
 * metadata is the metadata of the file
 */
