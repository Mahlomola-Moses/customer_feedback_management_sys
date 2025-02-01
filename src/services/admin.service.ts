import { User, UserModel } from "../models/User";
import bcrypt from "bcryptjs";
export class AdminService {
  constructor() {}

  public async getAdmins(
    page: number = 1,
    limit: number = 10
  ): Promise<{ admins: UserModel[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    // Get total count
    const total = await User.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const admins = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    return { admins, total, totalPages };
  }

  public async createAdmin(model: UserModel): Promise<UserModel> {
    model.type = "admin";
    model.password = await this.hashString(model.password);
    const admin = new User(model);
    const results = await admin.save();

    return results;
  }

  public async deleteAdmin(id: string): Promise<void> {
    const results = await User.findByIdAndDelete(id);
  }

  private async hashString(str: string): Promise<string> {
    return await bcrypt.hash(str, 10);
  }
}
