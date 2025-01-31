import { Router, Request, Response } from "express";

export class AdminRoutes {
  private router: Router;
  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/admin", async (req: Request, res: Response) => {
      res.status(200).send("admin get endpoint");
    });
  }
}
