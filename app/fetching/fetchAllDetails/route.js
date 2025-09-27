import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const { email } = await request.json();
    const lowerEmail = email.toLowerCase();

    const detail = await UserModel.findOne({ email: lowerEmail });

    if (!detail) {
      console.log("not found");
      // If detail is not found, return a 404 status and an error message
      return NextResponse.error("Detail not found", { status: 404 });
    }

    // Revalidate the '/dashboard' path to update cached data
    revalidatePath("/dashboard");

    // Add cache-busting headers to ensure fresh data
    const response = NextResponse.json(detail);
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    // Handle any other errors that might occur
    return NextResponse.error("An error occurred", { status: 500 });
  }
}
