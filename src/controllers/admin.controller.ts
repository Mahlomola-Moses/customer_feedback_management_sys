import { Request, Response } from "express";

import { AdminService } from "../services/admin.service";

export class AdminController {
  private adminService: AdminService;
  constructor() {
    this.adminService = new AdminService();
  }

  public async getAdmins(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const results = await this.adminService.getAdmins(page, limit);
      return res.status(200).json(results);
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }

  public async createAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const results = await this.adminService.createAdmin(req.body);
      return res
        .status(201)
        .json({ results, message: "Admin created successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.stack });
    }
  }
}
