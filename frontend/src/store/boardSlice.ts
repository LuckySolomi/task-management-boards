import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  addCardThunk,
  deleteCardThunk,
  updateCardThunk,
  moveCardThunk,
} from "./cardsThunks";

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
    updateCard(
      state,
      action: PayloadAction<{
        cardId: string;
        column: string;
        title: string;
        description?: string;
      }>,
    ) {
      const { cardId, column, title, description } = action.payload;

      const col = state.columns.find((c) => c.id === column);
      if (!col) return;

      const card = col.cards.find((c) => c.id === cardId);
      if (!card) return;

      card.title = title;
      card.description = description;
    },

    deleteCard(
      state,
      action: PayloadAction<{ cardId: string; column: string }>,
    ) {
      const { cardId, column } = action.payload;

      const col = state.columns.find((c) => c.id === column);
      if (!col) return;

      col.cards = col.cards.filter((card) => card.id !== cardId);
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
    builder.addCase(updateCardThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.columns.forEach((col) => {
        const card = col.cards.find((c) => c.id === updated._id);
        if (card) {
          card.title = updated.title;
          card.description = updated.description;
        }
      });
    });

    builder.addCase(deleteCardThunk.fulfilled, (state, action) => {
      state.columns.forEach((col) => {
        col.cards = col.cards.filter((c) => c.id !== action.payload);
      });
    });

    builder.addCase(moveCardThunk.fulfilled, (state, action) => {
      const updated = action.payload;

      state.columns.forEach((col) => {
        col.cards = col.cards.filter((c) => c.id !== updated._id);
      });

      const targetColumn = state.columns.find((c) => c.id === updated.column);

      if (targetColumn) {
        targetColumn.cards.push({
          id: updated._id,
          title: updated.title,
          description: updated.description,
          column: updated.column,
        });
      }
    });
  },
});

export const { setBoard, setCards } = boardSlice.actions;
export default boardSlice.reducer;
