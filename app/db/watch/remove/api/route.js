import { NextResponse } from "next/server";
import UserModel from "../../../../../mongodbConnect";

export async function DELETE(request) {
  const { email, assetType, assetId } = await request.json();

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // Determine which array to update based on the assetType
    let targetArray;
    if (assetType === "crypto") {
      targetArray = user.watchedCrypto[0].crypto;
    } else if (assetType === "stock") {
      targetArray = user.watchedCrypto[1].stock;
    } else if (assetType === "currencyPair") {
      targetArray = user.watchedCrypto[2].currencyPair;
    } else {
      return NextResponse.json("Invalid asset type", { status: 400 });
    }

    // Remove the assetId from the target array
    const index = targetArray.indexOf(assetId);
    if (index !== -1) {
      targetArray.splice(index, 1);
    }

    // Save the updated user document
    const updatedUser = await user.save();

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
