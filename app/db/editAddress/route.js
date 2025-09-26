import { NextResponse } from "next/server";
import AddressModel from "../../../AddressDbmain";

export async function POST(request) {
  const { _id, updatedData } = await request.json();

  try {
    const updatedAddress = await AddressModel.findByIdAndUpdate(
      _id,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedAddress) {
      return NextResponse.json({ status: 404, message: "Address not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Address updated successfully",
      updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
