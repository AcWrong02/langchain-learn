import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const loader = new TextLoader("./Splitter/data/kong.txt");
const docs = await loader.load();

console.log(docs);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 64,
  chunkOverlap: 0,
});

const splitDocs = await splitter.splitDocuments(docs);

console.log(splitDocs);

// with chunkOverlap
const splitDocs2 = await new RecursiveCharacterTextSplitter({
  chunkSize: 64,
  chunkOverlap: 16,
}).splitDocuments(docs);

console.log(splitDocs2);
