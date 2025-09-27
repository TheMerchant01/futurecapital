import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";
import { getVerificationEmailTemplate } from "../../../../lib/emailTemplates";

export async function POST(request) {
  const { email } = await request.json();
  const lowerEmail = email.toLowerCase();
  const verificationCode = generateVerificationCode();
  const codeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

  try {
    await UserModel.updateOne(
      { email: lowerEmail },
      { verificationCode, codeExpiry }
    );
    await sendVerificationEmail(email, verificationCode);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function generateVerificationCode() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
}

async function sendVerificationEmail(email, code) {
  let transporter = nodemailer.createTransport({
    // Transport configuration
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Future Capital Market <support@futurecapitalmarket.com>",
    to: email,
    subject: "Email Verification - Future Capital Market",
    text: `Your verification code is: ${code}`,
    html: getVerificationEmailTemplate(code, "User"),
  });
}
