import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";
import mongoose from "mongoose";

// GET - Fetch all withdrawal fee payments for admin
export async function GET() {
  try {
    // Force a fresh database connection and query
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Force a completely fresh database connection
    const db = mongoose.connection.db;

    // List all collections to see what's available
    const collections = await db.listCollections().toArray();

    // Try to find the correct collection name
    const collectionName =
      collections.find((c) => c.name.toLowerCase().includes("user"))?.name ||
      "users";

    const collection = db.collection(collectionName);

    // Use raw MongoDB query with read concern to ensure latest data
    const users = await collection
      .find(
        {
          withdrawalFeeHistory: { $exists: true, $ne: [] },
        },
        {
          readConcern: { level: "majority" },
          readPreference: "primary",
        }
      )
      .toArray();

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

    const response = NextResponse.json({
      success: true,
      feePayments: feePayments,
    });

    // Add cache-busting headers
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Error fetching withdrawal fees:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
