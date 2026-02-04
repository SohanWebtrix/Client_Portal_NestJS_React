// src/components/ForgotPassword.jsx
import React, { useState,useRef } from "react";
import { FaEnvelope, FaArrowRight, FaLock,FaArrowLeft,FaEye, FaEyeSlash } from "react-icons/fa";
import "./ForgotPassword.css";

import UserIllustration from "./assets/UserLogin.png";
import Logo from "./assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // ⭐ Added step control
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
    const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);


  /* STEP 1 → SEND RESET LINK */
  const handleEmailSubmit = () => {
    if (!email) {
      alert("Please enter your registered email.");
      return;
    }
    setStep(2); // ⭐ Move to OTP page
  };

 const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next box automatically
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  /* STEP 2 → VERIFY OTP */
  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    alert("OTP Verified!");
    setStep(3); // ⭐ Move to New Password page
  };


  /* STEP 3 → RESET PASSWORD */
  const handlePasswordReset = () => {
    if (!newPass || !confirmPass) {
      alert("Please fill all fields");
      return;
    }
    if (newPass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    alert("Password reset successfully!");
  };

  return (
    <div className="auth-split-container">
      {/* LEFT SIDE UI */}
      <div className="marketing-banner-side">
        <img
          src={UserIllustration}
          alt="Support Illustration"
          className="marketing-banner-image"
        />
        <h2 className="marketing-banner-heading">
          Streamline Your
          <br /> Support
        </h2>
        <p className="marketing-banner-text">
          Welcome to the future of ticket management.
          <br />
          Webtrix24 empowers your team to deliver
          <br />
          exceptional customer service.
        </p>

        <div className="feature-list">
          <p>⚡ Faster Ticket Resolutions</p>
          <p>📋 Track All Customer Issues</p>
          <p>🔄 24×7 Support Workflow</p>
          <p>🔔 Real-time Updates & Alerts</p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="verification-form-side">
       

          {/* Logo */}
          <img src={Logo} alt="Webtrix24 Logo" className="app-header-logo" />
                   
 <div className="form-content-area">
          {/* STEP 1: EMAIL FORM */}
          {step === 1 && (
            <>

     <div className="mobile-icon-highlight fixed-icon">
                <FaEnvelope size={30} />
              </div>

              <h3 className="page-main-title">Forgot Password?</h3>

              <p className="page-sub-text">
                Enter your registered email and we’ll send you
                <br /> instructions to reset your password.
              </p>

              <div className="code-input-group">
                <label className="code-input-label">Email Address</label>
                <input
                  type="email"
                  className="forgot-input-box"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="action-verify-button" onClick={handleEmailSubmit}>
                <FaArrowRight /> Send Reset Link
              </button>
              <a href="/" className="back">
                 <FaArrowLeft />  Back to Password Login
              </a>
            </>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 2 && (
            <>
              <div className="mobile-icon-highlight fixed-icon">
                <FaLock size={30} />
              </div>

              <h3 className="page-tl">Verify OTP</h3>

              <p className="page-sub-text">
                A 6-digit verification code was sent to:
                <br />
                <b>{email}</b>
              </p>

              <div className="code-input-group">
                <label style={{textAlign:"center"}}>Enter OTP</label>
<div className="otp-box">
                    {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            className="single-otp-box"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
</div>
              </div>

              <button className="action-verify-button" onClick={handleOtpSubmit}>
                <FaArrowRight /> Verify OTP
              </button>

              <button className="back-btn" onClick={() => setStep(1)}>
                <FaArrowLeft />  Back
              </button>
            </>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
          <>
      <div className="mobile-icon-highlight fixed-icon">
        <FaLock size={30} />
      </div>

      <h3 className="page-title">Reset Password</h3>

      <div className="code-input-group">
        <label className="code-input-label">New Password</label>
        <div className="password-input-wrapper">
          <input
            type={showNewPass ? "text" : "password"}
            className="forgot-input-box"
            placeholder="Enter new password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowNewPass(!showNewPass)}
          >
            {showNewPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <div className="code-input-group">
        <label className="code-input-label">Confirm Password</label>
        <div className="password-input-wrapper">
          <input
            type={showConfirmPass ? "text" : "password"}
            className="forgot-input-box"
            placeholder="Confirm password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowConfirmPass(!showConfirmPass)}
          >
            {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      </div>

      <button className="action-verify-button" onClick={handlePasswordReset}>
        <FaArrowRight /> Reset Password
      </button>

      <button className="back-btn" onClick={() => setStep(2)}>
        <FaArrowLeft /> Back
      </button>
    </>
          )}

          {/* Footer note */}
          <div className="secure-footer-note">
            <FaLock /> Your information is securely encrypted.
          </div>
        </div>
      </div>
    </div>
  );
}
