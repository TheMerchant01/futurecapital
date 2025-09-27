"use client";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUserData } from "../../../contexts/userrContext";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useTheme } from "../../../contexts/themeContext";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { CheckCircle, AlertCircle, CreditCard, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verify() {
  const { email, fetchDetails } = useUserData();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateProvince: "",
    country: "",
    zipCode: "",
    phone: "",
    secondPhone: "",
  });
  const [loading, isloading] = useState(false);
  const [isUploadingFront, setIsUploadingFront] = useState(false);
  const [isUploadingBack, setIsUploadingBack] = useState(false);
  const [frontIDFile, setFrontIDFile] = useState(null);
  const [backIDFile, setBackIDFile] = useState(null);
  const { setNotification } = useUserData();
  const [idType, setIdType] = useState();
  const [frontIDSecureUrl, setFrontIDSecureUrl] = useState(null); // Add this line
  const [backIDSecureUrl, setBackIDSecureUrl] = useState(null); // Add this line  const [formErrors, setFormErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // KYC status states
  const [kycStatus, setKycStatus] = useState("not_submitted");
  const [kycFeePaid, setKycFeePaid] = useState(false);
  const [kycFee, setKycFee] = useState(0);
  const [checkingKycStatus, setCheckingKycStatus] = useState(true);
  const documents = [
    "Driver's License",
    "Passport",
    "Social Security Card",
    "State ID",
    "Military ID",
    "Green Card",
    "Birth Certificate",
    "Student ID",
    "Voter ID",
    "Employment Authorization Document (EAD)",
    "National ID Card",
    "Tribal ID",
    "Concealed Carry Permit",
    "Health Insurance Card",
    "Library Card",
  ];

  // Check KYC status on component mount
  React.useEffect(() => {
    const checkKycStatus = async () => {
      try {
        const response = await axios.get("/db/getUser/api");
        const users = response.data.users || [];
        const currentUser = users.find((user) => user.email === email);

        if (currentUser) {
          setKycStatus(currentUser.kycStatus || "not_submitted");
          setKycFeePaid(currentUser.kycFeePaid || false);
          setKycFee(currentUser.kycFee || 0);
        }

        // Also refresh the user context to update verification status
        if (fetchDetails) {
          fetchDetails();
        }
      } catch (error) {
        console.error("Error checking KYC status:", error);
      } finally {
        setCheckingKycStatus(false);
      }
    };

    if (email) {
      checkKycStatus();
    }
  }, [email, fetchDetails]);

  const onDropFront = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploadingFront(true); // Set the loading state
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "insightstakers");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dr1p2iupg/upload`,
          formData
        );

        if (response.status === 200) {
          toast.success("File Uploaded");
          setFrontIDFile(file);
          setFrontIDSecureUrl(response.data.secure_url); // Update the Cloudinary secure URL
        } else {
          console.error("Failed to upload image to Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploadingFront(false); // Reset the loading state
      }
    }
  };

  const onDropBack = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploadingBack(true); // Set the loading state
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "insightstakers");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dr1p2iupg/upload`,
          formData
        );

        if (response.status === 200) {
          toast.success("File Uploaded");
          setBackIDFile(file);
          setBackIDSecureUrl(response.data.secure_url); // Update the Cloudinary secure URL
        } else {
          console.error("Failed to upload image to Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploadingBack(false); // Reset the loading state
      }
    }
  };

  const {
    getRootProps: getRootPropsFront,
    getInputProps: getInputPropsFront,
    isDragActive: isDragActiveFront,
  } = useDropzone({
    onDrop: onDropFront,
    accept: "image/jpeg, image/png, image/gif",
    maxFiles: 1,
  });

  const {
    getRootProps: getRootPropsBack,
    getInputProps: getInputPropsBack,
    isDragActive: isDragActiveBack,
  } = useDropzone({
    onDrop: onDropBack,
    accept: "image/jpeg, image/png, image/gif",
    maxFiles: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    for (const key in formData) {
      if (
        !formData[key] &&
        key !== "addressLine2" &&
        !formData[key] &&
        key !== "secondPhone"
      ) {
        // Make addressLine2 optional
        errors[key] = "This field is required";
      }
    }
    if (!frontIDSecureUrl) {
      errors.frontID = "Front ID image is required";
    }
    if (!backIDSecureUrl) {
      errors.backID = "Back ID image is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      isloading(true);
      try {
        const response = await axios.post("/dashboard/verifyid/api", {
          formData: formData,
          frontIDSecureUrl,
          backIDSecureUrl,
          email,
          idType,
        });

        if (response.status === 200) {
          toast.success("Verification Application Successful", {
            duration: 4000,
          });
          setNotification(
            `We have recieved your ${idType} verification details, we're on desk right away`,
            "verification",
            "pending"
          );
          isloading(false);
          setFormData({
            firstName: "",
            lastName: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            stateProvince: "",
            country: "",
            zipCode: "",
            phone: "",
            secondPhone: "",
          });

          // Clear file inputs
          setFrontIDFile(null);
          setBackIDFile(null);

          // Clear Cloudinary secure URLs
          setFrontIDSecureUrl(null);
          setBackIDSecureUrl(null);

          // Redirect to KYC payment page
          setTimeout(() => {
            window.location.href = "/dashboard/kyc-payment";
          }, 2000);
        } else {
          console.error("Failed to submit form to backend.");
          isloading(false);
        }
      } catch (error) {
        console.error("Error submitting form to backend:", error);
      }
    }
    isloading(false);
  };
  const { isDarkMode } = useTheme();

  // Show loading while checking KYC status
  if (checkingKycStatus) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Show KYC status messages based on current status
  if (kycStatus === "approved") {
    return (
      <div className="p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            KYC Verification Approved
          </h3>
          <p className="text-green-700 mb-4">
            Congratulations! Your KYC verification has been approved. You can
            now access all platform features.
          </p>
          <Button
            onClick={() => router.push("/dashboard")}
            className="bg-green-600 hover:bg-green-700"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (kycStatus === "declined") {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-900 mb-2">
            KYC Verification Declined
          </h3>
          <p className="text-red-700 mb-4">
            Your KYC verification has been declined. Please contact support for
            more information or re-submit your documents.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => {
                setKycStatus("not_submitted");
                setKycFeePaid(false);
              }}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Re-submit Documents
            </Button>
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (kycStatus === "pending" && kycFeePaid) {
    return (
      <div className="p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            KYC Verification in Progress
          </h3>
          <p className="text-blue-700 mb-4">
            Your KYC documents and payment have been submitted. We are currently
            reviewing your verification request.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => router.push("/dashboard")} variant="outline">
              Go to Dashboard
            </Button>
            <Button
              onClick={() => {
                setCheckingKycStatus(true);
                // Re-check status and refresh user context
                if (fetchDetails) {
                  fetchDetails();
                }
                setTimeout(() => setCheckingKycStatus(false), 1000);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Check Status
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (kycStatus === "pending" && !kycFeePaid) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <CreditCard className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            KYC Payment Required
          </h3>
          <p className="text-yellow-700 mb-4">
            Your KYC documents have been submitted successfully. Please complete
            the payment to proceed with verification.
          </p>
          <div className="bg-white border border-yellow-300 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">KYC Verification Fee:</span>
              <span className="font-bold text-lg">${kycFee}</span>
            </div>
          </div>
          <Button
            onClick={() => router.push("/dashboard/kyc-payment")}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Complete Payment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div
        className={`p-4 rounded-md border ${
          isDarkMode ? "bg-[#111] border-white/10 text-white/90" : ""
        }`}
      >
        <div
          className={`mb-4 py-3 ${
            isDarkMode ? "bg-[#222] px-3 rounded-md border-white/10 border" : ""
          }`}
        >
          <div className="flex items-center mb-4">
            <div className="text-xl font-bold">ID Verification</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-2 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p
            className={`font-bold text-sm ${isDarkMode ? "text-white/60" : ""}`}
          >
            Your Personal info/ID for verification will be processed and
            verified
          </p>
        </div>
        <div
          className={`EntryPrice mb-2 mt-1 rounded  text-sm ${
            isDarkMode
              ? "bg-[#22222270] text-white/80"
              : "bg-black/5 text-black/80"
          }`}
        >
          <Select onValueChange={(id) => setIdType(id)}>
            <SelectTrigger className="rounded-sm border-0 font-bold">
              <SelectValue placeholder="Select a document type" />
            </SelectTrigger>
            <SelectContent
              className={` ${
                isDarkMode ? "bg-[#222] border-white/5 text-white/80" : ""
              }`}
            >
              <ScrollArea className="h-[200px] my-2">
                {documents.map((doc) => (
                  <>
                    <SelectItem value={doc}>{doc}</SelectItem>
                  </>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        {!idType && (
          <div className="flex justify-center items-center font-bold text-lg my-4">
            <p> Please select an a document to upload</p>{" "}
          </div>
        )}
        {idType && (
          <form onSubmit={handleSubmit} className="">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label
                    key={key}
                    htmlFor={key}
                    className="block mt-4 font-bold text-sm mb-3"
                  >
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                  </label>
                  <Input
                    type="text"
                    id={key}
                    name={key}
                    value={formData[key]}
                    placeholder={`Enter ${key
                      .replace(/([A-Z])/g, " $1")
                      .toLowerCase()}`}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 placeholder:text-muted-foreground ${
                      isDarkMode ? "bg-[#222] text-white border-none" : "border"
                    } text-xs rounded  font-bold focus:outline-none  ${
                      formErrors[key]
                        ? "border-red-500"
                        : "focus:border-slate-500"
                    }`}
                  />
                  {formErrors[key] && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Dropzone for Front ID */}
            <label
              htmlFor="frontID"
              className="block my-4 mb-2 text-sm font-bold pt-4"
            >
              Verification ID (Front)
            </label>
            <div
              {...getRootPropsFront()}
              className={`w-full px-4 py-3 text-sm rounded ${
                isDarkMode ? "bg-[#222]" : "border"
              } font-bold  focus:outline-none ${
                isDragActiveFront ? "border-slate-500" : ""
              } ${formErrors.frontID ? "border-red-500" : ""}`}
            >
              <input {...getInputPropsFront()} />
              {isUploadingFront ? (
                <p>Uploading Front ID image...</p>
              ) : frontIDFile ? (
                <p>{frontIDFile.name}</p>
              ) : (
                <p className="text-sm">Click/Drag-in to upload a file</p>
              )}
            </div>
            {formErrors.frontID && (
              <p className="text-red-500 text-xs mt-1">{formErrors.frontID}</p>
            )}
            <label
              htmlFor="backID"
              className="block my-4 pt-2 text-sm font-bold"
            >
              Verification ID (Back)
            </label>
            <div
              {...getRootPropsBack()}
              className={`w-full px-4 py-3 text-sm rounded ${
                isDarkMode ? "bg-[#222]" : "border"
              }  font-bold  focus:outline-none ${
                isDragActiveBack ? "border-slate-500" : ""
              } ${formErrors.backID ? "border-red-500" : ""}`}
            >
              <input {...getInputPropsBack()} />
              {isUploadingBack ? (
                <p>Uploading Back ID image...</p>
              ) : backIDFile ? (
                <p>{backIDFile.name}</p>
              ) : (
                <p className="text-sm">Click/Drag-in to upload a file</p>
              )}
            </div>
            {formErrors.backID && (
              <p className="text-red-500 text-xs mt-1">{formErrors.backID}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 mt-4 flex justify-center items-center text-sm rounded bg-[#0066b1] my-3 text-white font-bold  focus:outline-none "
            >
              {loading ? (
                <InfinitySpin width="100" color="#ffffff" />
              ) : (
                <div className="py-3">Submit Verification</div>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
