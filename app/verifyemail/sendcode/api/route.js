import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import nodemailer from "nodemailer";

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
    subject: "Email Verification",
    text: `Your verification code is: ${code}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        /* Styles for the email body */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        /* Styles for the email container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Header styles */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        /* Verification code styles */
        .verification-code {
            font-size: 36px;
            font-weight: bold;
            color: #007bff; /* Blue color for code */
            text-align: center;
        }

        /* Body text styles */
        .body-text {
            font-size: 16px;
            margin-top: 20px;
        }

        /* Button styles */
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 20px;
        }

        /* Footer styles */
        .footer {
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <p>Hello,</p>
        <p>Your email address is important to us. To complete your registration, please use the following verification code:</p>
        <div class="verification-code">
          
            ${code}
        </div>
        <p>If you didn't request this verification code, please ignore this email. Your code is valid for the next 10 minutes.</p>
        <p>Thank you for using our service!</p>

        <div class="footer">
            <p>If you have any questions or need assistance, please <a href="#">contact us</a>.</p>
        </div>
    </div>
</body>
</html>
`,
  });
}
