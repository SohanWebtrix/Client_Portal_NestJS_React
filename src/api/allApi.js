import { LOCAL_FORM_API } from "../config/config";



export async function sentOTPAPI({phone}){
   return fetch(`${LOCAL_FORM_API}/auth/request-otp`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({
        mobile:phone,
    })
   })
}


export async function VerifyOtp({mobile,otp}){
   return fetch(`${LOCAL_FORM_API}/auth/verify-otp`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify({
        mobile,
        otp,
    })
   })
}