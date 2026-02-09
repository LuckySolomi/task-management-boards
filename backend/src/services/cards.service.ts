import { Card } from "../models/Card";

export const createCardService = async (
  boardId: string,
  column: string,
  title: string,
  description: string,
) => {
  return Card.create({
    boardId,
    column,
    title,
    description,
    order: 0,
  });
};

export const getCardsByBoardService = async (boardId: string) => {
  return Card.find({ boardId }).sort({ order: 1 });
};

export const deleteCardService = async (cardId: string) => {
  return Card.findByIdAndDelete(cardId);
};

export const updateCardService = async (
  cardId: string,
  title: string,
  description: string,
) => {
  return Card.findByIdAndUpdate(cardId, { title, description }, { new: true });
};

export const moveCardService = async (
  cardId: string,
  column: string,
  order: number,
) => {
  return Card.findByIdAndUpdate(cardId, { column, order }, { new: true });
};
