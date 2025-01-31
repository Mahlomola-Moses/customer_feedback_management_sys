import { Router, Request, Response } from "express";

export class AdminRoutes {
  private router: Router;
  constructor(router: Router) {
    this.router = router;
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
      res.status(200).send("admin get endpoint");
    });
  }
}
