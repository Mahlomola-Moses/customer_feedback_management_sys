import { Feedback, FeedbackModel } from "../models/Feedback";

export class feedbackService {
  constructor() {}

  public async createfeedback(model: FeedbackModel): Promise<FeedbackModel> {
    const feedback = new Feedback(model);
    const results = await feedback.save();

    return results;
  }
  public async getfeedbacks(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    feedbacks: FeedbackModel[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Feedback.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const feedbacks = await Feedback.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    return { feedbacks, total, totalPages };
  }
}
