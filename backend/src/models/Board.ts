import { Schema, model } from "mongoose";

const BoardSchema = new Schema(
  {
    boardId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const Board = model("Board", BoardSchema);
