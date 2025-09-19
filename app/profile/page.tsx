"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { getBookList } from "@/lib/api";

interface BookData {
  id: number;
  title: string;
  slug: string;
  is_purchased: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookData = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const books = await getBookList(accessToken);
        // Берем первую книгу (у нас всего одна)
        if (books && books.length > 0) {
          setBookData(books[0]);
        }
      } catch (err) {
        console.error("Ошибка загрузки данных книги:", err);
        setError("Ошибка загрузки данных книги");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []); // Пустой массив зависимостей - выполняется только один раз

  const handleReadBook = () => {
    router.push("/book");
  };

  const handleBuyBook = () => {
    // Пока что ничего не происходит
    console.log("Купить книгу - функционал в разработке");
  };

  const handleJoinChannel = () => {
    // Пока что ничего не происходит
    console.log("Зайти на канал - функционал в разработке");
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white font-atyp px-6 sm:px-12 py-10 flex flex-col items-center">
      <h2 className="text-3xl mt-[50px] sm:text-4xl font-bold text-[#fca311] text-center mb-8">
        КНИГИ
      </h2>

      <div className="w-full max-w-7xl justify-center items-center flex flex-col gap-8">
        {loading ? (
          <div className="w-[90%] border border-[#fca311] rounded-md p-4 flex flex-col md:flex-row items-center gap-10">
            <div className="animate-pulse bg-gray-700 w-40 h-60 rounded"></div>
            <div className="flex-1 w-full">
              <div className="animate-pulse bg-gray-700 h-8 w-64 mb-4 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-4 w-full mb-2 rounded"></div>
              <div className="animate-pulse bg-gray-700 h-4 w-3/4 rounded"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            {error}
          </div>
        ) : bookData ? (
          <div className="w-[90%] border border-[#fca311] rounded-md p-4 flex flex-col md:flex-row items-center gap-10">
            <Image
              className="scale-y-[1.5] scale-x-[1.5]"
              src="/bookd.png"
              alt="book"
              width={160}
              height={240}
            />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-white !font-[var(--font-atyp)] font-bold! text-[30px]">
                  {bookData.title} <span className="text-[#fca311]">1.0</span>
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fca311" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
              </div>
              <p className="text-sm mt-1 !font-[var(--font-atyp)] font-normal">
                Ты участвуешь в розыгрыше Гелика.
                <br />
                При продаже 3000 книг, запуститься рандомайзер и выберем победителя.
              </p>
              <div className="flex flex-wrap gap-5 mt-4 mb-2">
                {bookData.is_purchased ? (
                  <>
                    <button 
                      onClick={handleJoinChannel}
                      className="bg-[#2196F3] cursor-pointer text-white !font-[var(--font-atyp)] font-bold! tracking-wider px-4 py-2 rounded-md text-sm flex items-center gap-1"
                    >
                      Зайти на канал
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M21.426 11.096 3.203 3.367c-.653-.27-1.263.158-1.05.98l2.385 9.737c.109.444.432.718.89.718.171 0 .345-.037.516-.108l3.72-1.58 1.65 4.95c.18.53.57.82 1.065.82.45 0 .848-.244 1.014-.62l2.13-4.88 4.638 2.317c.147.073.3.11.45.11.45 0 .832-.3.99-.765.162-.477-.01-1.017-.49-1.38l-4.573-3.24 4.837-2.062c.4-.17.6-.483.593-.833-.01-.36-.22-.672-.563-.83z" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleReadBook}
                      className="bg-[#fca311] cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-4 py-2 rounded-md text-sm"
                    >
                      Читать
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleBuyBook}
                    className="bg-[#fca311] cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-4 py-2 rounded-md text-sm"
                  >
                    Купить книгу
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            Книги не найдены
          </div>
        )}
      </div>
      </main>
    </ProtectedRoute>
  );
}
