import express from "express";
import {
  createList,
  getLists,
  getListById,
  getListByMonth,
  deleteList,
} from "../controllers/listsController.js";

const router = express.Router();

router.post("/", createList);
router.get("/", getLists);
router.get("/month/:mes", getListByMonth);
router.get("/:id", getListById);
router.delete("/:id", deleteList);

export default router;