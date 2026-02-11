import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addCardThunk } from "./cardsThunks";

interface BackendCard {
  _id: string;
  boardId: string;
  column: "todo" | "inprogress" | "done";
  title: string;
  description?: string;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  column: "todo" | "inprogress" | "done";
}

interface Column {
  id: "todo" | "inprogress" | "done";
  title: string;
  cards: Card[];
}

interface BoardState {
  boardId: string;
  name: string;
  columns: Column[];
}

const initialState: BoardState = {
  boardId: "",
  name: "",
  columns: [
    { id: "todo", title: "ToDo", cards: [] },
    { id: "inprogress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<{ boardId: string; name: string }>) {
      state.boardId = action.payload.boardId;
      state.name = action.payload.name;
    },

    setCards(state, action: PayloadAction<BackendCard[]>) {
      state.columns.forEach((col) => {
        col.cards = [];
      });

      action.payload.forEach((card) => {
        const column = state.columns.find((c) => c.id === card.column);

        if (column) {
          column.cards.push({
            id: card._id,
            title: card.title,
            description: card.description,
            column: card.column,
          });
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(addCardThunk.fulfilled, (state, action) => {
      const newCard: BackendCard = action.payload;

      const column = state.columns.find((c) => c.id === newCard.column);

      if (column) {
        column.cards.push({
          id: newCard._id,
          title: newCard.title,
          description: newCard.description,
          column: newCard.column,
        });
      }
    });
  },
});

export const { setBoard, setCards } = boardSlice.actions;
export default boardSlice.reducer;
