import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";
import { getDepositConfirmationTemplate } from "../../../../lib/emailTemplates";
import { randomUUID } from "crypto";

// POST - Create KYC payment request
export async function POST(request) {
  try {
    const { email, amount, paymentMethod } = await request.json();
    const lowerEmail = email.toLowerCase();

    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has pending KYC
    if (user.kycStatus !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "No pending KYC verification found",
        },
        { status: 400 }
      );
    }

    // Check if KYC fee is already paid
    if (user.kycFeePaid) {
      return NextResponse.json(
        {
          success: false,
          message: "KYC fee has already been paid",
        },
        { status: 400 }
      );
    }

    // Create KYC payment entry
    const paymentId = randomUUID();
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const kycPaymentEntry = {
      id: paymentId,
      amount: amount,
      paymentMethod: paymentMethod,
      dateAdded: currentDate,
      status: "pending",
      type: "kyc_fee",
    };

    // Add to KYC payment history (create new field if it doesn't exist)
    if (!user.kycPaymentHistory) {
      user.kycPaymentHistory = [];
    }
    user.kycPaymentHistory.push(kycPaymentEntry);

    // Mark KYC fee as paid
    user.kycFeePaid = true;
    await user.save();

    // Send email to admin about KYC payment
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
      to: "admin@futurecapitalmarket.com", // Admin email
      subject: `KYC Payment Request - ${user.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">KYC Payment Request</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Payment Details</h3>
            <p><strong>User:</strong> ${user.name} (${user.email})</p>
            <p><strong>Amount:</strong> $${amount}</p>
            <p><strong>Payment Method:</strong> ${paymentMethod}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Date:</strong> ${currentDate}</p>
          </div>
          <p style="color: #6b7280;">
            Please review and approve this KYC payment in the admin dashboard.
          </p>
          <div style="margin-top: 20px;">
            <a href="${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/admin/verification?tab=kyc" 
               style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Review in Admin Dashboard
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: user.email,
      subject: "KYC Payment Submitted - Future Capital Market",
      html: getDepositConfirmationTemplate(
        `KYC Payment of $${amount} via ${paymentMethod}`,
        `Your KYC payment has been submitted successfully. We will process your verification once payment is confirmed.`,
        user.name
      ),
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json({
      success: true,
      message: "KYC payment submitted successfully",
      paymentId: paymentId,
    });
  } catch (error) {
    console.error("Error processing KYC payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
