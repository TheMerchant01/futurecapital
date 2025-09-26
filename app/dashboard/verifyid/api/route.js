import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { formData, frontIDSecureUrl, backIDSecureUrl, email, idType } =
    await request.json();

  // Create a Nodemailer transporter using the correct SMTP settings for Hostinger
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com", // Use Hostinger's S.MTP host
    port: 465, // Port for secure SSL connection
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_USER, // Your email user
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Email content
  const emailContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          .container {
            background-color: #f7f7f7;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #3498db;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 10px;
          }
          .image {
            max-width: 100%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 10px;
            margin: 11px auto;
            display: block;
          }
          .form-data {
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verification Details</h1>
          </div>
          <h4>Please verify these details</h4>
          <h2>Images</h2>
          <p>Front ID:</p>
          <img class="image" src="${frontIDSecureUrl}" alt="Front ID Image">
          <p>Back ID:</p>
          <img class="image" src="${backIDSecureUrl}" alt="Back ID Image">
          <div class="form-data">
            <h2>Verification info</h2>
            <p><strong>Name:</strong> ${formData.firstName} ${
    formData.lastName
  }</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address Line 1:</strong> ${formData.addressLine1}</p>
            <p><strong>Address Line 2:</strong> ${
              formData.addressLine2 || "N/A"
            }</p>
            <p><strong>City:</strong> ${formData.city}</p>
            <p><strong>State/Province:</strong> ${formData.stateProvince}</p>
            <p><strong>Country:</strong> ${formData.country}</p>
            <p><strong>Zip Code:</strong> ${formData.zipCode}</p>
            <p><strong>Phone one:</strong> ${formData.phone}</p>
            <p><strong>Phone two:</strong> ${formData.secondPhone}</p>
            <p><strong>Id Type:</strong> ${idType}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Email options
  const mailOptions = {
    from: "support@futurecapitalmarket.com", // Replace with your email
    to: "support@futurecapitalmarket.com", // Replace with recipient email
    subject: "Verification Details",
    html: emailContent,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(frontIDSecureUrl, backIDSecureUrl); // Debugging output
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "An error occurred while sending email" },
      { status: 500 }
    );
  }
}
