import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";

export async function POST(request) {
  const { phone } = await request.json();
  console.log(`Searching for phone: ${phone}`);

  try {
    const phoneexists = await UserModel.findOne({ phone: phone });
    console.log(
      `Phone found in database: ${
        phoneexists ? phoneexists.phone : "not found"
      }`
    );

    if (phoneexists) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
