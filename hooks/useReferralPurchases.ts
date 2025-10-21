import { useState, useEffect } from 'react';
import { getPromoCodePurchases } from '../lib/api';
import { setClearReferralPurchases } from '../lib/clearUserData';

interface Buyer {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  amount: number;
  currency: string;
  paid_at: string;
}

interface PromoCodeData {
  promo_code: string;
  usage_count: number;
  totals_by_currency: Record<string, number>;
  buyers: Buyer[];
}

// Глобальное состояние для данных реферальных покупок
let globalPromoData: PromoCodeData | null = null;
let globalIsLoading = true;
let globalError: string | null = null;
let listeners: Array<() => void> = [];

// Функция для уведомления всех слушателей об изменении
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Функция для обновления состояния
const updateState = (updates: {
  promoData?: PromoCodeData | null;
  isLoading?: boolean;
  error?: string | null;
}) => {
  if (updates.promoData !== undefined) globalPromoData = updates.promoData;
  if (updates.isLoading !== undefined) globalIsLoading = updates.isLoading;
  if (updates.error !== undefined) globalError = updates.error;
  notifyListeners();
};

// Функция для получения данных реферальных покупок (вызывается только один раз)
let fetchPromise: Promise<void> | null = null;

const fetchReferralPurchases = async () => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        // Очищаем данные если нет токена
        updateState({ promoData: null, isLoading: false, error: "Нет токена доступа" });
        return;
      }
      
      updateState({ isLoading: true, error: null });
      const response = await getPromoCodePurchases(accessToken);
      updateState({ promoData: response, isLoading: false });
    } catch (err) {
      console.error("Ошибка загрузки данных реферальных покупок:", err);
      updateState({ error: "Ошибка загрузки данных реферальных покупок", isLoading: false });
    }
  })();
  
  return fetchPromise;
};

// Функция для принудительного обновления данных
const refreshReferralPurchases = async () => {
  fetchPromise = null; // Сбрасываем кэш
  return fetchReferralPurchases();
};

// Функция для очистки данных (при выходе из аккаунта)
const clearReferralPurchases = () => {
  globalPromoData = null;
  globalIsLoading = true;
  globalError = null;
  fetchPromise = null;
  notifyListeners();
};

// Кастомный хук
export const useReferralPurchases = () => {
  const [promoData, setPromoData] = useState(globalPromoData);
  const [isLoading, setIsLoading] = useState(globalIsLoading);
  const [error, setError] = useState(globalError);

  useEffect(() => {
    // Регистрируем функцию очистки
    setClearReferralPurchases(clearReferralPurchases);
    
    // Добавляем слушателя
    const listener = () => {
      setPromoData(globalPromoData);
      setIsLoading(globalIsLoading);
      setError(globalError);
    };
    
    listeners.push(listener);
    
    // Инициализируем значения
    listener();
    
    // Функция для проверки токена и загрузки данных
    const checkTokenAndLoad = () => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        // Запускаем загрузку данных только один раз
        if (globalIsLoading) {
          fetchReferralPurchases();
        }
      } else {
        // Очищаем данные если нет токена
        clearReferralPurchases();
      }
    };
    
    // Проверяем токен при инициализации
    checkTokenAndLoad();
    
    // Слушаем изменения в localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'access_token') {
        checkTokenAndLoad();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      // Удаляем слушателя
      listeners = listeners.filter(l => l !== listener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { 
    promoData, 
    isLoading, 
    error,
    refreshReferralPurchases,
    clearReferralPurchases
  };
};
