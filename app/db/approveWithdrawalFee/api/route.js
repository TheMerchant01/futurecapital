import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";
import { getWithdrawalConfirmationTemplate } from "../../../../lib/emailTemplates";

// POST - Approve or decline withdrawal fee payment
export async function POST(request) {
  try {
    const { email, feePaymentId, status, withdrawalId } = await request.json();
    const lowerEmail = email.toLowerCase();

    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Find the fee payment entry
    const feePayment = user.withdrawalFeeHistory.find(
      (fee) => fee.id === feePaymentId
    );

    if (!feePayment) {
      return NextResponse.json(
        { success: false, message: "Fee payment not found" },
        { status: 404 }
      );
    }

    // Update fee payment status
    feePayment.status = status;
    feePayment.approvedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // If approved, update the withdrawal status to allow processing
    if (status === "approved") {
      // Find the withdrawal request and update its status
      const withdrawal = user.withdrawalHistory.find(
        (w) => w.id === withdrawalId
      );

      if (withdrawal) {
        withdrawal.feePaid = true;
        withdrawal.feePaymentId = feePaymentId;
      }

      // Add notification
      user.notifications.push({
        id: crypto.randomUUID(),
        method: "success",
        type: "transaction",
        message: `Your withdrawal fee of $${feePayment.amount} has been approved. Your withdrawal is now being processed.`,
        date: Date.now(),
      });
    } else if (status === "declined") {
      // Add notification for declined fee
      user.notifications.push({
        id: crypto.randomUUID(),
        method: "failure",
        type: "transaction",
        message: `Your withdrawal fee payment of $${feePayment.amount} has been declined. Please contact support for assistance.`,
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
        ? "Withdrawal Fee Approved - Future Capital Market"
        : "Withdrawal Fee Declined - Future Capital Market";

    const emailContent =
      status === "approved"
        ? getWithdrawalConfirmationTemplate(
            feePayment.amount,
            feePayment.paymentMethod,
            "Withdrawal Fee Payment",
            feePaymentId,
            user.name,
            "success"
          )
        : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Withdrawal Fee Declined</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Fee Payment Declined</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello ${
              user.name
            },</p>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">
              We regret to inform you that your withdrawal fee payment of $${
                feePayment.amount
              } has been declined. 
              Please contact our support team for assistance with your withdrawal request.
            </p>
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="font-weight: 600; color: #dc2626; margin-bottom: 8px; font-size: 14px;">⚠️ Action Required</div>
              <div style="color: #dc2626; font-size: 14px; line-height: 1.5;">
                Please contact our support team to resolve this issue and complete your withdrawal request.
              </div>
            </div>
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
      message: `Withdrawal fee ${status} successfully`,
    });
  } catch (error) {
    console.error("Error updating withdrawal fee status:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
