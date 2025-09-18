// ✅ useAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserData, refreshToken } from "@/lib/api";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
    window.addEventListener("authChange", refreshAuthStatus);
    return () => window.removeEventListener("authChange", refreshAuthStatus);
  }, []);

  const initializeAuth = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshTokenValue = localStorage.getItem("refresh_token");
      
      if (accessToken) {
        // Проверяем, не истек ли токен
        try {
          const userData = await getUserData(accessToken);
          console.log("🔄 Initialize Auth - Данные пользователя:", userData);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Токен истек, пытаемся обновить
          if (refreshTokenValue) {
            try {
              const refreshResponse = await refreshToken(refreshTokenValue);
              localStorage.setItem("access_token", refreshResponse.access);
              
              const userData = await getUserData(refreshResponse.access);
              setUser(userData);
              setIsAuthenticated(true);
            } catch (refreshError) {
              // Не удалось обновить токен, выходим
              logout();
            }
          } else {
            logout();
          }
        }
      }
    } catch (error) {
      console.error("Ошибка инициализации авторизации:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

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

  const login = async (access: string, refresh: string, userData?: User) => {
    try {
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      
      // Если данные пользователя не переданы, получаем их с сервера
      if (!userData) {
        userData = await getUserData(access);
      }
      
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log("✅ Пользователь залогинился");
      console.log("📊 Данные пользователя:", userData);
      console.log("👤 Имя:", userData.first_name, userData.last_name);
      window.dispatchEvent(new Event("authChange"));
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    console.log("👋 Пользователь разлогинился");
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
}
