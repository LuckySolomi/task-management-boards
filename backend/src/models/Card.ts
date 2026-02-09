import { Schema, model } from "mongoose";

const CardSchema = new Schema({
  boardId: { type: String, required: true },
  column: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  order: { type: Number, default: 0 },
});

export const Card = model("Card", CardSchema);
