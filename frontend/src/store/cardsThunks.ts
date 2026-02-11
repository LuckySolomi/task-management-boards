import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCard } from "../api/boardAPI";

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
