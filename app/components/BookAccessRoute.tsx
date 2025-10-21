"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useBookData } from "@/hooks/useBookData";

interface BookAccessRouteProps {
  children: React.ReactNode;
}

interface BookData {
  id: number;
  title: string;
  slug: string;
  is_purchased: boolean;
}

// Создаем контекст для передачи данных книги
const BookContext = createContext<{
  bookData: BookData | null;
  isLoading: boolean;
}>({
  bookData: null,
  isLoading: true,
});

export const useBookContext = () => useContext(BookContext);

export default function BookAccessRoute({ children }: BookAccessRouteProps) {
  const router = useRouter();
  const { bookData, isLoading, error } = useBookData();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Проверяем, есть ли токен доступа
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.log("❌ Нет токена доступа, перенаправляем на главную");
      router.push("/");
      return;
    }

    // Если данные загружены, проверяем доступ
    if (!isLoading && bookData) {
      if (bookData.length > 0) {
        const book = bookData[0]; // Берем первую книгу
        
        if (book.is_purchased) {
          console.log("✅ Книга куплена, доступ разрешен");
          setHasAccess(true);
        } else {
          console.log("❌ Книга не куплена, перенаправляем в профиль");
          router.push("/profile");
        }
      } else {
        console.log("❌ Книги не найдены, перенаправляем в профиль");
        router.push("/profile");
      }
    } else if (!isLoading && error) {
      console.error("Ошибка проверки доступа к книге:", error);
      router.push("/profile");
    }
  }, [bookData, isLoading, error, router]);

  // Показываем загрузку во время проверки
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-gray-400">Проверка доступа к книге...</p>
        </div>
      </div>
    );
  }

  // Если доступ есть, показываем содержимое с контекстом
  if (hasAccess && bookData) {
    return (
      <BookContext.Provider value={{ bookData: bookData[0], isLoading }}>
        {children}
      </BookContext.Provider>
    );
  }

  // Если доступа нет, показываем сообщение (хотя обычно происходит перенаправление)
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-2">Доступ запрещен</h1>
        <p className="text-gray-400 mb-4">У вас нет доступа к этой книге</p>
        <button
          onClick={() => router.push("/profile")}
          className="px-6 py-2 bg-[#fca311] text-black rounded-lg hover:bg-[#E8850A] transition-colors"
        >
          Перейти в профиль
        </button>
      </div>
    </div>
  );
}
