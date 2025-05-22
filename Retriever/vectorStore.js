// 导入必要的模块
// TextLoader: 用于加载文本文件
import { TextLoader } from "langchain/document_loaders/fs/text";
// RecursiveCharacterTextSplitter: 用于将文本递归分割成小块
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// AlibabaTongyiEmbeddings: 使用阿里云通义千问的嵌入模型
import { AlibabaTongyiEmbeddings } from "@langchain/community/embeddings/alibaba_tongyi";
// FaissStore: Facebook AI Similarity Search 向量存储，用于高效存储和检索向量
import { FaissStore } from "@langchain/community/vectorstores/faiss";
// 导入并配置环境变量
import dotenv from "dotenv";
dotenv.config();

/**
 * 创建并保存向量存储
 * 这个函数会：
 * 1. 加载文本文件
 * 2. 将文本分割成小块
 * 3. 使用通义千问模型生成文本嵌入
 * 4. 创建向量存储并保存到本地
 */
const saveVectorStore = async () => {
  // 加载文本文件
  const loader = new TextLoader("./Splitter/data/kong.txt");
  const docs = await loader.load();

  // 创建文本分割器，设置块大小为100，重叠大小为20
  // 这样可以将长文本分割成更小的片段，便于后续处理
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100, // 每个文本块的最大字符数
    chunkOverlap: 20, // 相邻文本块之间的重叠字符数
  });

  // 将文档分割成小块
  const splitDocs = await splitter.splitDocuments(docs);

  // 创建通义千问嵌入模型实例
  const embeddings = new AlibabaTongyiEmbeddings();

  // 使用分割后的文档和嵌入模型创建向量存储
  const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);

  // 指定保存目录
  const directory = "../db/kongyiji";
  // 将向量存储保存到本地
  await vectorStore.save(directory);
};

/**
 * 运行向量检索
 * 这个函数会：
 * 1. 加载已保存的向量存储
 * 2. 创建检索器
 * 3. 执行相似度搜索
 */
async function run() {
  // 指定向量存储的目录
  const directory = "../db/kongyiji";
  // 创建通义千问嵌入模型实例
  const embeddings = new AlibabaTongyiEmbeddings();

  // 从本地加载向量存储
  const vectorstore = await FaissStore.load(directory, embeddings);

  // 创建检索器，设置返回最相似的2个结果
  const retriever = vectorstore.asRetriever(2);

  // 执行相似度搜索，查找与"茴香豆是做什么用的"最相关的文本片段
  const res = await retriever.invoke("茴香豆是做什么用的");

  // 打印检索结果
  console.log("retriever result:", res);
}

// 执行检索函数
run();
