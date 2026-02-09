import { Request, Response } from "express";
import {
  createCardService,
  getCardsByBoardService,
  deleteCardService,
  updateCardService,
  moveCardService,
} from "../services/cards.service";

export const createCard = async (req: Request, res: Response) => {
  const { boardId, column, title, description } = req.body;

  const card = await createCardService(boardId, column, title, description);

  res.json(card);
};

export const getCardsByBoard = async (req: Request, res: Response) => {
  const cards = await getCardsByBoardService(req.params.boardId as string);
  res.json(cards);
};

export const deleteCard = async (req: Request, res: Response) => {
  await deleteCardService(req.params.id as string);
  res.json({ success: true });
};

export const updateCard = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const card = await updateCardService(
    req.params.id as string,
    title,
    description,
  );

  res.json(card);
};

export const moveCard = async (req: Request, res: Response) => {
  const { column, order } = req.body;

  const card = await moveCardService(req.params.id as string, column, order);

  res.json(card);
};
