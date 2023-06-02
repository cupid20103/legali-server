import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config({ path: "./.env.local" });

const app = express();

var corsOption = {
  origin: `*`,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  url: [
    "http://localhost:5173",
    "https://website-aggregator-client.vercel.app/",
  ],
};
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Legalì!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
