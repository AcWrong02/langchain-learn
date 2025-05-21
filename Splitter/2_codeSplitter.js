import {
  SupportedTextSplitterLanguages,
  RecursiveCharacterTextSplitter,
} from "@langchain/textsplitters";
/**
 * 查看支持的语言
 * https://github.com/langchain-ai/langchainjs/blob/210c2abb8af009cda4b6f29e3095709579c3a728/libs/langchain-textsplitters/src/text_splitter.ts#L280
 */
console.log(SupportedTextSplitterLanguages);

const js = `
function myFunction(name,job){
    console.log("Welcome " + name + ", the " + job);
}

myFunction('Harry Potter','Wizard')

function forFunction(){
    for (let i=0; i<5; i++){
        console.log("这个数字是" + i)
    }
}

forFunction()
`;

const splitter = RecursiveCharacterTextSplitter.fromLanguage("js");

const splitDocs = await splitter.createDocuments([js]);

console.log(splitDocs);
