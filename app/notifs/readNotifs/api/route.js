import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

export async function POST(request) {
  const { email } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { success: false },
        { status: 400 }
      );
    }

    // Update the user's isReadNotifications field to true
    user.isReadNotifications = true;
    await user.save();

    return NextResponse.json({ success: true, status: 201 });
  } catch (error) {
    console.error("Error ", error);
    return NextResponse.json({ message: "Failed ", status: 500 });
  }
}
