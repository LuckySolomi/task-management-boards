import { Board } from "../models/Board";

export const createBoardService = async (name: string) => {
  const boardId = Math.random().toString(36).substring(2, 8);

  const board = await Board.create({
    name,
    boardId,
  });

  return board;
};

export const getBoardService = async (boardId: string) => {
  return Board.findOne({ boardId });
};
