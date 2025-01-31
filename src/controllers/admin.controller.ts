import { Request, Response } from "express";

export class AdminController {
  constructor() {}

  public async getAdmins(req: Request, res: Response): Promise<Response> {
    return res.status(200).send("admin get endpoint");
  }
}
