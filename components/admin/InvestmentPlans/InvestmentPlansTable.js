"use client";
import { useCallback, useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import axios from "axios";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../../ui/dropdown-menu";
import { toast } from "react-hot-toast";

export default function InvestmentPlansTable({ data }) {
    const [plans, setPlans] = useState([]);

    const fetchedDetails = useCallback(async () => {
        try {
            const response = await axios.get(`/getplans/api?email=${data}`);
            if (response.status === 200) {
                setPlans(response.data.plans);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    }, [data]);

    useEffect(() => {
        fetchedDetails();
    }, [fetchedDetails]);

    const handleStatusChange = async (planId, currentStatus) => {
        try {
            const newStatus = currentStatus === "Activated" ? "Deactivated" : "Activated";

            const response = await axios.post("/updateplan/api", { email: data, planId });

            if (response.status === 200) {
                setPlans((prevPlans) => prevPlans.map(plan =>
                    plan._id === planId ? { ...plan, status: newStatus } : plan
                ));
                fetchedDetails();
                toast.success(`Plan ${newStatus.toLowerCase()} successfully`);
            } else {
                toast.error("Failed to change plan status");
            }
        } catch (error) {
            console.error("Error changing status:", error);
            toast.error("Error changing status");
        }
    };

    return (
        <div className="px-3 mx-auto mt-8 rounded-md border bg-white shadow-md">
            <div className="w-full mt-3">
                <div className="rounded-md border px-2 max-w-[100vw] overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border px-4 py-2 text-left">Plan</th>
                                <th className="border px-4 py-2 text-left">Status</th>
                                <th className="border px-4 py-2 text-left">Date</th>
                                <th className="border px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.length > 0 ? (
                                plans.map((plan, index) => (
                                    <tr key={index} className="border hover:bg-gray-50">
                                        <td className="border px-4 py-2">{plan.plan}</td>
                                        <td className="border px-4 py-2 font-medium text-{plan.status === 'Activated' ? 'green-600' : 'red-600'}">
                                            {plan.status}
                                        </td>
                                        <td className="border px-4 py-2">{plan.initializedAt}</td>
                                        <td className="border px-4 py-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="py-1 bg-white shadow-md rounded-md">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="py-3 cursor-pointer"
                                                        onClick={() => handleStatusChange(plan._id, plan.status)}
                                                    >
                                                        {plan.status === "Activated" ? "Deactivate" : "Activate"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">No results.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
