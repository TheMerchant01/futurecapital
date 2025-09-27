import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getDepositConfirmationTemplate } from "../../../lib/emailTemplates";
import { randomUUID } from "crypto";

export async function POST(request) {
  const { email, amount, name, type } = await request.json();

  // Create a Nodemailer transporter with your email credentials
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

  try {
    // Send the email
    await transporter.sendMail({
      from: "Future Capital Market <support@futurecapitalmarket.com>",
      to: email,
      subject: `${type} - Future Capital Market`,
      text: `${type}: ${amount} from ${name}`,
      html: getDepositConfirmationTemplate(
        amount,
        "Deposit",
        randomUUID(),
        name,
        "success"
      ),
    });

    return new NextResponse({
      status: 200,
      body: "Deposit confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Error while sending email:", error);
    return new NextResponse({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
