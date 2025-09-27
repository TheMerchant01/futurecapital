import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";

export const revalidate = 30;

export async function GET() {
  const users = await UserModel.find({});
  if (users.length > 0) {
    return NextResponse.json({ users });
  } else {
    return NextResponse.json({ error: "no user found" });
  }
}
