"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { getBookList } from "@/lib/api";

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
  const [isChecking, setIsChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [bookData, setBookData] = useState<BookData | null>(null);

  useEffect(() => {
    const checkBookAccess = async () => {
      try {
        // Проверяем, есть ли токен доступа
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          console.log("❌ Нет токена доступа, перенаправляем на главную");
          router.push("/");
          return;
        }

        // Получаем данные о книгах
        const books = await getBookList(accessToken);
        
        if (books && books.length > 0) {
          const book = books[0]; // Берем первую книгу
          setBookData(book); // Сохраняем данные книги
          
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
      } catch (error) {
        console.error("Ошибка проверки доступа к книге:", error);
        router.push("/profile");
      } finally {
        setIsChecking(false);
      }
    };

    checkBookAccess();
  }, [router]);

  // Показываем загрузку во время проверки
  if (isChecking) {
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
  if (hasAccess) {
    return (
      <BookContext.Provider value={{ bookData, isLoading: isChecking }}>
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
