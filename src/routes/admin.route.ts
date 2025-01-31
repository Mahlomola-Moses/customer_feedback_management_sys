import { Router, Request, Response } from "express";
import { AdminController } from "../controllers/admin.controller";

export class AdminRoutes {
  private router: Router;
  private adminController: AdminController;
  constructor(router: Router) {
    this.router = router;
    this.adminController = new AdminController();
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
     *
     *       500:
     *         description: Error fetching admins
     */

    this.router.get("/admin", async (req: Request, res: Response) => {
      await this.adminController.getAdmins(req, res);
    });
  }
}
