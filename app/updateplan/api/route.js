import { NextResponse } from "next/server";
import UserModel from "../../../mongodbConnect";

export async function PATCH(request) {
    const { email, planId } = await request.json();

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404, success: false }
            );
        }

        // Find the investment package by ID
        const investment = user.mainInvestmentPackage.id(planId);

        if (!investment) {
            return NextResponse.json(
                { message: "Investment plan not found" },
                { status: 404, success: false }
            );
        }

        // Toggle the status
        investment.status = investment.status === "Activated" ? "Deactivated" : "Activated";

        await user.save();

        return NextResponse.json({
            message: `Plan status updated to ${investment.status}`,
            status: 200,
            success: true,
        });
    } catch (error) {
        console.error("Error updating plan status:", error);
        return NextResponse.json(
            { message: "Failed to update plan status" },
            { status: 500, success: false }
        );
    }
}