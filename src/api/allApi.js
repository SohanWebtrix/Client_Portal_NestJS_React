import { LOCAL_FORM_API } from "../config/config";


export async function sentOTPAPI({ phone }) {
    return fetch(`${LOCAL_FORM_API}/auth/request-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mobile: phone,
        })
    })
}



export async function ResentOTP({ phone }) {
    return fetch(`${LOCAL_FORM_API}/auth/resend-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mobile: phone,
        })
    })
}


export async function logoutAPI() {
    return fetch(`${LOCAL_FORM_API}/auth/logout`, {
        method: "POST",
        credentials: "include",

        headers: {
            "Content-Type": "application/json",
        },

    })
}

export async function VerifyOtp({ mobile, otp }) {
    return fetch(`${LOCAL_FORM_API}/auth/verify-otp`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mobile,
            otp,
        })
    })
}


export async function VerifyOtpEmail({ email, otp }) {
    return fetch(`${LOCAL_FORM_API}/auth/verify-otp-email`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            otp,
        })
    })
}


export async function ResetPassword({ newpassword }) {
    return fetch(`${LOCAL_FORM_API}/auth/reset-password`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            newpassword,
        })
    })
}

export async function SignInUser({ validemail, validPass }) {
    return fetch(`${LOCAL_FORM_API}/auth/verifyUser`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            validemail,
            validPass,
        })
    })
}


export async function ForgotPasswordEmail({ emailid }) {
    return fetch(`${LOCAL_FORM_API}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            emailid,
        })
    })
}



