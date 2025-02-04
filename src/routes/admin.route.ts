import { Router, Request, Response } from "express";
import { AdminController } from "../controllers/admin.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { ValidateRequestMiddleware } from "../middleware/validate-request.middleware";
import { adminValidationSchema } from "../validations/admin.validation";

export class AdminRoutes {
  private router: Router;
  private adminController: AdminController;
  private authMiddleware: AuthMiddleware;
  private validateRequestMiddleware: ValidateRequestMiddleware;
  constructor(router: Router) {
    this.router = router;
    this.adminController = new AdminController();
    this.authMiddleware = new AuthMiddleware();
    this.validateRequestMiddleware = new ValidateRequestMiddleware();
    this.initRoutes();
  }

  private initRoutes(): void {
    /**
     * @swagger
     * /admin:
     *   get:
     *     summary: Get list of admins added in the application
     *     tags: [Admin]
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
     *         description: Number of admins per page (optional)
     *     responses:
     *       200:
     *         description: Admins fetched successfully
     *       401:
     *         description: Unauthorised, token is missing or invalid
     *       500:
     *         description: Error fetching admins
     */

    this.router.get(
      "/admin",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      async (req: Request, res: Response) => {
        await this.adminController.getAdmins(req, res);
      }
    );

    /**
     * @swagger
     * /admin:
     *   post:
     *     summary: Add a new admin (Admin only)
     *     tags: [Admin]
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
     *               lastname:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         description: Admin added successfully
     *       401:
     *         description: Unauthorised, token is missing or invalid
     *       500:
     *         description: Error adding admin
     */
    this.router.post(
      "/admin",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      this.validateRequestMiddleware
        .validateRequest(adminValidationSchema)
        .bind(this.validateRequestMiddleware),
      async (req: Request, res: Response) => {
        await this.adminController.createAdmin(req, res);
      }
    );

    /**
     * @swagger
     * /admin/{id}:
     *   delete:
     *     summary: Delete an admin by ID (Admin only)
     *     tags: [Admin]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The ID of the admin to delete
     *     responses:
     *       200:
     *         description: Admin deleted successfully
     *       401:
     *         description: Unauthorized, token is missing or invalid
     *       500:
     *         description: Internal server error
     */
    this.router.delete(
      "/admin/:id",
      this.authMiddleware.authenticate.bind(this.authMiddleware),
      async (req: Request, res: Response) => {
        await this.adminController.deleteAdmin(req, res);
      }
    );
  }
}
