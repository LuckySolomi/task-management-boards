import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Card {
  id: string;
  title: string;
  description?: string;
}

interface Column {
  id: string;
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
    addCard(state, action: PayloadAction<{ columnId: string; card: Card }>) {
      const column = state.columns.find(
        (c) => c.id === action.payload.columnId,
      );
      column?.cards.push(action.payload.card);
    },
    updateCard(state, action: PayloadAction<{ columnId: string; card: Card }>) {
      const column = state.columns.find(
        (c) => c.id === action.payload.columnId,
      );
      if (!column) return;
      const index = column.cards.findIndex(
        (c) => c.id === action.payload.card.id,
      );
      if (index !== -1) column.cards[index] = action.payload.card;
    },
    deleteCard(
      state,
      action: PayloadAction<{ columnId: string; cardId: string }>,
    ) {
      const column = state.columns.find(
        (c) => c.id === action.payload.columnId,
      );
      if (!column) return;
      column.cards = column.cards.filter((c) => c.id !== action.payload.cardId);
    },
  },
});

export const { setBoard, addCard, updateCard, deleteCard } = boardSlice.actions;
export default boardSlice.reducer;
