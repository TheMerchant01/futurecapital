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

export default function Verify() {
  const { email } = useUserData();
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
