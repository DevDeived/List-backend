const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

let tasks = [];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  task.id = Date.now();
  task.subtotal = task.quantidade * task.preco;
  task.createdAt = new Date().toISOString();
  tasks.push(task);
  res.status(201).json(task);
});

app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter((task) => task.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
