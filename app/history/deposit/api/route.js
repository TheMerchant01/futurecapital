import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { email, depositMethod, amount, transactionStatus, name, image } =
    await request.json();
  const lowerEmail = email.toLowerCase();
  const id = crypto.randomUUID();

  try {
    // Search for the user with the provided email
    const user = await UserModel.findOne({ email: lowerEmail });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    // Generate current date in the desired format
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    user.depositHistory.push({
      id,
      dateAdded: currentDate,
      depositMethod,
      amount,
      transactionStatus,
    });

    // Save the changes to the user
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Hostinger",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: email,
      subject: "New Deposit Request - Future Capital Market",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Future Capital Market</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 8px 0 0 0; font-size: 14px;">New Deposit Request</p>
          </div>
          <div style="padding: 32px 24px;">
            <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 20px;">Deposit Verification Required</h2>
            <p style="color: #64748b; margin: 0 0 24px 0; font-size: 16px;">Hello Admin,</p>
            <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 24px 0;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase;">Pending Verification</span>
              </div>
              <div style="font-size: 32px; font-weight: 700; color: #059669; text-align: center; margin: 16px 0;">$${amount}</div>
              <div style="display: grid; gap: 12px; margin: 20px 0;">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">User Name</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${name}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Payment Method</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${depositMethod}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: 500; color: #64748b; font-size: 14px;">Date</span>
                  <span style="font-weight: 600; color: #1e293b; font-size: 14px;">${currentDate}</span>
                </div>
              </div>
            </div>
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">Please verify the deposit and update the transaction status accordingly.</p>
            <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 24px 0;">
              <div style="font-weight: 600; color: #92400e; margin-bottom: 8px; font-size: 14px;">📸 Transaction Screenshot</div>
              <img src="${image}" alt="Transaction Screenshot" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 12px;">
            </div>
            <p style="color: #64748b; margin: 24px 0; font-size: 16px;">🎉 Congrats and more wins! 🥂🎊</p>
          </div>
          <div style="background: #f8fafc; padding: 32px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Future Capital Market. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send the email asynchronously
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    return NextResponse.json({
      success: true,
      message: user,
      id,
      date: currentDate,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred: " + error,
    });
  }
}
