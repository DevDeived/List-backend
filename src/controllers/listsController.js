import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createList = async (req, res) => {
  try {
    const { nome, quantidade, preco, subtotal } = req.body;
    if (!nome || typeof quantidade !== "number" || typeof preco !== "number" || typeof subtotal !== "number") {
      return res.status(400).json({ error: "Dados Inválidos!" });
    }

  
    let lista = await prisma.lista.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!lista) {
      lista = await prisma.lista.create({
        data: {
          nome: "Lista Padrão",
          mes: new Date().getMonth() + 1 + "", 
          total: subtotal,
        },
      });
    } else {
      
      const newTotal = lista.total + subtotal;
      lista = await prisma.lista.update({
        where: { id: lista.id },
        data: { total: newTotal },
      });
    }

    const item = await prisma.item.create({
      data: {
        nome,
        quantidade,
        preco,
        subtotal,
        listaId: lista.id,
      },
    });

    return res.status(201).json(item); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar item!" });
  }
};

export const getLists = async (req, res) => {
  try {
    const items = await prisma.item.findMany({
      include: { lista: true },
      orderBy: { lista: { createdAt: "desc" } },
    });
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar itens!" });
  }
};

export const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: { id: Number(id) },
      include: { lista: true },
    });
    if (!item) return res.status(404).json({ error: "Item não encontrado!" });
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar item!" });
  }
};

export const getListByMonth = async (req, res) => {
  try {
    const { mes } = req.params;
    const items = await prisma.item.findMany({
      where: {
        lista: {
          mes: mes,
        },
      },
      include: { lista: true },
      orderBy: { lista: { createdAt: "desc" } },
    });
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar itens por mês!" });
  }
};

export const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id: Number(id) } });
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar item!" });
  }
};