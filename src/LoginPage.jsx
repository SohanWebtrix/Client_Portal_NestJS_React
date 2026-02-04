// src/components/AuthPage.jsx
import React, { useState } from 'react';
import {
    FaEnvelope, FaLock, FaEye, FaKey, FaMobileAlt, FaSignInAlt,
    FaEyeSlash, FaPaperPlane, FaPhoneAlt, FaArrowLeft
} from "react-icons/fa";
import './LoginPage.css';
// Ensure these image paths are correct relative to AuthPage.jsx
import UserIllustration from './assets/UserLogin.png';
import Logo from './assets/logo.png';
import { sentOTPAPI, VerifyOtp } from './api/allApi';
// New image for OTP illustration


// --- Sub-Component 1: The Password Login Form ---
const PasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const handleSignIn = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



        if (!emailPattern.test(email)) {

            alert("⚠ Please enter a valid email (example: name@gmail.com)");

            return;

        }
        if (!email.trim() || !password.trim()) {
            alert("⚠ Please fill in all fields.");
            return;
        }
        if (remember) {
            localStorage.setItem("savedEmail", email);
        }
        alert("🎉 Login Successful!");
    };

    return (
        <div className="form-wrapper">
            {/* EMAIL */}
            <div className="form-group">
                <label className="input-lb" htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                    <FaEnvelope className="input-left-icon" />
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        className="input-fd with-left-icon"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* PASSWORD */}
            <div className="form-group">
                <label className="input-lb" htmlFor="password">Password</label>
                <div className="input-with-icon password-input-group">
                    <FaLock className="left-icon" />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className="input-fd with-left-icon"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="right-eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            </div>

            {/* REMEMBER + FORGOT PASSWORD */}
            <div className="flex-row-space-between-footer">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={remember}
                        onChange={() => setRemember(!remember)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                </label>
                <b>
                    <a href="/forgot-password" className="forgot-password-link" >
                        Forgot password?
                    </a>
                </b>
            </div>

            {/* SIGN IN BUTTON */}
            <button className="sign-btn" onClick={handleSignIn}>
                <FaSignInAlt /> Sign In
            </button>
        </div>
    );
};

