import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";
import crypto from "crypto";

export async function POST(request) {
    try {
        const { email, token, newPassword } = await request.json();
        const lowerEmail = email.toLowerCase();

        // Hash the token to compare with stored token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find user with valid reset token
        const user = await UserModel.findOne({
            email: lowerEmail,
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // Update password and clear reset token
        user.password = newPassword; // Store plain password as per request
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return NextResponse.json(
            { message: "Password reset successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json(
            { message: "An error occurred", error: error.message },
            { status: 500 }
        );
    }
}