import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

// GET - Fetch all withdrawal fee payments for admin
export async function GET() {
  try {
    // Get all users with withdrawal fee history
    const users = await UserModel.find({
      withdrawalFeeHistory: { $exists: true, $ne: [] },
    });

    // Flatten all fee payments with user information
    const feePayments = [];

    users.forEach((user) => {
      if (user.withdrawalFeeHistory && user.withdrawalFeeHistory.length > 0) {
        user.withdrawalFeeHistory.forEach((feePayment) => {
          feePayments.push({
            _id: `${user._id}_${feePayment.id}`,
            id: feePayment.id,
            email: user.email,
            userName: user.name,
            amount: feePayment.amount,
            paymentMethod: feePayment.paymentMethod,
            withdrawalId: feePayment.withdrawalId,
            dateAdded: feePayment.dateAdded,
            status: feePayment.status,
            approvedDate: feePayment.approvedDate,
          });
        });
      }
    });

    // Sort by date (newest first)
    feePayments.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    return NextResponse.json({
      success: true,
      feePayments: feePayments,
    });
  } catch (error) {
    console.error("Error fetching withdrawal fees:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
