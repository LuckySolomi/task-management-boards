import { Router } from "express";
import { createBoard, getBoard } from "../controllers/boards.controller";

const router = Router();

router.post("/", createBoard);
router.get("/:boardId", getBoard);

export default router;
