import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
      subject: type,
      text: `${type}: ${amount} from ${name}`,
      html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${type}</title>
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

          /* Deposit details styles */
          .deposit-details {
              font-size: 24px;
              font-weight: bold;
              color: #007bff; /* Blue color for deposit details */
              text-align: center;
              margin-top: 20px;
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
              <h1>${type}</h1>
          </div>
          <p>Hello ${name},</p>
          <p>Your transaction of <strong>${amount}</strong> has been successfully approved. Below are the details:</p>
          <div class="deposit-details">
              Amount: <strong>${amount}</strong><br>
              User: <strong>${name}</strong>
          </div>
          <p>If you have any questions or need further assistance, please don't hesitate to reach out.</p>
          <p>Thank you for using Future Capital Market!</p>

          <div class="footer">
              <p>If you have any questions or need assistance, please <a href="#">contact us</a>.</p>
          </div>
      </div>
  </body>
  </html>
  `,
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
