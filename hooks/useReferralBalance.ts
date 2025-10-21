import { useState, useEffect } from 'react';
import { getReferralSummary } from '../lib/api';
import { setClearReferralBalance } from '../lib/clearUserData';

interface ReferralBalance {
  uzs: number;
  usd: number;
}

interface Payment {
  id: number;
  buyer: {
    first_name: string;
    last_name: string;
  };
  amount: string;
  currency: string;
  paid_at: string;
  reward_amount: number;
}

interface ReferralData {
  balance: ReferralBalance;
  code: string;
  total_referrals: number;
}

// Глобальное состояние для реферальных данных
let globalReferralData: ReferralData | null = null;
let globalIsLoading = true;
let globalError: string | null = null;
let listeners: Array<() => void> = [];

// Функция для уведомления всех слушателей об изменении
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Функция для обновления состояния
const updateState = (updates: {
  referralData?: ReferralData | null;
  isLoading?: boolean;
  error?: string | null;
}) => {
  if (updates.referralData !== undefined) globalReferralData = updates.referralData;
  if (updates.isLoading !== undefined) globalIsLoading = updates.isLoading;
  if (updates.error !== undefined) globalError = updates.error;
  notifyListeners();
};

// Функция для получения реферального баланса (вызывается только один раз)
let fetchPromise: Promise<void> | null = null;

const fetchReferralBalance = async () => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        updateState({ referralData: null, isLoading: false, error: "Нет токена доступа" });
        return;
      }
      
      updateState({ isLoading: true, error: null });
      
      // Получаем баланс в обеих валютах параллельно
      const [uzsResponse, usdResponse] = await Promise.all([
        getReferralSummary(accessToken, 'uzs'),
        getReferralSummary(accessToken, 'usd')
      ]);
      
      updateState({ 
        referralData: {
          balance: {
            uzs: parseFloat(uzsResponse.balance_uzs),
            usd: parseFloat(usdResponse.converted_balance.amount) // Берем amount из converted_balance USD запроса
          },
          code: uzsResponse.code,
          total_referrals: uzsResponse.total_referrals
        }, 
        isLoading: false 
      });
    } catch (err) {
      console.error("Ошибка загрузки реферальных данных:", err);
      updateState({ error: "Ошибка загрузки реферальных данных", isLoading: false });
    }
  })();
  
  return fetchPromise;
};

// Функция для принудительного обновления данных
const refreshReferralBalance = async () => {
  fetchPromise = null; // Сбрасываем кэш
  return fetchReferralBalance();
};

// Функция для очистки данных (при выходе из аккаунта)
const clearReferralBalance = () => {
  globalReferralData = null;
  globalIsLoading = true;
  globalError = null;
  fetchPromise = null;
  notifyListeners();
};

// Кастомный хук
export const useReferralBalance = () => {
  const [referralData, setReferralData] = useState(globalReferralData);
  const [isLoading, setIsLoading] = useState(globalIsLoading);
  const [error, setError] = useState(globalError);

  useEffect(() => {
    // Регистрируем функцию очистки
    setClearReferralBalance(clearReferralBalance);
    
    // Добавляем слушателя
    const listener = () => {
      setReferralData(globalReferralData);
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
          fetchReferralBalance();
        }
      } else {
        // Очищаем данные если нет токена
        clearReferralBalance();
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
    referralData,
    isLoading, 
    error,
    refreshReferralBalance,
    clearReferralBalance
  };
};
