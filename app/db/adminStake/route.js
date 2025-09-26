import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import UserModel from "../../../mongodbConnect";

// Function to send an email
const sendEmail = async (email, subject, message) => {
  // Replace with your nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "Hostinger",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Future Capital Market <support@futurecapitalmarket.com>",
    to: email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request) {
  const { email, stakeId, newStatus, amount, asset, name } =
    await request.json();

  try {
    // Find the user and the specific withdrawal record
    const updateObj = {
      $set: {
        "stakings.$.status": newStatus,
        "stakings.$.lastPaid": new Date(),
      },
    };

    if (newStatus === "Completed") {
      // If newStatus is "Completed," subtract 'amount' from tradingBalance
      updateObj.$inc = {
        tradingBalance: +amount,
      };
      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "success",
          type: "transaction",
          message: `You have received your final $${amount} from your ${asset} monthly staking returns, your staking period comes to an end.`,
          date: Date.now(),
        },
      };
      // Set isReadNotifications to false
      updateObj.$set = {
        isReadNotifications: false,
      };
    }
    if (newStatus === "Ongoing") {
      // If newStatus is "Completed," subtract 'amount' from tradingBalance
      updateObj.$inc = {
        tradingBalance: +amount,
      };
      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "success",
          type: "trade",
          message: `You have received $${amount} from your ${asset} monthly staking returns.`,
          date: Date.now(),
        },
      };
      // Set isReadNotifications to false
      updateObj.$set = {
        isReadNotifications: false,
        paidStaking: Date.now(),
        lastButtonClick: Date.now(),
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, "stakings.id": stakeId },
      updateObj,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedUser) {
      return new NextResponse({
        status: 404,
        body: "User or withdrawal record not found",
      });
    }

    // Send email based on transaction status
    if (newStatus === "Ongoing") {
      const emailSubject = "Staking Update: Ongoing Staking Process";
      const emailMessage = `
        Dear ${name},\n\n
        We want to inform you that you have received $${amount} from your ${asset} staking in your balance. The staking process is still ongoing.\n\n
        If you have any questions or concerns, feel free to reach out to our support team.\n\n
        Thank you for your trust and cooperation.\n\n
        Best regards,\n
        Future Capital Market Team.
      `;

      await sendEmail(email, emailSubject, emailMessage);
    } else if (newStatus === "Completed") {
      const emailSubject = "Staking Update: Staking Process Completed";
      const emailMessage = `
        Dear ${name},\n\n
        Congratulations! We are pleased to inform you that you've received your final ROI of ${amount} from your ${asset} staking.\n\n Congratulations!!! 🎉🎉 \n Your staking process has come to an end.\n\n
        We appreciate your participation, and if you have any further inquiries, please don't hesitate to contact us.\n\n
        Thank you for your trust and cooperation.\n\n
        Best regards,\n
        Future Capital Market Team.
      `;

      await sendEmail(email, emailSubject, emailMessage);
    }

    // UI Response
    const successMessage =
      newStatus === "Completed"
        ? "Staking process completed successfully. An email notification has been sent."
        : "Transaction status updated successfully. An email notification has been sent.";

    return new NextResponse({
      status: 200,
      body: successMessage,
    });
  } catch (error) {
    console.error("Error while updating transaction status:", error);
    return new NextResponse({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
