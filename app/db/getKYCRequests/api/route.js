import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

// GET - Fetch all KYC requests for admin
export async function GET() {
  try {
    // Get all users with KYC information
    const users = await UserModel.find({
      $or: [{ kycStatus: { $exists: true } }, { kycFee: { $exists: true } }],
    });

    // Format KYC requests
    const kycRequests = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      country: user.country,
      kycStatus: user.kycStatus || "pending",
      kycFee: user.kycFee || 0,
      kycFeePaid: user.kycFeePaid || false,
      kycApprovedDate: user.kycApprovedDate || null,
    }));

    // Sort by status (pending first) then by date
    kycRequests.sort((a, b) => {
      if (a.kycStatus === "pending" && b.kycStatus !== "pending") return -1;
      if (a.kycStatus !== "pending" && b.kycStatus === "pending") return 1;
      return 0;
    });

    return NextResponse.json({
      success: true,
      kycRequests: kycRequests,
    });
  } catch (error) {
    console.error("Error fetching KYC requests:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
