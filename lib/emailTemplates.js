// Professional Crypto Fintech Email Templates
// Base template with company branding and modern styling

export const getBaseEmailTemplate = (content, title, subtitle = "") => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${title} - Future Capital Market</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            position: relative;
            z-index: 1;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .logo-image {
            position: relative;
            z-index: 1;
            max-width: 200px;
            height: auto;
            margin-bottom: 16px;
        }
        
        .logo-subtitle {
            position: relative;
            z-index: 1;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 400;
        }
        
        .content {
            padding: 40px 32px;
        }
        
        .title {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 8px;
            text-align: center;
        }
        
        .subtitle {
            font-size: 16px;
            color: #64748b;
            text-align: center;
            margin-bottom: 32px;
        }
        
        .transaction-card {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            position: relative;
        }
        
        .transaction-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #10b981 0%, #059669 100%);
            border-radius: 12px 12px 0 0;
        }
        
        .amount {
            font-size: 32px;
            font-weight: 700;
            color: #059669;
            text-align: center;
            margin: 16px 0;
            letter-spacing: -1px;
        }
        
        .transaction-details {
            display: grid;
            gap: 12px;
            margin: 20px 0;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 500;
            color: #64748b;
            font-size: 14px;
        }
        
        .detail-value {
            font-weight: 600;
            color: #1e293b;
            font-size: 14px;
            text-align: right;
        }
        
        .verification-code {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: #ffffff;
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            margin: 24px 0;
            transition: all 0.2s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
        }
        
        .security-notice {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }
        
        .security-notice-title {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
            font-size: 14px;
        }
        
        .security-notice-text {
            color: #92400e;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .footer {
            background: #f8fafc;
            padding: 32px 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-text {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 16px;
        }
        
        .footer-links {
            margin: 16px 0;
        }
        
        .footer-links a {
            color: #3b82f6;
            text-decoration: none;
            margin: 0 12px;
            font-size: 14px;
        }
        
        .footer-links a:hover {
            text-decoration: underline;
        }
        
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
            margin: 24px 0;
        }
        
        .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .status-success {
            background: #d1fae5;
            color: #065f46;
        }
        
        .status-pending {
            background: #fef3c7;
            color: #92400e;
        }
        
        .status-failed {
            background: #fee2e2;
            color: #991b1b;
        }
        
        .status-ongoing {
            background: #dbeafe;
            color: #1e40af;
        }
        
        .status-completed {
            background: #d1fae5;
            color: #065f46;
        }
        
        /* Responsive design */
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 24px 20px;
            }
            
            .header {
                padding: 24px 20px;
            }
            
            .logo-image {
                max-width: 150px;
                margin-bottom: 12px;
            }
            
            .logo {
                font-size: 24px;
            }
            
            .title {
                font-size: 20px;
            }
            
            .amount {
                font-size: 28px;
            }
            
            .verification-code {
                font-size: 28px;
                letter-spacing: 4px;
            }
            
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
            
            .detail-value {
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <img src="https://www.futurecapitalmarket.com/assets/logo.png" alt="Future Capital Market" class="logo-image">
            <div class="logo">Future Capital Market</div>
            <div class="logo-subtitle">Professional Crypto Trading Platform</div>
        </div>
        
        <div class="content">
            <h1 class="title">${title}</h1>
            ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ""}
            
            ${content}
        </div>
        
        <div class="footer">
            <p class="footer-text">
                This email was sent by Future Capital Market. Please do not reply to this email.
            </p>
            <div class="divider"></div>
            <div class="footer-links">
                <a href="https://www.futurecapitalmarket.com">Visit Website</a>
                <a href="https://www.futurecapitalmarket.com/support">Support</a>
                <a href="https://www.futurecapitalmarket.com/security">Security</a>
            </div>
            <p class="footer-text">
                © ${new Date().getFullYear()} Future Capital Market. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
};

