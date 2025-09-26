import { NextResponse } from "next/server";
import UserModel from "../../../../../../mongodbConnect";

export async function DELETE(request, { params }) {
  const { id, email } = params;

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

    // Find the index of the notification with the given ID in the notifications array
    const notificationIndex = user.notifications.findIndex(
      (notification) => notification.id === String(id) // Convert id to a string
    );

    if (notificationIndex !== -1) {
      // Remove the notification from the array using splice
      user.notifications.splice(notificationIndex, 1);
      console.log("deleted the notif");
    } else {
      // Handle the case where the notification was not found
      console.log("Notification not found");
    }

    // Save the updated user document
    await user.save();

    return NextResponse.json({ success: true, status: 204 }); // Return a 204 No Content response for success
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({
      message: "Failed to delete notification",
      status: 200,
    });
  }
}
