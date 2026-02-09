import { Router } from "express";
import {
  createCard,
  getCardsByBoard,
  deleteCard,
  updateCard,
  moveCard,
} from "../controllers/cards.controller";

const router = Router();

router.post("/", createCard);
router.get("/:boardId", getCardsByBoard);
router.delete("/:id", deleteCard);
router.patch("/:id", updateCard);
router.patch("/:id/move", moveCard);

export default router;
