import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import listRouter from "./src/routes/lists.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/tasks", listRouter);

app.get("/", (req, res) => {
  res.json({ status: "ok", env: process.env.NODE_ENV || "dev" });
});

// Adicionado para teste local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;