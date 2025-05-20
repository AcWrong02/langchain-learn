import { RunnablePassthrough } from "@langchain/core/runnables";
import { RunnableSequence } from "@langchain/core/runnables";

const chain = RunnableSequence.from([
  // 添加一个固定的值
  RunnablePassthrough.assign({
    greeting: () => "你好",
  }),
  // 处理函数
  (input) => {
    console.log("输入:", input);
    // input 现在包含原始输入和 greeting
    return `${input.greeting}, ${input.question}`;
  },
]);

const result = await chain.invoke({
  question: "今天天气怎么样？",
});
console.log(result); // 输出: "你好, 今天天气怎么样？"
