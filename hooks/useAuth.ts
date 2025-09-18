// ✅ useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  first_name: string;
  last_name: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    refreshAuthStatus();
    window.addEventListener("authChange", refreshAuthStatus);
    return () => window.removeEventListener("authChange", refreshAuthStatus);
  }, []);

  const refreshAuthStatus = () => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");
    setIsAuthenticated(!!token);
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  };

  const login = (access: string, refresh: string, user: User) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("✅ Пользователь залогинился");
    window.dispatchEvent(new Event("authChange"));
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    console.log("👋 Пользователь разлогинился");
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
  };
}
