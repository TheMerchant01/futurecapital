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

    return NextResponse.json(detail);
  } catch (error) {
    // Handle any other errors that might occur
    return NextResponse.error("An error occurred", { status: 500 });
  }
}
