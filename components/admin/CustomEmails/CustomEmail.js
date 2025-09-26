"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CustomEmail({ email }) {
  const [emailHeading, setEmailHeading] = useState("");
  const [sendingAs, setSendingAs] = useState("Future Capital Market Team");
  const [emailContent, setEmailContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({
    emailHeading: "",
    emailContent: "",
  });
  const router = useRouter();

  const sendEmail = async (emailData) => {
    try {
      // Send a POST request to your backend API with the email data
      const response = await axios.post(`/db/sendCustomEmail/api`, {
        emailData,
      });

      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Email sent successfully
        console.log("Email sent successfully.");
        return true;
      } else {
        // Email sending failed
        console.error("Email sending failed.");
        return false;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const handleSendClick = async () => {
    setIsSending(true);

    // Check if the required fields are filled
    if (!emailHeading) {
      setErrors({ ...errors, emailHeading: "Email Heading is required." });
    } else {
      setErrors({ ...errors, emailHeading: "" });
    }

    if (!emailContent) {
      setErrors({
        ...errors,
        emailContent: "Email Content is required.",
      });
    } else {
      setErrors({ ...errors, emailContent: "" });
    }

    if (!emailHeading || !emailContent) {
      setIsSending(false);
      return;
    }

    // Here, you can implement the logic to send the email
    // For simplicity, we're just simulating a delay

    // Call a function to send the email content
    const emailData = {
      heading: emailHeading,
      sendingAs,
      content: emailContent,
      recipientEmail: email, // Include recipient's email address
    };
    const emailSentSuccessfully = await sendEmail(emailData);

    if (emailSentSuccessfully) {
      // Clear the form and set a success message if needed
      setEmailHeading("");
      setEmailContent("");
      setIsSending(false);
      toast.success("Email sent successfully");
      router.push("/admin");
      // You can set a success message here if you want
    } else {
      // Handle email sending failure, you can show an error message
      setIsSending(false);
      toast.error("Error sending email");
      // You can set an error message here if you want
    }
  };

  return (
    <div className="px-4 pt-12 pb-4">
      <div className="settings px-3 py-4 rounded-md shadow-md shadow-gray-100">
        <div className="profile font-bold">Sending Email to:</div>
        <div className="email flex items-center gap-x-1 bg-gray-50 p-2 rounded-md mt-2">
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-red-700/80"
            >
              <path
                fillRule="evenodd"
                d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 1000-5 2.5 2.5 0 000 5z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="email_title text-sm font-bold">{email}</div>
        </div>
      </div>

      {/* Email Heading Input */}
      <div className="mt-4">
        <label htmlFor="emailHeading" className="block text-sm font-bold pb-2">
          Email Heading:
        </label>
        <input
          type="text"
          id="emailHeading"
          placeholder="Enter email heading"
          value={emailHeading}
          onChange={(e) => setEmailHeading(e.target.value)}
          className={`border rounded p-2 w-full ${
            errors.emailHeading ? "border-red-500" : ""
          }`}
          required
        />
        {errors.emailHeading && (
          <div className="text-red-500 text-sm mt-1">{errors.emailHeading}</div>
        )}
      </div>

      {/* Sending As Input */}
      <div className="mt-4">
        <label htmlFor="sendingAs" className="block text-sm font-bold pb-2">
          Sending Email As:
        </label>
        <input
          type="text"
          id="sendingAs"
          placeholder="Enter sending as"
          value={sendingAs}
          onChange={(e) => setSendingAs(e.target.value)}
          className="border rounded p-2 w-full font-bold"
        />
      </div>

      {/* Email Content Text Area */}
      <div className="mt-4">
        <label htmlFor="emailContent" className="block text-sm font-bold pb-2">
          Email Content:
        </label>
        <textarea
          id="emailContent"
          rows="7"
          cols="50"
          placeholder="Enter your email content..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className={`border rounded p-2 w-full ${
            errors.emailContent ? "border-red-500" : ""
          }`}
          required
        ></textarea>
        {errors.emailContent && (
          <div className="text-red-500 text-sm mt-1 font-bold">
            {errors.emailContent}
          </div>
        )}
      </div>

      {/* Send Button */}
      <div className="mt-4">
        <button
          onClick={handleSendClick}
          disabled={isSending}
          className={`bg-red-500 hover:bg-red-600 w-full text-white text-sm font-bold py-2 px-4 rounded-md h-11 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "Sending..." : `Send Email to ${email}`}
        </button>
      </div>
    </div>
  );
}
