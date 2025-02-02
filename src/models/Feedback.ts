import { Schema, model, Document } from "mongoose";

export interface FeedbackModel {
  name: string;
  email: string;
  message: string;
  createdAt?: Date;
}

interface IFeedback extends FeedbackModel, Document {}

const feedbackSchema = new Schema<IFeedback>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
