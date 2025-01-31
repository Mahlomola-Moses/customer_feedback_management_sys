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
     *     summary: get list of admins added in the application
     *     tags: [Admin]
     *     requestBody:
     *       required: false
     *     responses:
     *       200:
     *         description: admins fetched successfully
     *       500:
     *         description: Error fetching admin
     */
    this.router.get("/admin", async (req: Request, res: Response) => {
      await this.adminController.getAdmins(req, res);
    });
  }
}
