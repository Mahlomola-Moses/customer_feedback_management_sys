import { Feedback, FeedbackModel } from "../models/Feedback";
import { SendMailService } from "./send-mail.service";
import { User } from "../models/User";

export class FeedbackService {
  constructor() {}

  public async createfeedback(model: FeedbackModel): Promise<FeedbackModel> {
    const feedback = new Feedback(model);
    const results = await feedback.save();
    if (results) {
      const adminEmails = await this.getAdminEmails();
      await new SendMailService().sendEmail(
        adminEmails.length ? adminEmails.join(", ") : "superadmin@yopmail.com",
        "Customer Feedback ",
        this.getFeedbackTemplate(model.name, model.email, model.message)
      );
    }

    return results;
  }
  public async getfeedbacks(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    feedbacks: FeedbackModel[];
    total: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Feedback.countDocuments();
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated data
    const feedbacks = await Feedback.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    return { feedbacks, total, totalPages };
  }

  private async getAdminEmails(): Promise<string[]> {
    const admins = await User.find({ type: "admin" }).select("email -_id");
    return admins.map((admin) => admin.email);
  }
  // Fetch all

  private getFeedbackTemplate(
    customerName: string,
    customerEmail: string,
    feedbackMessage: string
  ): string {
    return `
      <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Feedback</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    
        <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; 
                    border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
            
            <!-- Header -->
            <div style="background-color: #0073e6; color: white; text-align: center; padding: 20px; font-size: 24px;">
                Customer Feedback Received
            </div>

            <!-- Content -->
            <div style="padding: 20px; line-height: 1.6; color: #333;">
                <p style="margin: 10px 0;">Dear Admin,</p>
                <p style="margin: 10px 0;">You have received a new customer feedback submission. Below are the details:</p>

                <p style="margin: 10px 0;"><strong>Customer Name:</strong> ${customerName}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> ${customerEmail}</p>
                

                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0073e6; 
                            margin-top: 10px; font-style: italic;">
                    "${feedbackMessage}"
                </div>

                <p style="margin: 10px 0;">Thank you for reviewing the feedback.</p>
            </div>

            <!-- Footer -->
            
        </div>

    </body>
    </html>
  `;
  }
}
