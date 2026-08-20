import mongoose from "mongoose";

interface IUser {
  username: string;
  fullName: string;
  avatar: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema);
