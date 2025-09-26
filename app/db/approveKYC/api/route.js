import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";

// POST - Approve or decline KYC verification
export async function POST(request) {
  try {
    const { email, status, reason } = await request.json();
    const lowerEmail = email.toLowerCase();

    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update KYC status
    user.kycStatus = status;
    user.kycApprovedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Add notification
    if (status === "approved") {
      user.notifications.push({
        id: crypto.randomUUID(),
        method: "success",
        type: "verification",
        message:
          "Your KYC verification has been approved! You can now make withdrawals.",
        date: Date.now(),
      });
    } else if (status === "declined") {
      user.notifications.push({
        id: crypto.randomUUID(),
        method: "failure",
        type: "verification",
        message: `Your KYC verification has been declined. ${
          reason || "Please contact support for more information."
        }`,
        date: Date.now(),
      });
    }

    user.isReadNotifications = false;
    await user.save();

    // Send email notification to user
    const transporter = nodemailer.createTransporter({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailSubject =
      status === "approved"
        ? "KYC Verification Approved - Future Capital Market"
        : "KYC Verification Declined - Future Capital Market";

    const emailContent =
      status === "approved"
        ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">KYC Verification Approved</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">🎉 Congratulations!</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello ${
              user.name
            },</p>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">
              Great news! Your KYC (Know Your Customer) verification has been successfully approved. 
              You now have full access to all platform features including withdrawals.
            </p>
            <div style="background: #d1fae5; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="font-weight: 600; color: #065f46; margin-bottom: 8px; font-size: 14px;">✅ Verification Complete</div>
              <div style="color: #065f46; font-size: 14px; line-height: 1.5;">
                Your identity has been verified and you can now make withdrawals from your account.
              </div>
            </div>
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">
              Thank you for completing the verification process. If you have any questions, please don't hesitate to contact our support team.
            </p>
          </div>
          <div style="background: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Future Capital Market. All rights reserved.</p>
          </div>
        </div>
      `
        : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">KYC Verification Declined</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Verification Declined</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello ${
              user.name
            },</p>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">
              We regret to inform you that your KYC (Know Your Customer) verification has been declined. 
              ${reason || "Please ensure all documents are clear and valid."}
            </p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="font-weight: 600; color: #dc2626; margin-bottom: 8px; font-size: 14px;">⚠️ Action Required</div>
              <div style="color: #dc2626; font-size: 14px; line-height: 1.5;">
                Please contact our support team to resubmit your verification documents or for more information about the decline reason.
              </div>
            </div>
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">
              You can resubmit your KYC verification at any time. Please ensure all documents are clear, valid, and match your account information.
            </p>
          </div>
          <div style="background: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Future Capital Market. All rights reserved.</p>
          </div>
        </div>
      `;

    const mailOptions = {
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: email,
      subject: emailSubject,
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: `KYC verification ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating KYC status:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
