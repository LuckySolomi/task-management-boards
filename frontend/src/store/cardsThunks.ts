import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCard, updateCard } from "../api/boardAPI";

export const addCardThunk = createAsyncThunk(
  "cards/add",
  async ({
    boardId,
    column,
  }: {
    boardId: string;
    column: "todo" | "inprogress" | "done";
  }) => {
    return createCard({
      boardId,
      column,
      title: "New card",
      description: "",
    });
  },
);

export const updateCardThunk = createAsyncThunk(
  "cards/update",
  async ({
    boardId,
    title,
    description,
  }: {
    boardId: string;
    title?: string;
    description?: string;
  }) => {
    return updateCard(boardId, { title, description });
  },
);

export const deleteCardThunk = createAsyncThunk(
  "cards/delete",
  async (boardId: string) => {
    await fetch(`http://localhost:5000/cards/${boardId}`, {
      method: "DELETE",
    });
    return boardId;
  },
);
