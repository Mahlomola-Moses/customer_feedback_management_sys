import { Schema, model, Document } from "mongoose";

export interface AdminModel {
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

interface IAdmin extends AdminModel, Document {}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

export const Admin = model<IAdmin>("Admin", adminSchema);
