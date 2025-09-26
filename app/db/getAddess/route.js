import { NextResponse } from "next/server";
import AddressModel from "../../../AddressDbmain";

export const revalidate = 30;

export async function POST(request) {
  const { _id } = await request.json();
  console.log(_id);
  const address = await AddressModel.findOne({ _id });
  console.log(address);
  if (address) {
    return NextResponse.json(address);
  } else {
    return NextResponse.json({ error: "no user found" });
  }
}
