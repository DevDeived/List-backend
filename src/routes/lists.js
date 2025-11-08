import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// 🔹 Cria lista padrão se não existir
const ensureDefaultList = async () => {
  const list = await prisma.lista.findFirst();
  if (!list) {
    return prisma.lista.create({
      data: { nome: "Lista Padrão", mes: "11", total: 0 },
    });
  }
  return list;
};

// GET /tasks
router.get("/", async (req, res) => {
  try {
    const itens = await prisma.item.findMany();
    res.json(itens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /tasks
router.post("/", async (req, res) => {
  try {
    const { nome, quantidade, preco } = req.body;
    if (!nome || !quantidade || !preco) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    const lista = await ensureDefaultList();

    const item = await prisma.item.create({
      data: {
        nome,
        quantidade,
        preco,
        subtotal: quantidade * preco,
        listaId: lista.id,
      },
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
