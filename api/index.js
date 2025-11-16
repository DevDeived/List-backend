import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import serverless from "serverless-http";
import listRouter from "./tasks.js";  // aqui importa as rotas

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/tasks", listRouter);

app.get("/", (req, res) => {
  res.json({ status: "API rodando!" });
});

export default serverless(app);
