import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";
import nodemailer from "nodemailer";

export async function POST(request) {
  const { email, transactionId, newStatus, amount, name } =
    await request.json();
  const transporter = nodemailer.createTransport({
    service: "Hostinger",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define the email content
  const mailOptions = {
    from: "Future Capital Market <support@futurecapitalmarket.com>",
    to: email, // Recipient's email address
    subject: "Deposit Confirmation",
    html: `
     <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Confirmation</title>
    <style>
        /* Reset some default styles */
        body, h1 {
            margin: 0;
            padding: 0;
        }

        /* Styles for the email body */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        /* Styles for the email container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Header styles */
        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        /* Title styles */
        h1 {
            color: #333;
            font-size: 24px;
        }

        /* Body text styles */
        .body-text {
            font-size: 16px;
            margin-top: 20px;
        }

        /* Amount styles */
        .amount {
            font-size: 20px;
            font-weight: bold;
            color: #007bff; /* Blue color for amount */
        }

        /* Footer styles */
        .footer {
            text-align: center;
            margin-top: 30px;
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Deposit Confirmation</h1>
        </div>
        <p>Dear ${name},</p>
        <p>Your deposit of <span class="amount">$${amount}</span> has been successfully received.</p>
        <p>Thank you for choosing our services.</p>
       
        <div class="footer">
            <p>If you have any questions or need assistance, please <a href="#">contact us</a>.</p>
        </div>
    </div>
</body>
</html>

    `,
  };
  try {
    // Find the user and the specific withdrawal record
    const updatedUser = await UserModel.findOneAndUpdate(
      { email, "depositHistory.id": transactionId },
      {
        $set: {
          "depositHistory.$.transactionStatus": newStatus,
          isReadNotifications: false,
        },
        ...(newStatus === "success" && {
          $inc: {
            tradingBalance: amount,
            totalDeposited: amount,
          },
          $push: {
            notifications: {
              id: crypto.randomUUID(),
              method: "success",
              type: "transaction",
              message: `Your deposit of $${amount} has been successfully processed and your balance topped up.`,
              date: Date.now(),
            },
          },
        }),
        ...(newStatus === "failed" && {
          $push: {
            notifications: {
              id: crypto.randomUUID(),
              method: "failure",
              type: "transaction",
              message: `Your deposit of $${amount} has failed. Contact customer support for help.`,
              date: Date.now(),
            },
          },
        }),
      },
      {
        new: true, // Return the updated document
      }
    );
    if (newStatus === "success") {
      await transporter.sendMail(mailOptions);
    }
    if (!updatedUser) {
      return new NextResponse({
        status: 404,
        body: "User or withdrawal record not found",
      });
    }

    return new NextResponse({
      status: 200,
      body: "Transaction status updated successfully",
    });
  } catch (error) {
    console.error("Error while updating transaction status:", error);
    return new NextResponse({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
