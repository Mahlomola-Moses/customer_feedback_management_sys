import { Request, Response } from "express";

export class feedbackController {
  constructor() {}

  public async getfeedbacks(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      return res.status(200).json([]);
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }

  public async createfeedback(req: Request, res: Response): Promise<Response> {
    try {
      return res
        .status(201)
        .json({ data: [], message: "feedback created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }
}