// Email verification template
export const getVerificationEmailTemplate = (code, name = "User") => {
  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${name},
    </p>
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        To complete your account verification, please use the verification code below:
    </p>
    
    <div class="verification-code">${code}</div>
    
    <div class="security-notice">
        <div class="security-notice-title">🔒 Security Notice</div>
        <div class="security-notice-text">
            This verification code is valid for 10 minutes only. Do not share this code with anyone. 
            Future Capital Market will never ask for your verification code via phone or email.
        </div>
    </div>
    
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        If you didn't request this verification code, please ignore this email or contact our support team immediately.
    </p>
  `;

  return getBaseEmailTemplate(
    content,
    "Email Verification",
    "Secure your account with us"
  );
};

// Password reset template
export const getPasswordResetTemplate = (resetUrl, name = "User") => {
  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${name},
    </p>
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        We received a request to reset your password for your Future Capital Market account. 
        Click the button below to create a new password:
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" class="button">Reset Password</a>
    </div>
    
    <div class="security-notice">
        <div class="security-notice-title">🔒 Security Notice</div>
        <div class="security-notice-text">
            This password reset link will expire in 1 hour for your security. 
            If you didn't request this password reset, please ignore this email or contact our support team immediately.
        </div>
    </div>
    
    <p style="font-size: 14px; color: #64748b; margin-top: 24px;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
    </p>
  `;

  return getBaseEmailTemplate(
    content,
    "Password Reset Request",
    "Secure your account access"
  );
};

// Deposit confirmation template
export const getDepositConfirmationTemplate = (
  amount,
  method,
  transactionId,
  name,
  status = "success"
) => {
  const statusClass =
    status === "success"
      ? "status-success"
      : status === "pending"
      ? "status-pending"
      : "status-failed";
  const statusText =
    status === "success"
      ? "Completed"
      : status === "pending"
      ? "Pending"
      : "Failed";

  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${name},
    </p>
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Your deposit has been ${
          status === "success"
            ? "successfully processed"
            : status === "pending"
            ? "received and is being processed"
            : "failed"
        }. 
        ${
          status === "success"
            ? "The funds have been added to your trading balance."
            : ""
        }
    </p>
    
    <div class="transaction-card">
        <div style="text-align: center; margin-bottom: 20px;">
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="amount">$${amount}</div>
        
        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">Transaction ID -</span>
                <span class="detail-value">${transactionId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Payment Method -</span>
                <span class="detail-value">${method}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time -</span>
                <span class="detail-value">${new Date().toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  }
                )}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status -</span>
                <span class="detail-value">${statusText}</span>
            </div>
        </div>
    </div>
    
    ${
      status === "success"
        ? `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        Your trading balance has been updated and you can now start trading. 
        Thank you for choosing Future Capital Market!
    </p>
    `
        : status === "pending"
        ? `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        We're processing your deposit and will notify you once it's completed. 
        This usually takes a few minutes to a few hours depending on your payment method.
    </p>
    `
        : `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        If you believe this is an error, please contact our support team immediately. 
        We're here to help resolve any issues with your deposit.
    </p>
    `
    }
  `;

  return getBaseEmailTemplate(
    content,
    "Deposit Confirmation",
    "Transaction Details"
  );
};

// Withdrawal confirmation template
export const getWithdrawalConfirmationTemplate = (
  amount,
  method,
  account,
  transactionId,
  name,
  status = "pending"
) => {
  const statusClass =
    status === "success"
      ? "status-success"
      : status === "pending"
      ? "status-pending"
      : "status-failed";
  const statusText =
    status === "success"
      ? "Completed"
      : status === "pending"
      ? "Processing"
      : "Failed";

  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${name},
    </p>
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Your withdrawal request has been ${
          status === "success"
            ? "successfully processed"
            : status === "pending"
            ? "received and is being processed"
            : "failed"
        }. 
        ${
          status === "success"
            ? "The funds have been sent to your specified account."
            : ""
        }
    </p>
    
    <div class="transaction-card">
        <div style="text-align: center; margin-bottom: 20px;">
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="amount">$${amount}</div>
        
        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">Transaction ID -</span>
                <span class="detail-value">${transactionId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Withdrawal Method -</span>
                <span class="detail-value">${method}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Account Details -</span>
                <span class="detail-value">${account}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time -</span>
                <span class="detail-value">${new Date().toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  }
                )}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status -</span>
                <span class="detail-value">${statusText}</span>
            </div>
        </div>
    </div>
    
    ${
      status === "success"
        ? `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        Your withdrawal has been completed successfully. The funds should appear in your account within 1-3 business days.
    </p>
    `
        : status === "pending"
        ? `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        We're processing your withdrawal request. This usually takes 1-3 business days depending on your withdrawal method.
    </p>
    `
        : `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        If you believe this is an error, please contact our support team immediately. 
        We're here to help resolve any issues with your withdrawal.
    </p>
    `
    }
  `;

  return getBaseEmailTemplate(
    content,
    "Withdrawal Confirmation",
    "Transaction Details"
  );
};

