import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

import prisma from "./prisma.js";

router.get("/", async (req, res) => {
  const itens = await prisma.item.findMany();
  res.json(itens);
});

router.post("/", async (req, res) => {
  const { nome, quantidade, preco } = req.body;
  const item = await prisma.item.create({
    data: { nome, quantidade, preco, subtotal: quantidade * preco },
  });
  res.json(item);
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.item.delete({ where: { id } });
  res.json({ success: true });
});

export default router;
