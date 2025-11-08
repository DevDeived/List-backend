// src/index.js
import express from "express";
import listRouter from "./routes/lists.js";

const app = express();

// CORS MANUAL (FUNCIONA NO VERCEL!)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowed = [
    "http://localhost:5173",
    "https://list-frontend-git-main-devdeiveds-projects.vercel.app"
  ];

  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json());
app.use("/tasks", listRouter);

app.get("/", (req, res) => {
  res.json({ status: "API OK", time: new Date().toISOString() });
});

export default app;