import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema: Schema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITodo>("Todo", TodoSchema);
