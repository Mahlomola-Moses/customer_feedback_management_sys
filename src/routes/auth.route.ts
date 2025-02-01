import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

export class authRoutes {
  private router: Router;
  private authController: AuthController;
  constructor(router: Router) {
    this.router = router;
    this.authController = new AuthController();
    this.initRoutes();
  }

  private initRoutes(): void {
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: login endpoint
     *     tags: [auth]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: successfully logged in
     *       500:
     *         description: Error logging in
     */
    this.router.post("/auth/login", async (req: Request, res: Response) => {
      await this.authController.login(req, res);
    });
  }
}
