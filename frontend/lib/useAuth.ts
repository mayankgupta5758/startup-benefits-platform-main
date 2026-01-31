import { useState, useEffect } from "react";
import { getToken, getUser, setUser } from "./api";

export function useAuth() {
  const [user, setUserState] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userData = getUser();
      setUserState(userData);
    }
    setLoading(false);
  }, []);

  const updateUser = (userData: any) => {
    setUserState(userData);
    setUser(userData);
  };

  return {
    user,
    loading,
    updateUser,
    isAdmin: user?.isAdmin || false,
  };
}
