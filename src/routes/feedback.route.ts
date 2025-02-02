import { Router, Request, Response } from "express";

export class FeedbackRoutes {
  private router: Router;

  constructor(router: Router) {
    this.router = router;
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

      async (req: Request, res: Response) => {
        res.status(200).json({ message: "Feedback fetched successfully" });
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

      async (req: Request, res: Response) => {
        res.status(201).json({ message: "Feedback submitted successfully" });
      }
    );
  }
}
