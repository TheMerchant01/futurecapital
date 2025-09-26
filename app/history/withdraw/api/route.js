import { NextResponse } from "next/server";
import nodemailer from "nodemailer"; // ✅ Add this line
import UserModel from "../../../../mongodbConnect";

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

    // Get current date
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Create withdrawal entry
    const withdrawalEntry = {
      id,
      dateAdded: currentDate,
      withdrawMethod,
      withdrawalAccount,
      amount,
      transactionStatus,
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
      subject: "Withdrawal Confirmation",
      html: `
        <p>Hello,</p>
        <p>Your withdrawal request of <strong>$${amount}</strong> using <strong>${withdrawMethod}</strong> on <strong>${currentDate}</strong> has been submitted.</p>
        <p>Please check your account dashboard for status updates.</p>
        <p>Thank you for using our platform!</p>
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
