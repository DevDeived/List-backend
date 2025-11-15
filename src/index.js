// src/index.js
import express from "express";
import listRouter from "./routes/lists.js";

const app = express();

// CORS que NUNCA falha
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

app.use(express.json());
app.use("/tasks", listRouter);

app.get("/", (req, res) => {
  res.json({ status: "API rodando 100%!", time: new Date() });
});

// Porta do Vercel OU local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVIDOR RODANDO EM http://localhost:${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}/tasks`);
});

export default app;