import { useState, useEffect } from 'react';
import { getOrderCount } from '../lib/api';
import { setClearOrderCount } from '../lib/clearUserData';

// Глобальное состояние для счетчика заказов
let globalOrderCount = 0;
let globalLoading = true;
let globalDisplayCount = 0;
let listeners: Array<() => void> = [];

// Функция для уведомления всех слушателей об изменении
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Функция для обновления состояния
const updateState = (updates: {
  orderCount?: number;
  loading?: boolean;
  displayCount?: number;
}) => {
  if (updates.orderCount !== undefined) globalOrderCount = updates.orderCount;
  if (updates.loading !== undefined) globalLoading = updates.loading;
  if (updates.displayCount !== undefined) globalDisplayCount = updates.displayCount;
  notifyListeners();
};

// Функция для получения данных (вызывается только один раз)
let fetchPromise: Promise<void> | null = null;

const fetchOrderCount = async () => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const response = await getOrderCount();
      updateState({ orderCount: response.order_count });
    } catch (error) {
      console.error('Ошибка получения количества заказов:', error);
      updateState({ orderCount: 0 });
    } finally {
      updateState({ loading: false });
      // Перезапускаем анимацию после получения данных
      setTimeout(() => startAnimation(true), 100);
    }
  })();
  
  return fetchPromise;
};

// Анимация счета цифр
let animationInterval: NodeJS.Timeout | null = null;
let lastAnimationState = '';

const startAnimation = (forceRestart = false) => {
  const currentState = `${globalLoading}-${globalOrderCount}`;
  
  // Если состояние не изменилось и не принудительный перезапуск, не делаем ничего
  if (!forceRestart && lastAnimationState === currentState) {
    return;
  }
  
  lastAnimationState = currentState;
  
  // Очищаем предыдущую анимацию
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }

  if (globalLoading) {
    // Во время загрузки - быстрый счет
    animationInterval = setInterval(() => {
      updateState({ displayCount: (globalDisplayCount + 1) % 10000 });
    }, 100);
  } else {
    // После загрузки - плавный переход к реальному значению
    const targetCount = globalOrderCount;
    const duration = 2000; // 2 секунды
    const steps = 50;
    const stepDuration = duration / steps;
    const stepValue = targetCount / steps;
    
    let currentStep = 0;
    animationInterval = setInterval(() => {
      currentStep++;
      const newValue = Math.floor(stepValue * currentStep);
      updateState({ displayCount: newValue });
      
      if (currentStep >= steps) {
        updateState({ displayCount: targetCount });
        clearInterval(animationInterval!);
        animationInterval = null;
      }
    }, stepDuration);
  }
};

// Функция очистки данных
const clearOrderCount = () => {
  globalOrderCount = 0;
  globalLoading = true;
  globalDisplayCount = 0;
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
  fetchPromise = null;
  notifyListeners();
};

// Кастомный хук
export const useOrderCount = () => {
  const [orderCount, setOrderCount] = useState(globalOrderCount);
  const [loading, setLoading] = useState(globalLoading);
  const [displayCount, setDisplayCount] = useState(globalDisplayCount);

  useEffect(() => {
    // Регистрируем функцию очистки
    setClearOrderCount(clearOrderCount);
    
    // Добавляем слушателя
    const listener = () => {
      const newOrderCount = globalOrderCount;
      const newLoading = globalLoading;
      const newDisplayCount = globalDisplayCount;
      
      setOrderCount(newOrderCount);
      setLoading(newLoading);
      setDisplayCount(newDisplayCount);
    };
    
    listeners.push(listener);
    
    // Инициализируем значения
    listener();
    
    // Запускаем загрузку данных только один раз
    if (globalLoading) {
      fetchOrderCount();
    }
    
    // Запускаем анимацию при первом подключении
    startAnimation(true);
    
    return () => {
      // Удаляем слушателя
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return { orderCount, loading, displayCount };
};
