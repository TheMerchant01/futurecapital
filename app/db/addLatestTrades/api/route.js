import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import mongoose from "mongoose";

// Define the POST method to add latest trades
export async function POST(request) {
  const { email, amount, selectedDate, asset, duration, type, entryPrice, lotSize, stopLoss, takeProfit, status } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.error("User not found", { status: 404 });
    }

    // Create a new trade object
    const newTrade = {
      _id: new mongoose.Types.ObjectId(),
      email,
      amount,
      dateAdded: selectedDate,
      asset,
      duration,
      type,
      entryPrice,
      lotSize,
      stopLoss,
      takeProfit,
      status,
    };

    // Add the trade to the latestTrades array
    user.latestTrades.push(newTrade);

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      message: "Latest trade added successfully",
      user,
    });
  } catch (error) {
    console.log("Error adding latest trade:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
