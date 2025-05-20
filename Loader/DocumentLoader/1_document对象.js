/**
 * 手动创建Document对象
 */
import { Document } from "langchain/document";

const test = new Document({
  pageContent: "Hello, world!",
  metadata: {
    source: "example",
  },
});

console.log(test);

// Document {
//     pageContent: 'Hello, world!',
//     metadata: { source: 'example' },
//     id: undefined
// }
