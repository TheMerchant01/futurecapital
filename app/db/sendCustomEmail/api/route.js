import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
    subject: `${emailData.heading}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Content</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #007BFF;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }

        .email-content {
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${emailData.heading}</h1>
        </div>
        <div class="email-content">
            <!-- Email content goes here -->
           ${emailData.content}
        </div>
    </div>
</body>
</html>
`,
  });
}
