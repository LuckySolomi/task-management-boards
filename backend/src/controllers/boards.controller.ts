import { Request, Response } from "express";
import {
  createBoardService,
  getBoardService,
} from "../services/boards.service";

export const createBoard = async (req: Request, res: Response) => {
  const { name } = req.body;

  const board = await createBoardService(name);

  res.json(board);
};

export const getBoard = async (req: Request, res: Response) => {
  const board = await getBoardService(req.params.boardId as string);

  res.json(board);
};
