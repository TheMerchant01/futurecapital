import jwt from "jsonwebtoken";
import UserModel from "../../../mongodbConnect";
import { NextResponse } from "next/server"; // Import NextResponse

export async function POST(request) {
  const { email, password } = await request.json();
  const lowerEmail = email.toLowerCase();
  console.log(lowerEmail);
  // Find user
  const user = await UserModel.findOne({ email: lowerEmail });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  // Since you didn't hash the password, we'll do a simple comparison here
  const isPasswordValid = password === user.password;
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Password is incorrect" },
      { status: 400 }
    );
  }
  const role = await user.role;
  // Generate JWT
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "3d",
  });

  return NextResponse.json(
    { token, message: "Login successful", email: lowerEmail, role },
    { status: 200 }
  );
}
