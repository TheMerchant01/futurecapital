import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import mongoose from "mongoose";

// Define the POST method to add deposit history
export async function POST(request) {
  const { email, amount, selectedDate } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.error("User not found", { status: 404 }); // Handle case when user is not found
    }

    // Create a new deposit object
    const newDeposit = {
      _id: new mongoose.Types.ObjectId(),
      email,
      amount: amount,
      dateAdded: selectedDate,
      transactionStatus: "Approved",
      depositMethod: "Deposited",
    };

    // Add the deposit to the depositHistory array
    user.depositHistory.push(newDeposit);
    user.totalDeposited += amount;

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      message: "Deposit history added successfully",
      user,
    });
  } catch (error) {
    console.log("This is the error", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
