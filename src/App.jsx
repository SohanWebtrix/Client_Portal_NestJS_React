import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import ForgotPassword from "./ForgotPassword.jsx";

function App() {
  return (

<Routes>
  <Route path="/" element={<LoginPage />} />
  {/* <Route path="/login-page" element={<LoginPage />} /> */}
  {/* <Route path="/otp-login" element={<OtpLogin/>}/> */}
  <Route path="/forgot-password" element={<ForgotPassword />} />
</Routes>

   
  );
}

export default App;
