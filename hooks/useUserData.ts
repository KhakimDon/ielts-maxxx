import { useState, useEffect } from 'react';
import { getUserData, refreshToken } from '../lib/api';
import { setClearUserData, clearAllUserData } from '../lib/clearUserData';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

// Глобальное состояние для данных пользователя
let globalUser: User | null = null;
let globalIsAuthenticated = false;
let globalIsLoading = true;
let listeners: Array<() => void> = [];

// Функция для уведомления всех слушателей об изменении
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Функция для обновления состояния
const updateState = (updates: {
  user?: User | null;
  isAuthenticated?: boolean;
  isLoading?: boolean;
}) => {
  if (updates.user !== undefined) globalUser = updates.user;
  if (updates.isAuthenticated !== undefined) globalIsAuthenticated = updates.isAuthenticated;
  if (updates.isLoading !== undefined) globalIsLoading = updates.isLoading;
  notifyListeners();
};

// Функция для инициализации авторизации (вызывается только один раз)
let initPromise: Promise<void> | null = null;

const initializeAuth = async () => {
  if (initPromise) return initPromise;
  
  initPromise = (async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshTokenValue = localStorage.getItem("refresh_token");
      
      if (accessToken) {
        // Проверяем, не истек ли токен
        try {
          const userData = await getUserData(accessToken);
          console.log("🔄 Initialize Auth - Данные пользователя:", userData);
          updateState({ user: userData, isAuthenticated: true });
        } catch (error) {
          // Токен истек, пытаемся обновить
          if (refreshTokenValue) {
            try {
              const refreshResponse = await refreshToken(refreshTokenValue);
              localStorage.setItem("access_token", refreshResponse.access);
              
              const userData = await getUserData(refreshResponse.access);
              updateState({ user: userData, isAuthenticated: true });
            } catch (refreshError) {
              // Не удалось обновить токен, выходим
              logout();
            }
          } else {
            logout();
          }
        }
      } else {
        updateState({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.error("Ошибка инициализации авторизации:", error);
      logout();
    } finally {
      updateState({ isLoading: false });
    }
  })();
  
  return initPromise;
};

// Функция для логина
const login = async (access: string, refresh: string, userData?: User) => {
  try {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    
    // Если данные пользователя не переданы, получаем их с сервера
    if (!userData) {
      userData = await getUserData(access);
    }
    
    localStorage.setItem("user", JSON.stringify(userData));
    updateState({ user: userData, isAuthenticated: true });
    
    console.log("✅ Пользователь залогинился");
    console.log("📊 Данные пользователя:", userData);
    console.log("👤 Имя:", userData.first_name, userData.last_name);
    window.dispatchEvent(new Event("authChange"));
  } catch (error) {
    console.error("Ошибка при входе:", error);
    throw error;
  }
};

// Функция очистки данных
const clearUserData = () => {
  globalUser = null;
  globalIsAuthenticated = false;
  globalIsLoading = false;
  initPromise = null;
  notifyListeners();
};

// Функция для выхода
const logout = () => {
  console.log("🚪 Начинаем выход из аккаунта...");
  clearAllUserData();
  updateState({ user: null, isAuthenticated: false, isLoading: false });
  console.log("👋 Пользователь разлогинился");
  console.log("🔍 Состояние после выхода:", { globalUser, globalIsAuthenticated, globalIsLoading });
  window.dispatchEvent(new Event("authChange"));
};

// Функция для обновления статуса авторизации
const refreshAuthStatus = () => {
  const token = localStorage.getItem("access_token");
  const userData = localStorage.getItem("user");
  updateState({ isAuthenticated: !!token });
  if (userData) {
    updateState({ user: JSON.parse(userData) });
  } else {
    updateState({ user: null });
  }
};

// Функция для получения токена доступа
const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// Кастомный хук
export const useUserData = () => {
  const [user, setUser] = useState(globalUser);
  const [isAuthenticated, setIsAuthenticated] = useState(globalIsAuthenticated);
  const [isLoading, setIsLoading] = useState(globalIsLoading);

  useEffect(() => {
    // Регистрируем функцию очистки
    setClearUserData(clearUserData);
    
    // Добавляем слушателя
    const listener = () => {
      setUser(globalUser);
      setIsAuthenticated(globalIsAuthenticated);
      setIsLoading(globalIsLoading);
    };
    
    listeners.push(listener);
    
    // Инициализируем значения
    listener();
    
    // Запускаем инициализацию авторизации только один раз
    if (globalIsLoading) {
      initializeAuth();
    }
    
    // Добавляем слушатель событий
    window.addEventListener("authChange", refreshAuthStatus);
    
    return () => {
      // Удаляем слушателя
      listeners = listeners.filter(l => l !== listener);
      window.removeEventListener("authChange", refreshAuthStatus);
    };
  }, []);

  return { 
    user, 
    isAuthenticated, 
    isLoading,
    login,
    logout,
    getAccessToken
  };
};
