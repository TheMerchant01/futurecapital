"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Settings, DollarSign, UserCheck } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    withdrawalFee: 10,
    kycFee: 25,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("/db/adminSettings/api");
      if (response.status === 200) {
        setSettings({
          withdrawalFee: response.data.withdrawalFee || 10,
          kycFee: response.data.kycFee || 25,
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await axios.post("/db/adminSettings/api", settings);
      if (response.status === 200) {
        toast.success("Settings updated successfully");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setSettings((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Admin Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Withdrawal Fee Setting */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <Label htmlFor="withdrawalFee" className="text-lg font-semibold">
                Withdrawal Fee
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdrawalFee">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="withdrawalFee"
                  type="number"
                  value={settings.withdrawalFee}
                  onChange={(e) =>
                    handleInputChange("withdrawalFee", e.target.value)
                  }
                  className="pl-8"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-600">
                Fee charged for each withdrawal request
              </p>
            </div>
          </div>

          {/* KYC Fee Setting */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <Label htmlFor="kycFee" className="text-lg font-semibold">
                KYC Verification Fee
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="kycFee">Amount (USD)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  id="kycFee"
                  type="number"
                  value={settings.kycFee}
                  onChange={(e) => handleInputChange("kycFee", e.target.value)}
                  className="pl-8"
                  min="0"
                  step="0.01"
                />
              </div>
              <p className="text-sm text-gray-600">
                Fee charged for KYC verification process
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>

        {/* Information Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Important Notes:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Withdrawal fees are charged before each withdrawal can be
              processed
            </li>
            <li>• KYC fees must be paid before verification can be approved</li>
            <li>• Changes to fees will apply to new requests only</li>
            <li>
              • Existing pending requests will use the fee amount set when they
              were created
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
