import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import crypto from "crypto";

export async function POST(request) {
  const { email, tradeId, newStatus, asset, type, price, gain, loss, amount } =
    await request.json();

  try {
    // Find the user and the specific withdrawal record
    const updateObj = {
      $set: {
        "trades.$.status": newStatus, // Update the transactionStatus
        isReadNotifications: false,
      },
    };

    if (newStatus === "Gain") {
      console.log(gain);
      // If newStatus is "Gain," increment totalWon and push a Gain notification
      updateObj.$inc = {
        totalWon: 1,
        tradingBalance: gain,
      };
      updateObj.$push = {
        notifications: {
          $each: [
            {
              id: crypto.randomUUID(),
              method: "success",
              type: "trade",
              message: `Your ${asset} ${type} at ${price} trade hits Gain. Profit of $${gain} has been sent to your balance`,
              date: Date.now(),
            },
          ],
        },
      };
    }

    if (newStatus === "Loss") {
      // If newStatus is "Loss," increment totalLoss and push a Loss notification
      updateObj.$inc = {
        totalLoss: 1,
        tradingBalance: amount - loss,
      };
      updateObj.$push = {
        notifications: {
          $each: [
            {
              id: crypto.randomUUID(),
              method: "failure",
              type: "trade",
              message: `Your ${asset} ${type} at ${price} trade hits a Loss, you lost $${loss} of your $${amount} trade placed. $${
                amount - loss
              } has been sent to your balance`,
              date: Date.now(),
            },
          ],
        },
      };
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email, "trades.id": tradeId },
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
