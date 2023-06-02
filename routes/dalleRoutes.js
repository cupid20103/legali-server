import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config({ path: "./.env.local" });

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from Legalì!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const generatedText = aiResponse.data.choices[0].message.content;
    res.status(200).json({ success: true, text: generatedText });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
