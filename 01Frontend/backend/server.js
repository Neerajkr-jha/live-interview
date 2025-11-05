import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { GoogleGenAI } from "@google/genai";
import connectDB from './config.db/db.js'; // Import DB connection
// Load environment variables from .env file
import userRoutes from './routes/userRoutes.js'; 
import interviewRoutes from './routes/interviewRoutes.js'
import liveRoute from './routes/liveIntervieRoutes.js'
import { ApiError } from './utils/ApiError.js';
dotenv.config();


connectDB();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
   // local React dev
     "http://localhost:3000",
     "https://interview-prep-bot-peach.vercel.app",

  "http://localhost:5001", // local backend
  "https://interview-prep-bot-6ked.vercel.app" // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new ApiError("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


// --- Google Generative AI Initialization ---
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in the .env file.");
}

const ai = new GoogleGenAI({});

// async function main() {
     const main = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${prompt}`,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
  return(response.text);
  
}
export default main;


app.use('/api/users', userRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/live', liveRoute); 

const port = process.env.PORT || 5001;

// --- Server Listener ---
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});