import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";

export async function DELETE(request, { params }) {
  const { email } = params;

  try {
    const user = await UserModel.findOneAndDelete({ email });

    if (user) {
      console.log("User deleted:", user);
      return NextResponse.json({ status: 200 });
    } else {
      console.log("User not found");
      console.log(email);
      return NextResponse.json({ status: 404 });
    }
  } catch (error) {
    console.error("email", email);
    console.error("Error while deleting user:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
