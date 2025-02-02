import { Router, Request, Response } from "express";
import { FeedbackController } from "../controllers/feedback.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ValidateRequestMiddleware } from "../middleware/validate-request.middleware";
import { feedbackValidationSchema } from "../validations/feedback.validation";

export class FeedbackRoutes {
  private router: Router;
  private feedbackController: FeedbackController;
  private authMiddleware: AuthMiddleware;
  private validateRequestMiddleware: ValidateRequestMiddleware;

  constructor(router: Router) {
    this.router = router;
    this.feedbackController = new FeedbackController();
    this.authMiddleware = new AuthMiddleware();
    this.validateRequestMiddleware = new ValidateRequestMiddleware();
    this.initRoutes();
  }

  private initRoutes(): void {
    /**
     * @swagger
     * /feedback:
     *   get:
     *     summary: Get list of feedbacks
     *     tags: [feedback]
     *     parameters:
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *           default: 1
     *         description: Page number for pagination (optional)
     *       - in: query
     *         name: limit
     *         schema:
     *           type: integer
     *           default: 10
     *         description: Number of feedbacks per page (optional)
     *     responses:
     *       200:
     *         description: feedbacks fetched successfully
     *       401:
     *         description: Unauthorised, token is missing or invalid
     *       500:
     *         description: Error fetching feedbacks
     */
    this.router.get(
      "/feedback",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      async (req: Request, res: Response) => {
        await this.feedbackController.getfeedbacks(req, res);
      }
    );
    /**
     * @swagger
     * /feedback:
     *   post:
     *     summary: Add a new feedback (feedback only)
     *     tags: [feedback]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                type: string
     *               email:
     *                 type: string
     *               message:
     *                 type: string
     *     responses:
     *       201:
     *         description: feedback added successfully
     *       500:
     *         description: Error adding feedback
     */
    this.router.post(
      "/feedback",
      this.validateRequestMiddleware
        .validateRequest(feedbackValidationSchema)
        .bind(this.validateRequestMiddleware),
      async (req: Request, res: Response) => {
        await this.feedbackController.createfeedback(req, res);
      }
    );
  }
}
