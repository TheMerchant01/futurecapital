import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect";

export async function POST(request) {
  const { email, taxCodePin } = await request.json();
  const lowerEmail = email.toLowerCase();

  const user = await UserModel.findOne({ email: lowerEmail });

  if (!user) {
    return NextResponse.json({ success: false, message: "Email not found" });
  }

  if (user.taxCodePin !== taxCodePin) {
    return NextResponse.json({
      success: false,
      message: "Incorrect! check and try again",
    });
  }

  return NextResponse.json({ success: true, message: "Password correct" });
}
