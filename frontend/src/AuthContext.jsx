import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // on mount, attempt to use the current user
  useEffect(() => {
    fetch("http://localhost:3000/auth/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

//Custom hook
export const useAuth = () => useContext(AuthContext);
