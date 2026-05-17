import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server Running");
});