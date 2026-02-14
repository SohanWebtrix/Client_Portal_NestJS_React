import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { LOCAL_FORM_API } from "../config/config";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [offline, setOffline] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, loading, setUser , offline }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook (best practice)
export const useAuth = () => {
  return useContext(AuthContext);
};
