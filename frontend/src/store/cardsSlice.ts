import { createSlice } from "@reduxjs/toolkit";
import { addCardThunk } from "./cardsThunks";

interface Card {
  _id: string;
  boardId: string;
  column: string;
  title: string;
  description?: string;
}

const initialState: Card[] = [];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (_, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCardThunk.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
