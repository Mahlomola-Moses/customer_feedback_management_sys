import { Admin, AdminModel } from "../models/Admin";

export class AdminService {
  constructor() {}

  public async getAdmins(
    page: number = 1,
    limit: number = 10
  ): Promise<{ admins: AdminModel[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Admin.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const admins = await Admin.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    return { admins, total, totalPages };
  }

  public async createAdmin(model: AdminModel): Promise<AdminModel> {
    const admin = new Admin(model);
    const results = await admin.save();

    return results;
  }
}
