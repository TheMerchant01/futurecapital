import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getCustomEmailTemplate } from "../../../../lib/emailTemplates";

export async function POST(request) {
  const { emailData } = await request.json();

  try {
    console.log(emailData);
    await sendEmail(emailData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function sendEmail(emailData) {
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
    from: `Future Capital Market <support@futurecapitalmarket.com>`,
    to: emailData.recipientEmail,
    subject: `${emailData.heading} - Future Capital Market`,
    html: getCustomEmailTemplate(emailData.heading, emailData.content, "User"),
  });
}
