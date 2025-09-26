import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect"; // Adjust the path based on your project structure

export async function GET(request) {
  const email = request.nextUrl.searchParams.get("email");

  console.log("This is the email", email);

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      plans: user.mainInvestmentPackage,
    });
  } catch (error) {
    console.error("Error fetching user plans:", error);
    return NextResponse.json(
      { message: "Failed to fetch user plans" },
      { status: 500 }
    );
  }
}
