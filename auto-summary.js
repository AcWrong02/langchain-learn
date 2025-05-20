import { ChatAlibabaTongyi } from "@langchain/community/chat_models/alibaba_tongyi";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { getBufferString } from "@langchain/core/messages";

import dotenv from "dotenv";
dotenv.config();

const summaryModel = new ChatAlibabaTongyi({
  model: "qwen-plus", // Available models: qwen-turbo, qwen-plus, qwen-max
  temperature: 1,
  alibabaApiKey: process.env.ALIBABA_API_KEY, // In Node.js defaults to process.env.ALIBABA_API_KEY
});

const summaryPrompt = ChatPromptTemplate.fromTemplate(`
    Progressively summarize the lines of conversation provided, adding onto the previous summary returning a new summary
    
    Current summary:
    {summary}
    
    New lines of conversation:
    {new_lines}
    
    New summary:
    `);

const summaryChain = RunnableSequence.from([
  summaryPrompt,
  summaryModel,
  new StringOutputParser(),
]);

const newSummary = await summaryChain.invoke({
  summary: "",
  new_lines: "I'm 18",
});

console.log(newSummary); // The person mentioned that they are 18 years old.

const newSummary2 = await summaryChain.invoke({
  summary: newSummary,
  new_lines: "I'm male",
});

console.log(newSummary2); // The person mentioned that they are 18 years old and identified as male.

const chatModel = new ChatAlibabaTongyi({
  model: "qwen-plus", // Available models: qwen-turbo, qwen-plus, qwen-max
  temperature: 1,
  alibabaApiKey: process.env.ALIBABA_API_KEY, // In Node.js defaults to process.env.ALIBABA_API_KEY
});

const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a helpful assistant. Answer all questions to the best of your ability.

    Here is the chat history summary:
    {history_summary}
    `,
  ],
  ["human", "{input}"],
]);

let summary = "";

const history = new ChatMessageHistory();

const chatChain = RunnableSequence.from([
  {
    input: new RunnablePassthrough({
      func: (input) => history.addUserMessage(input),
    }),
  },
  RunnablePassthrough.assign({
    history_summary: () => summary,
  }),
  chatPrompt,
  chatModel,
  new StringOutputParser(),
  new RunnablePassthrough({
    func: async (input) => {
      history.addAIChatMessage(input);
      const messages = await history.getMessages();
      const new_lines = getBufferString(messages);
      const newSummary = await summaryChain.invoke({
        summary,
        new_lines,
      });
      console.log("newSummary--", newSummary);
      history.clear();
      summary = newSummary;
    },
  }),
]);

const res = await chatChain.invoke("我现在饿了"); // 听起来你需要吃点东西了。你可以考虑做一顿美味的饭菜，或者如果不想做饭，可以点外卖或吃点简单的零食垫垫肚子。你有什么特别想吃的吗？
console.log(res);

const res2 = await chatChain.invoke("我今天想吃方便面");
console.log(res2);
