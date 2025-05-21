import { TokenTextSplitter } from "@langchain/textsplitters";

const text =
  "I stand before you today the representative of a family in grief, in a country in mourning before a world in shock.";

const splitter = new TokenTextSplitter({
  chunkSize: 10,
  chunkOverlap: 0,
});

const docs = await splitter.createDocuments([text]);

console.log(docs);
