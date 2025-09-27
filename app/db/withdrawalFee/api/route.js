import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";
import { getDepositConfirmationTemplate } from "../../../../lib/emailTemplates";
import { randomUUID } from "crypto";

// POST - Create withdrawal fee payment request
export async function POST(request) {
  try {
    const { email, amount, withdrawalId, paymentMethod } = await request.json();
    const lowerEmail = email.toLowerCase();

    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is KYC approved
    if (user.kycStatus !== "approved") {
      return NextResponse.json(
        {
          success: false,
          message: "KYC verification required before withdrawal",
        },
        { status: 400 }
      );
    }

    // Create withdrawal fee payment entry
    const feePaymentId = randomUUID();
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const feePaymentEntry = {
      id: feePaymentId,
      withdrawalId: withdrawalId,
      amount: amount,
      paymentMethod: paymentMethod,
      dateAdded: currentDate,
      status: "pending",
      type: "withdrawal_fee",
    };

    // Add to withdrawal fee history
    user.withdrawalFeeHistory.push(feePaymentEntry);
    await user.save();

    // Send email to admin about fee payment
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: "support@futurecapitalmarket.com",
      subject: "Withdrawal Fee Payment Request - Future Capital Market",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">Withdrawal Fee Payment Request</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Fee Payment Verification Required</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello Admin,</p>
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pending Verification</span>
              </div>
              <div style="font-size: 32px; font-weight: 700; color: #059669; text-align: center; margin: 16px 0;">$${amount}</div>
              <div style="display: grid; gap: 12px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">User Name</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${
                    user.name
                  }</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Email</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${email}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Payment Method</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${paymentMethod}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Withdrawal ID</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${withdrawalId}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Date</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${currentDate}</span>
                </div>
              </div>
            </div>
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">Please verify the withdrawal fee payment and approve or decline accordingly.</p>
          </div>
          <div style="background: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Future Capital Market. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Withdrawal fee payment request created",
      feePaymentId: feePaymentId,
    });
  } catch (error) {
    console.error("Error creating withdrawal fee payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
