# DocBridge

DocBridge is a full-stack web application that allows users to upload PDF documents and ask questions about their content. It uses Google's Gemini models for embedding and conversational generation, Qdrant for vector storage, and BullMQ for background job processing.

## Architecture

The project is divided into three main components:

- **Client**: A modern Next.js front-end using React, TailwindCSS, Shadcn, and Clerk for authentication.
- **Server**: An Express.js backend that handles PDF uploads and provides a chat API. It uses Multer for file handling.
- **Worker**: A background worker powered by BullMQ that processes uploaded PDFs, splits them into chunks using LangChain, generates embeddings with Google Gemini (`gemini-embedding-001`), and stores them in Qdrant.
- **Infrastructure**: Docker Compose is used to spin up Valkey (a Redis alternative for BullMQ) and Qdrant (Vector Database).

## Tech Stack

### Frontend (Client)
- Next.js (v14/v15)
- React
- TailwindCSS
- Shadcn UI
- Clerk (Authentication)
- Framer Motion

### Backend (Server)
- Express.js
- Google Gemini (`@google/genai`, `gemini-2.5-flash`)
- LangChain (`@langchain/core`, `@langchain/google-genai`, `@langchain/qdrant`)
- BullMQ (Job Queues)
- Multer (File Uploads)

### Infrastructure (Docker)
- Valkey (Redis-compatible, port 6379)
- Qdrant (Vector Database, port 6333)

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Google Gemini API Key

## Getting Started

### 1. Start the Infrastructure

Start Valkey and Qdrant using Docker Compose:

```bash
docker-compose up -d
```

### 2. Setup the Server

Navigate to the server directory, install dependencies, and setup your environment variables.

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your Google API key:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

Start the Express server and the background worker in separate terminal windows:

```bash
# Terminal 1: Start the Express server (runs on port 8000)
npm run dev

# Terminal 2: Start the background worker
npm run dev:worker
```

### 3. Setup the Client

Navigate to the client directory, install dependencies, and configure environment variables.

```bash
cd client
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The client will be available at `http://localhost:3000`.

## How it Works

1. **Upload**: Users upload a PDF via the frontend. The server saves the file and queues a job in Valkey.
2. **Process**: The background worker picks up the job, extracts text from the PDF, chunks it, and creates vector embeddings using Gemini. These embeddings are stored in Qdrant.
3. **Chat**: When a user asks a question, the server creates an embedding for the query, retrieves the most relevant context from Qdrant, and sends a prompt to Gemini 2.5 Flash to generate an accurate response based on the document's contents.
