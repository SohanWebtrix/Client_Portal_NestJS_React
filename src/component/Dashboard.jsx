import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_FORM_API } from "../config/config";
import { fetchWithAuth } from "../api/fetchWithAuth"; // 👈 wherever you place it

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchWithAuth(`${LOCAL_FORM_API}/auth/profile`)
      .then((res) => {
        if (!res.ok) {
          navigate("/");
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>📊 Dashboard</h1>
      <p>You are logged in.</p>
    </div>
  );
};

export default Dashboard;
