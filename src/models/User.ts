import { Schema, model, Document } from "mongoose";

export interface UserModel {
  name: string;
  lastname: string;
  email: string;
  type: string;
  password: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

interface IUser extends UserModel, Document {}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", userSchema);
