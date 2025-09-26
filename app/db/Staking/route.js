import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";

export async function POST(request) {
  const { email, stakings, amount } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("error finding user", email);
      return NextResponse.json("User not found", { status: 404 });
    }

    // Subtract 'amount' from 'tradingBalance'
    user.tradingBalance -= amount;
    user.paidStaking = Date.now();
    user.lastButtonClick = Date.now();
    user.stakings.push(stakings);

    // Save the updated user document
    const updatedUser = await user.save();

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
