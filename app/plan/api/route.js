import { NextResponse } from "next/server";
import mongoose from "mongoose";
import UserModel from "../../../mongodbConnect";

export async function POST(request) {
  const { plan, email, amount } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      // User not found, handle the error accordingly
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, success: false }
      );
    }

    // Add the new notification to the user's notifications array
    user.tradingBalance -= amount;
    user.investmentBalance += amount;
    user.investmentPackage = plan;
    user.mainInvestmentPackage.push({  id: new mongoose.Types.ObjectId(), plan, initializedAt: new Date(), status: "Activated", amount });

    await user.save();

    // Return a success response
    return NextResponse.json({
      message: "plan added",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error purchasing plan:", error);
    // Handle any errors and return an appropriate error response
    return NextResponse.json(
      { message: "Failed to purchase plan" },
      { status: 500, success: false }
    );
  }
}
