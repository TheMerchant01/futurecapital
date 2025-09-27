import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { getPasswordResetTemplate } from "../../../lib/emailTemplates";

export async function POST(request) {
  try {
    console.log("Forgot Password Request Started", {
      timestamp: new Date().toISOString(),
    });

    const { email } = await request.json();
    const lowerEmail = email.toLowerCase();
    console.log("Processing request for email:", { email: lowerEmail });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lowerEmail)) {
      console.error("Invalid email format", { email: lowerEmail });
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Find user
    const user = await UserModel.findOne({ email: lowerEmail });
    if (!user) {
      console.error("No user found", { email: lowerEmail });
      return NextResponse.json(
        { message: "No user found with this email" },
        { status: 404 }
      );
    }
    console.log("User found", { userId: user._id, email: lowerEmail });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    console.log("Reset token generated", {
      userId: user._id,
      expiresAt: new Date(resetPasswordExpires).toISOString(),
    });

    // Update user with reset token
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();
    console.log("User updated with reset token", { userId: user._id });

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    console.log("Verifying SMTP connection...");
    await transporter.verify().catch((error) => {
      console.error("SMTP verification failed", {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      throw new Error(`SMTP configuration error: ${error.message}`);
    });
    console.log("SMTP connection verified successfully");

    // Email template
    const resetUrl = `https://www.futurecapitalmarket.com/reset-password?token=${resetToken}&email=${lowerEmail}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: lowerEmail,
      subject: "Password Reset Request - Future Capital Market",
      html: getPasswordResetTemplate(resetUrl, user.firstName || "User"),
      headers: {
        "X-Debug-Trace": `Reset-Request-${Date.now()}`,
      },
    };

    // Send email
    console.log("Attempting to send email", {
      to: lowerEmail,
      from: process.env.EMAIL_USER,
    });
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      timestamp: new Date().toISOString(),
    });

    if (info.rejected.length > 0) {
      console.error("Email rejected by SMTP server", {
        rejected: info.rejected,
        response: info.response,
        timestamp: new Date().toISOString(),
      });
      throw new Error(
        `Email rejected by SMTP server: ${info.rejected.join(", ")}`
      );
    }

    return NextResponse.json(
      {
        message: "Password reset link sent to your email",
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password Error", {
      message: error.message,
      stack: error.stack,
      email: lowerEmail || "unknown",
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      {
        message: "Failed to send password reset email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
