import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

// GET - Fetch admin settings (fees)
export async function GET() {
  try {
    // Get the first user to check if settings exist, or create default settings
    const adminUser = await UserModel.findOne({ role: "admin" });

    if (!adminUser) {
      // Return default settings if no admin user found
      return NextResponse.json({
        withdrawalFee: 10, // Default $10 withdrawal fee
        kycFee: 25, // Default $25 KYC fee
      });
    }

    return NextResponse.json({
      withdrawalFee: adminUser.withdrawalFee || 10,
      kycFee: adminUser.kycFee || 25,
    });
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST - Update admin settings (fees)
export async function POST(request) {
  try {
    const { withdrawalFee, kycFee } = await request.json();

    // Validate input
    if (typeof withdrawalFee !== "number" || typeof kycFee !== "number") {
      return NextResponse.json(
        { message: "Invalid fee amounts" },
        { status: 400 }
      );
    }

    if (withdrawalFee < 0 || kycFee < 0) {
      return NextResponse.json(
        { message: "Fee amounts cannot be negative" },
        { status: 400 }
      );
    }

    // Update or create admin settings
    const adminUser = await UserModel.findOneAndUpdate(
      { role: "admin" },
      {
        withdrawalFee,
        kycFee,
        role: "admin", // Ensure role is set
      },
      {
        upsert: true, // Create if doesn't exist
        new: true,
      }
    );

    return NextResponse.json({
      message: "Settings updated successfully",
      withdrawalFee: adminUser.withdrawalFee,
      kycFee: adminUser.kycFee,
    });
  } catch (error) {
    console.error("Error updating admin settings:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
