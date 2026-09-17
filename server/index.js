import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import crypto from "crypto";
import { Queue } from "bullmq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const queue = new Queue("file-upload-queue", {
  connection: {
    host: "localhost",
    port: "6379",
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, `${file.originalname}`);
    });
  },
});

const upload = multer({ storage: storage });

const app = express();
const port = 8000;
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (req, res) => {
  return res.json({ status: "all good, working!" });
});

app.get("/chat", async (req, res) => {
  const userQuery = "what is canvas?";

  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY,
  });

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "pdf-docs",
    },
  );

  const ret = vectorStore.asRetriever({
    k: 2,
  });

  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are a PDF Q&A assistant. Answer the user's questions using only the information from the provided PDF context.
  Do not make up information.
  Context: 
  ${JSON.stringify(result)}

  If the answer is not found in the PDF,
  say: "I couldn't find the answer in the PDF."`;

  const chatResult = await client.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_PROMPT,
    },
    contents: userQuery,
  });

  return res.json({
    answer: chatResult.text,
    sources: result,
  });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  // creating job to be done by worker
  await queue.add(
    "file-ready",
    JSON.stringify({
      filename: req.file.originalname,
      source: req.file.destination,
      path: req.file.path,
    }),
  );
  return res.json({ message: "uploaded" });
});

app.listen(port, () => {
  console.log(`Server starting on ${port}`);
});
