import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";
import crypto from "crypto";

export async function POST(request) {
  const { email, transactionId, newStatus, amount, withdrawalAccount } = await request.json();

  try {
    // Find the user and the specific withdrawal record
    const updateObj = {
      $set: {
        "withdrawalHistory.$.transactionStatus": newStatus,
        isReadNotifications: false,
      },
    };

    if (newStatus === "success") {
      // If newStatus is "success," subtract 'amount' from tradingBalance
      updateObj.$inc = {
        totalWithdrawn: amount,
      };

      if (withdrawalAccount == "mainAccount") {
        updateObj.$inc.tradingBalance = -amount;
      } else if (withdrawalAccount == "profit") {
        updateObj.$inc.planBonus = -amount;
      } else if (withdrawalAccount == "totalWon") {
        updateObj.$inc.totalWon = -amount;
      }

      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "success",
          type: "transaction",
          message: `Your withdrawal of $${amount} has been successfully processed.`,
          date: Date.now(),
        },
      };
    } else if (newStatus === "failure") {
      // If newStatus is "failure," push the failure notification
      updateObj.$push = {
        notifications: {
          id: crypto.randomUUID(),
          method: "failure",
          type: "transaction",
          message: `Your withdrawal of $${amount} has failed. Please contact Customer Support.`,
          date: Date.now(),
        },
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, "withdrawalHistory.id": transactionId },
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
