"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useBookData } from "@/hooks/useBookData";
import PaymentModal from "@/app/components/PaymentModal";
import AmbassadorSection from "@/app/components/AmbassadorSection";


export default function ProfilePage() {
  const router = useRouter();
  const { bookData, isLoading, error, refreshBookData } = useBookData();
  const [hasAttemptedPurchase, setHasAttemptedPurchase] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Получаем первую книгу (у нас всего одна)
  const currentBook = bookData && bookData.length > 0 ? bookData[0] : null;

  const handleReadBook = () => {
    router.push("/book");
  };

  const handleBuyBook = () => {
    if (!agreed) {
      alert("Необходимо принять условия соглашения для продолжения покупки");
      return;
    }
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    console.log("Оплата успешно инициирована");
    setHasAttemptedPurchase(true);
  };

  const handlePaymentError = (message: string) => {
    console.error("Ошибка оплаты:", message);
    // Можно добавить уведомление пользователю здесь
  };

  const handleJoinChannel = () => {
    // Пока что ничего не происходит
    console.log("Зайти на канал - функционал в разработке");
    window.location.href = "https://t.me/ielts_fucker";
  };

  const handleRefresh = () => {
    // Обновляем данные книг
    refreshBookData();
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white font-[var(--font-dm-sans)] px-4 sm:px-6 lg:px-12 py-6 sm:py-10 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#fca311] text-center mb-6 sm:mb-8 mt-8 sm:mt-[50px]">
        КНИГИ
      </h2>


      <div className="w-full max-w-7xl justify-center items-center flex flex-col gap-8">
        {isLoading ? (
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
        ) : currentBook ? (
          <div className="w-full sm:w-[90%] border border-[#fca311] rounded-md p-3 sm:p-4 flex flex-col md:flex-row items-center gap-6 sm:gap-10 relative">
            <Image
              className="scale-y-[1.2] scale-x-[1.2] sm:scale-y-[1.5] sm:scale-x-[1.5]"
              src="/bookd.png"
              alt="book"
              width={170}
              height={230}
            />
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start sm:items-center mb-3 sm:mb-0">
                <h3 className="text-white !font-[var(--font-atyp)] font-bold! text-xl sm:text-2xl lg:text-[30px] pr-2">
                  {currentBook.title} <span className="text-[#fca311]">1.0</span>
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fca311" className="size-8 sm:size-10 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                </svg>
              </div>
              <p className="text-sm mt-1 !font-[var(--font-atyp)] font-normal">
                Цена книги: 500 000 сум ($41). <br />
                После оплаты книга будет доступна в вашем личном кабинете.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-5 mt-4 mb-2">
                {currentBook.is_purchased ? (
                  <>
                    <button 
                      onClick={handleJoinChannel}
                      className="bg-[#2196F3] cursor-pointer text-white !font-[var(--font-atyp)] font-bold! tracking-wider px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm flex items-center gap-1 w-full sm:w-auto justify-center"
                    >
                      Зайти на канал
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M21.426 11.096 3.203 3.367c-.653-.27-1.263.158-1.05.98l2.385 9.737c.109.444.432.718.89.718.171 0 .345-.037.516-.108l3.72-1.58 1.65 4.95c.18.53.57.82 1.065.82.45 0 .848-.244 1.014-.62l2.13-4.88 4.638 2.317c.147.073.3.11.45.11.45 0 .832-.3.99-.765.162-.477-.01-1.017-.49-1.38l-4.573-3.24 4.837-2.062c.4-.17.6-.483.593-.833-.01-.36-.22-.672-.563-.83z" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleReadBook}
                      className="bg-[#fca311] cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Читать
                    </button>
                  </>
                ) : (
                  <div className="w-full">
                    {/* Десктопная версия - все в одной строке */}
                    <div className="hidden sm:flex flex-row gap-3 items-end">
                      {/* Условия соглашения и кнопка купить книгу в одной строке */}
                      <div className="flex items-end gap-3">
                        {/* Условия соглашения */}
                        <div className="text-sm flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="agreement-profile-desktop"
                            checked={agreed}
                            onChange={() => setAgreed(!agreed)}
                            className="accent-[#fca311] cursor-pointer"
                          />
                          <label htmlFor="agreement-profile-desktop" className="text-white cursor-pointer whitespace-nowrap">
                            Принимаю{" "}
                            <Link
                              href="/agreement"
                              target="_blank"
                              className="underline text-[#fca311] hover:text-white transition-colors"
                            >
                              УСЛОВИЯ СОГЛАШЕНИЯ
                            </Link>
                          </label>
                        </div>
                        
                        {/* Кнопка купить книгу */}
                        <button 
                          onClick={handleBuyBook}
                          disabled={!agreed}
                          className={`cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-4 py-2 rounded-md text-sm ${
                            !agreed
                              ? 'bg-gray-500 cursor-not-allowed opacity-50' 
                              : 'bg-[#fca311] hover:bg-[#E8850A]'
                          }`}
                        >
                          Купить книгу
                        </button>
                      </div>
                    </div>

                    {/* Мобильная версия - вертикально */}
                    <div className="sm:hidden">
                      {/* Чекбокс для принятия условий соглашения */}
                      <div className="mt-4 text-sm flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="agreement-profile-mobile"
                          checked={agreed}
                          onChange={() => setAgreed(!agreed)}
                          className="accent-[#fca311] cursor-pointer"
                        />
                        <label htmlFor="agreement-profile-mobile" className="text-white cursor-pointer">
                          Принимаю{" "}
                          <Link
                            href="/agreement"
                            target="_blank"
                            className="underline text-[#fca311] hover:text-white transition-colors"
                          >
                            УСЛОВИЯ СОГЛАШЕНИЯ
                          </Link>
                        </label>
                      </div>

                      {/* Кнопка купить книгу */}
                      <button 
                        onClick={handleBuyBook}
                        disabled={!agreed}
                        className={`mt-4 w-full cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-3 py-2 rounded-md text-[17] ${
                          !agreed
                            ? 'bg-gray-500 cursor-not-allowed opacity-50' 
                            : 'bg-[#fca311] hover:bg-[#E8850A]'
                        }`}
                      >
                        Купить книгу
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Кнопка обновления - сверху на мобильных, снизу справа на десктопе */}
            {hasAttemptedPurchase && (
              <button 
                onClick={handleRefresh}
                className="absolute top-3 right-3 sm:top-auto sm:bottom-3 bg-[#2196F3] cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-2 py-1 rounded-md text-xs hover:bg-[#1976D2] flex items-center gap-1"
                title="Обновить страницу"
              >
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                  />
                </svg>
                Обновить
              </button>
            )}
          </div>
        ) : (
          <div className="text-gray-400 text-center">
            Книги не найдены
          </div>
        )}
      </div>

      <div className="h-[100px]"></div>
      
      {/* Ambassador Section */}
      <AmbassadorSection />
      </main>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </ProtectedRoute>
  );
}
