import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // ✅ Add this line
import UserModel from "../../../mongodbConnect";
import { getWithdrawalConfirmationTemplate } from "../../../lib/emailTemplates";

export async function POST(request) {
  const {
    email,
    withdrawMethod,
    withdrawalAccount,
    amount,
    transactionStatus,
  } = await request.json();

  const lowerEmail = email.toLowerCase();
  const id = crypto.randomUUID();

  try {
    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Check KYC status
    if (user.kycStatus !== "approved") {
      return NextResponse.json({
        success: false,
        message:
          "KYC verification required before withdrawal. Please complete KYC verification first.",
      });
    }

    // Get current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Calculate withdrawal fee as 10% of the withdrawal amount
    const withdrawalFee = Math.round(parseFloat(amount) * 0.1 * 100) / 100; // Round to 2 decimal places

    // Create withdrawal entry
    const withdrawalEntry = {
      id,
      dateAdded: currentDate,
      withdrawMethod,
      withdrawalAccount,
      amount,
      transactionStatus: "pending_fee", // New status for fee payment required
      withdrawalFee: withdrawalFee,
      feePaid: false,
    };

    // Push and save
    user.withdrawalHistory.push(withdrawalEntry);
    await user.save();

    // ✅ Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: email,
      subject:
        "Withdrawal Request - Fee Payment Required - Future Capital Market",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Withdrawal Request - Fee Payment Required</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Withdrawal Fee Payment Required</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello ${
              user.name
            },</p>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">
              Your withdrawal request has been received. To process your withdrawal, please pay the required withdrawal fee.
            </p>
            
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">Fee Payment Required</span>
              </div>
              
              <div style="display: grid; gap: 12px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Withdrawal Amount</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">$${amount}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Withdrawal Method</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${withdrawMethod}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Withdrawal Fee</span>
                  <span style="font-weight: 600; color: #dc2626; font-size: 14px;">$${withdrawalFee}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Transaction ID</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${id}</span>
                </div>
              </div>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="font-weight: 600; color: #92400e; margin-bottom: 8px; font-size: 14px;">💰 Payment Required</div>
              <div style="color: #92400e; font-size: 14px; line-height: 1.5;">
                Please pay the withdrawal fee of $${withdrawalFee} using the same crypto payment methods available for deposits. 
                Your withdrawal will be processed once the fee payment is approved by our team.
              </div>
            </div>
            
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">
              You can make the fee payment through your dashboard. Once approved, your withdrawal will be processed within 1-3 business days.
            </p>
          </div>
          <div style="background: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Future Capital Market. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Don't block response even if email fails
    }

    return NextResponse.json({
      success: true,
      message: user.withdrawalHistory,
      id,
      date: currentDate,
    });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
}
