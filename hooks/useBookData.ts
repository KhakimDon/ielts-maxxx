import { useState, useEffect } from 'react';
import { getBookList } from '../lib/api';
import { setClearBookData } from '../lib/clearUserData';

interface BookData {
  id: number;
  title: string;
  slug: string;
  is_purchased: boolean;
}

// Глобальное состояние для данных книг
let globalBookData: BookData[] | null = null;
let globalIsLoading = true;
let globalError: string | null = null;
let listeners: Array<() => void> = [];

// Функция для уведомления всех слушателей об изменении
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

// Функция для обновления состояния
const updateState = (updates: {
  bookData?: BookData[] | null;
  isLoading?: boolean;
  error?: string | null;
}) => {
  if (updates.bookData !== undefined) globalBookData = updates.bookData;
  if (updates.isLoading !== undefined) globalIsLoading = updates.isLoading;
  if (updates.error !== undefined) globalError = updates.error;
  notifyListeners();
};

// Функция для получения данных книг (вызывается только один раз)
let fetchPromise: Promise<void> | null = null;

const fetchBookData = async () => {
  if (fetchPromise) return fetchPromise;
  
  fetchPromise = (async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        updateState({ bookData: null, isLoading: false, error: "Нет токена доступа" });
        return;
      }
      
      updateState({ isLoading: true, error: null });
      const books = await getBookList(accessToken);
      updateState({ bookData: books, isLoading: false });
    } catch (err) {
      console.error("Ошибка загрузки данных книги:", err);
      updateState({ error: "Ошибка загрузки данных книги", isLoading: false });
    }
  })();
  
  return fetchPromise;
};

// Функция для принудительного обновления данных
const refreshBookData = async () => {
  fetchPromise = null; // Сбрасываем кэш
  return fetchBookData();
};

// Функция очистки данных
const clearBookData = () => {
  globalBookData = null;
  globalIsLoading = true;
  globalError = null;
  fetchPromise = null;
  notifyListeners();
};

// Кастомный хук
export const useBookData = () => {
  const [bookData, setBookData] = useState(globalBookData);
  const [isLoading, setIsLoading] = useState(globalIsLoading);
  const [error, setError] = useState(globalError);

  useEffect(() => {
    // Регистрируем функцию очистки
    setClearBookData(clearBookData);
    
    // Добавляем слушателя
    const listener = () => {
      setBookData(globalBookData);
      setIsLoading(globalIsLoading);
      setError(globalError);
    };
    
    listeners.push(listener);
    
    // Инициализируем значения
    listener();
    
    // Запускаем загрузку данных только один раз
    if (globalIsLoading) {
      fetchBookData();
    }
    
    return () => {
      // Удаляем слушателя
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return { 
    bookData, 
    isLoading, 
    error,
    refreshBookData
  };
};
