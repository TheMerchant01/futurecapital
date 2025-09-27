import { NextResponse } from "next/server";
import UserModel from "../../../../mongodbConnect"; // Make sure to import your UserModel

export async function POST(request) {
  const { email, code } = await request.json();
  const lowerEmail = email.toLowerCase();
  const user = await UserModel.findOne({ email: lowerEmail });
  console.log(user.verificationCode);
  console.log(code);

  if (user && user.verificationCode === code && user.codeExpiry > Date.now()) {
    await UserModel.updateOne({ _id: user._id }, { emailVerified: true });
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json(
      { success: false, message: "Invalid or expired verification code" },
      { status: 400 }
    );
  }
}