const OTPForm = ({ setActiveTab }) => {
    const [phone, setPhone] = useState("");
    const [otpSent, setOtpSent] = useState(false); // NEW
    const [otp, setOtp] = useState(["", "", "", "", "", ""]); // NEW

    const handleSendOTP = async (phone) => {
        if (!phone.trim() || phone.length !== 10) {
            alert("⚠ Please enter a valid 10-digit mobile number.");
            return;
        }
        try {
            const response = await sentOTPAPI({ phone });
            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to send OTP");
                return
            }

            setOtpSent(true); // move to OTP screen
            alert("📩 OTP sent successfully!");
        }

        catch (error) {
            console.error(error);
            alert("❌ Server error. Please try again.");
        }

    };

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto focus next
        if (value && index < 5) {
            const nextField = document.getElementById(`otp-${index + 1}`);
            nextField?.focus();
        }
    };

    const handleVerify = async () => {
        const finalOtp = otp.join("");
        if (finalOtp.length !== 6) {
            alert("❌ Enter full 6-digit OTP");
            return;
        }

        try {
            const res = await VerifyOtp({
                mobile: phone,
                otp: finalOtp,
            })
            const data = await res.json()

            if (!res.ok) {
                alert(`${data.message}`)
                return
            }
            alert("✅ OTP Verified Successfully!");

            // 🔐 SAVE TOKEN
            localStorage.setItem("token", data.token);

            // 👉 redirect to dashboard
            // navigate("/dashboard");

        } catch (err) {
            console.error(err);
            alert("❌ Something went wrong");
        }

    };

    const handleResend = () => {
        alert("🔄 OTP Resent!");
    };

    return (
        <div className="form-wrapper">

            {/* IF OTP NOT SENT — Show Mobile Input */}
            {!otpSent && (
                <>
                    <div className="phone-icon-box">
                        <FaMobileAlt className="tab-icon" />
                    </div>

                    <div className="otp-heading-section">
                        <h3 className="section-title">Login with OTP</h3>
                        <p className="subtitle-small">Enter your registered mobile number</p>
                    </div>

                    <div className="form-group">
                        <label className="input-lb">Mobile Number</label>
                        <div className="input-with-icon">
                            <FaPhoneAlt className="input-left-icon" />
                            <input
                                type="tel"
                                className="input-fd with-left-icon"
                                placeholder="+91 98765 43210"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                                maxLength={10}
                            />
                        </div>
                    </div>

                    <button className="sign-btn" onClick={() => handleSendOTP(phone)}>
                        <FaPaperPlane size={20} color="#fff" />
                        Send OTP
                    </button>
                </>
            )}

            {/* IF OTP SENT — SHOW OTP BOXES */}
            {otpSent && (
                <>
                    <div className="phone-icon-box">
                        <FaMobileAlt className="tab-icon" />
                    </div>

                    <h3 className="section-title">Enter OTP</h3>
                    <p className="subtitle-small">
                        OTP sent to <b>+91 {phone}</b>
                    </p>

                    <div className="otp-box-container">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                className="otp-input-box"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => {
                                    if (e.key === "Backspace") {
                                        if (otp[index] === "") {
                                            // Move to previous box
                                            if (index > 0) {
                                                const prev = document.getElementById(`otp-${index - 1}`);
                                                prev?.focus();

                                                // Also delete previous value
                                                const newOtp = [...otp];
                                                newOtp[index - 1] = "";
                                                setOtp(newOtp);
                                            }
                                        }
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <button className="sign-btn" onClick={handleVerify}>
                        Verify Now
                    </button>

                    <button className="resend-btn" onClick={handleResend}>
                        Resend OTP
                    </button>
                </>
            )}

            {/* Back Link */}
            <div
                className="back-link"
                onClick={() => setActiveTab('password')}
            >
                <FaArrowLeft />  Back to Password Login
            </div>
        </div>
    );
};

// --- Master Component: AuthPage ---
export default function AuthPage() {
    const [activeTab, setActiveTab] = useState('password');

    return (
        <div className="login-wrapper">

            {/* LEFT PANEL (STATIC) */}
            <div className="left-panel">
                <img src={UserIllustration} alt="Support Illustration" className="left-image" />
                <h2 className="left-title">
                    Streamline Your<br />Support
                </h2>
                <p className="left-desc">
                    Welcome to the future of ticket management.<br />
                    Webtrix24 empowers your team to deliver<br />
                    exceptional customer service.
                </p>
                <div className="left-list">
                    <p>⚡ Faster Ticket Resolutions</p>
                    <p>📋 Track All Customer Issues</p>
                    <p>🔄 24x7 Support Workflow</p>
                    <p>🔔 Real-time Updates & Alerts</p>
                </div>
            </div>

            {/* RIGHT PANEL (Login Form) - Position stable */}
            <div className="right-panel">
                <div className="form-content-wrap">

                    {/* FIXED POSITION ELEMENTS */}
                    <img src={Logo} alt="Webtrix24 Logo" className="logo-img" />
                    <h3>Welcome Back!</h3>
                    <p className="subtitle">Login to manage your support tickets.</p>

                    {/* FIXED TAB POSITION */}
                    <div className="login-tabs" data-active-tab={activeTab}>
                        <button
                            onClick={() => setActiveTab('password')}
                            className={activeTab === 'password' ? "active-tab-button" : "inactive-tab-link"}
                        >
                            <FaKey className="tab-icon" /> Password
                        </button>
                        <button
                            onClick={() => setActiveTab('otp')}
                            className={activeTab === 'otp' ? "active-tab-button" : "inactive-tab-link"}
                        >
                            <FaMobileAlt className="tab-icon" /> OTP
                        </button>
                    </div>

                    {/* DYNAMIC FORM AREA WITH MIN-HEIGHT */}
                    <div className="form-content-area">
                        {activeTab === 'password' ? (
                            <PasswordForm />
                        ) : (
                            <OTPForm setActiveTab={setActiveTab} />
                        )}
                    </div>

                    {/* FOOTER NOTE - Also needs to be fixed at the bottom, outside dynamic content */}
                    <div className="secure-note">
                        <FaLock /> Your login information is always secure.
                    </div>
                </div>
            </div>
        </div>
    );
}