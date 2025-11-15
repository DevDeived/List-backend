import express from "express";
import listRouter from "../src/routes/lists.js";
import serverless from "serverless-http";

const app = express();

// CORS
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
  res.json({ status: "API rodando!" });
});

// 👉 ESSA PARTE É OBRIGATÓRIA PARA O VERCEL
export default serverless(app);
