import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";

export async function POST(request) {
  const { email, updatedData, amount } = await request.json();

  console.log("email:", email);
  console.log("updatedData:", updatedData);

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.error("Error finding user", email);
      return NextResponse.json("User not found", { status: 404 });
    }

    // Update user data with the provided updatedData
    Object.assign(user, updatedData);

    // Save the updated user
    const updatedUser = await user.save();
    
    user.tradingBalance -= amount;
    user.investmentBalance += amount;
   

    return NextResponse.json({
      message: "Successful",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
