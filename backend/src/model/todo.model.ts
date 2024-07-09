import { Document, Schema, model } from "mongoose";

interface ITodo extends Document {
  user: Schema.Types.ObjectId;
  content: string;
  completed: boolean;
}

const todoSchema = new Schema<ITodo>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Content is required!"],
      minlength: [7, "Todo must be at least 7 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