// Staking notification template
export const getStakingNotificationTemplate = (
  amount,
  asset,
  status,
  name,
  stakeId
) => {
  const statusClass =
    status === "Completed" ? "status-completed" : "status-ongoing";
  const statusText = status === "Completed" ? "Completed" : "Ongoing";

  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${name},
    </p>
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        ${
          status === "Completed"
            ? "Congratulations! Your staking period has come to an end and you have received your final returns."
            : "Great news! You have received your monthly staking returns."
        }
    </p>
    
    <div class="transaction-card">
        <div style="text-align: center; margin-bottom: 20px;">
            <span class="status-badge ${statusClass}">${statusText}</span>
        </div>
        
        <div class="amount">$${amount}</div>
        
        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">Stake ID -</span>
                <span class="detail-value">${stakeId}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Asset -</span>
                <span class="detail-value">${asset}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Returns Type -</span>
                <span class="detail-value">${
                  status === "Completed" ? "Final Returns" : "Monthly Returns"
                }</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date & Time -</span>
                <span class="detail-value">${new Date().toLocaleString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  }
                )}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status -</span>
                <span class="detail-value">${statusText}</span>
            </div>
        </div>
    </div>
    
    ${
      status === "Completed"
        ? `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        🎉 Your staking journey with ${asset} has been completed successfully! 
        The final returns have been added to your trading balance. 
        Thank you for trusting Future Capital Market with your investments.
    </p>
    `
        : `
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        Your monthly staking returns have been added to your trading balance. 
        Your staking process is still ongoing and you'll continue to receive monthly returns.
    </p>
    `
    }
  `;

  return getBaseEmailTemplate(
    content,
    "Staking Update",
    "Investment Returns Notification"
  );
};

// Custom email template
export const getCustomEmailTemplate = (
  heading,
  content,
  recipientName = "User"
) => {
  const emailContent = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        Hello ${recipientName},
    </p>
    
    <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
        ${content}
    </div>
    
    <p style="font-size: 16px; color: #64748b; margin-top: 24px;">
        If you have any questions or need assistance, please don't hesitate to contact our support team.
    </p>
  `;

  return getBaseEmailTemplate(emailContent, heading, "Important Information");
};

// ID verification template for admin
export const getIDVerificationTemplate = (
  formData,
  frontIDSecureUrl,
  backIDSecureUrl,
  email,
  idType
) => {
  const content = `
    <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">
        New ID verification request received from a user.
    </p>
    
    <div class="transaction-card">
        <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 18px;">User Information</h3>
        
        <div class="transaction-details">
            <div class="detail-row">
                <span class="detail-label">Full Name -</span>
                <span class="detail-value">${formData.firstName} ${formData.lastName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email -</span>
                <span class="detail-value">${email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">ID Type -</span>
                <span class="detail-value">${idType}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Phone -</span>
                <span class="detail-value">${formData.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Address -</span>
                <span class="detail-value">${formData.addressLine1}, ${formData.city}, ${formData.stateProvince}, ${formData.country}</span>
            </div>
        </div>
    </div>
    
    <div style="margin: 24px 0;">
        <h3 style="color: #1e293b; margin-bottom: 16px; font-size: 18px;">ID Documents</h3>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <h4 style="color: #374151; margin-bottom: 12px;">Front ID Image</h4>
            <img src="${frontIDSecureUrl}" alt="Front ID" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0;">
        </div>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
            <h4 style="color: #374151; margin-bottom: 12px;">Back ID Image</h4>
            <img src="${backIDSecureUrl}" alt="Back ID" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #e2e8f0;">
        </div>
    </div>
    
    <div class="security-notice">
        <div class="security-notice-title">🔒 Admin Action Required</div>
        <div class="security-notice-text">
            Please review the submitted documents and verify the user's identity. 
            This verification is required for compliance and security purposes.
        </div>
    </div>
  `;

  return getBaseEmailTemplate(
    content,
    "ID Verification Request",
    "User Verification Required"
  );
};
