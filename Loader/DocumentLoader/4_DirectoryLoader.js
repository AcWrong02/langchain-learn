/**
 * Document Description: https://js.langchain.com/docs/integrations/document_loaders/file_loaders/directory/
 */
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import * as pdfParse from "pdf-parse/lib/pdf-parse.js";

const loader = new DirectoryLoader("./Loader/files", {
  ".pdf": (path) => new PDFLoader(path, { splitPages: false }),
  ".txt": (path) => new TextLoader(path),
});

const docs = await loader.load();

console.log(docs);
