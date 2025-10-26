import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import listRouter from "./routes/lists.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/lists", listRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV || "dev" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na Http://localhost:${PORT}`);
});
