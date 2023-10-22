import { OpenAI } from 'langchain/llms';
import { LLMChain, PromptTemplate } from 'langchain';
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from 'langchain/embeddings';
import promptTemplate from './basePrompt.js'


// Load the Vector Store from the `vectorStore` directory
const store = await HNSWLib.load("vectorStore", new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY
}));
console.clear();

// OpenAI Configuration or accessing LLM wrapper 
const model = new OpenAI({
  temperature: 0.5,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-davinci-003'
});
//text-davinci-003


//Parse and initialize the Prompt
const prompt = new PromptTemplate({
  template: promptTemplate,
  inputVariables: ["history", "context", "prompt"]
});

// Create the LLM Chain
const llmChain = new LLMChain({
  llm: model,
  prompt
});

/** 
generates a response based on history and a prompt.
 * @param {string} history - 
 * @param {string} prompt - Th
 */
const generateResponse = async ({
  history,
  prompt
}) => {
  // Search for related contexts or documents in the vectorStore directory
  const data = await store.similaritySearch(prompt, 1);
  const context = [];
  data.forEach((item, i) => {
    context.push(`Context:\n${item.pageContent}`)
  });

  return await llmChain.predict({
    prompt,
    context: context.join('\n\n'),
    history
  })
}

export default generateResponse;