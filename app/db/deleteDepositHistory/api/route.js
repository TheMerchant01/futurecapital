import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

// Define the DELETE method to remove a deposit history
export async function DELETE(request) {
    const { email, depositId } = await request.json(); // Expecting depositId to be passed along with the email

    console.log("This is their values", email, depositId)
  
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return NextResponse.error("User not found", { status: 404 }); // Handle case when user is not found
      }
  
      // Find the deposit history item by depositId
      const depositIndex = user.depositHistory.findIndex(
        (deposit) => deposit._id.toString() === depositId
      );
  
      if (depositIndex === -1) {
        return NextResponse.error("Deposit history not found", { status: 404 }); // Handle case when deposit is not found
      }
  
      // Remove the deposit from depositHistory
      const removedDeposit = user.depositHistory.splice(depositIndex, 1)[0];
  
      // Update totalDeposited after removing the deposit
      user.totalDeposited -= removedDeposit.amount;
  
      // Save the updated user document
      await user.save();
  
      return NextResponse.json({
        message: "Deposit history removed successfully",
        user,
      });
    } catch (error) {
      console.log("This is the error", error);
      return NextResponse.error("Internal Server Error", { status: 500 });
    }
  }