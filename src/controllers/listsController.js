import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createList = async (req, res) => {
  try {
    const { nome, mes, total, itens } = req.body;
    if (!mes || typeof total !== "number" || !Array.isArray(itens)) {
      return res.status(400).json({ error: "Dados Inválidos!" });
    }

    const lista = await prisma.lista.create({
      data: {
        nome,
        mes,
        total,
        itens: {
          create: itens.map((i) => ({
            nome: i.nome,
            quantidade: i.quantidade,
            preco: i.preco,
            subtotal: i.subtotal
          }))
        }
      },
      include: { itens: true }
    });

    return res.status(201).json(lista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar lista!" });
  }
};

export const getLists = async (req, res) => {
  try {
    const listas = await prisma.lista.findMany({
      orderBy: { createdAt: "desc" },
      include: { itens: true }
    });
    return res.json(listas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar listas!" });
  }
};

export const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const lista = await prisma.lista.findUnique({
      where: { id: Number(id) },
      include: { itens: true }
    });
    if (!lista) return res.status(404).json({ error: "Lista não encontrada!" });
    return res.json(lista);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar lista!" });
  }
};

export const getListByMonth = async (req, res) => {
  try {
    const { mes } = req.params;
    const listas = await prisma.lista.findMany({
      where: {
        mes: { lte: mes } 
      },
      orderBy: { createdAt: "desc" },
      include: { itens: true }
    });
    return res.json(listas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar listas por mês!" });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.lista.delete({ where: { id: Number(id) } });
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar lista!" });
  }
};
