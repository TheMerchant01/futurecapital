import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";
import nodemailer from "nodemailer";
import { getDepositConfirmationTemplate } from "../../../../../lib/emailTemplates";
import { randomUUID } from "crypto";

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
    subject: "Deposit Confirmation - Future Capital Market",
    html: getDepositConfirmationTemplate(
      amount,
      "Deposit",
      transactionId,
      name,
      newStatus
    ),
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
              id: randomUUID(),
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
              id: randomUUID(),
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
