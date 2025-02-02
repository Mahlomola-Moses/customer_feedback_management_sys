import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

export class feedbackController {
  private feedbackService: FeedbackService;
  constructor() {
    this.feedbackService = new FeedbackService();
  }

  public async getfeedbacks(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const results = await this.feedbackService.getfeedbacks(page, limit);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }

  public async createfeedback(req: Request, res: Response): Promise<Response> {
    try {
      const results = await this.feedbackService.createfeedback(req.body);
      return res
        .status(201)
        .json({ results, message: "feedback created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }
}
