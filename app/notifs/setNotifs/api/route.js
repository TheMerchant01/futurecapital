import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

export async function POST(request) {
  const { email, newNotification } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      // User not found, handle the error accordingly
      return NextResponse.json(
        { message: "User not found" },
        { status: 404, success: false }
      );
    }

    // Add the new notification to the user's notifications array
    user.notifications.push(newNotification);

    // Set isReadNotification to false for the added notification
    user.isReadNotifications = false;

    // Save the updated user document
    await user.save();

    // Return a success response
    return NextResponse.json(
      { message: "Notification added successfully" },
      { status: 200, success: true }
    );
  } catch (error) {
    console.error("Error adding notification:", error);
    // Handle any errors and return an appropriate error response
    return NextResponse.json(
      { message: "Failed to add notification" },
      { status: 500, success: false }
    );
  }
}
