"use client";

import { useState } from "react";

export default function BookSliderPage() {
  const [pageIndex, setPageIndex] = useState(0);

  const pages = [
    {
      title: "1.1 Кто такой Mr.Doniyor?",
      content: `Я не "учитель английского"...\nЯ — человек, который делает 70+ нормой...`,
    },
    {
      title: "1.2 Почему реально подняться с Pre-Intermediate до 70+",
      content: `Потому что есть система. Потому что ты читаешь эту книгу.`,
    },
    {
      title: "1.3 Почему обычные курсы тянут по 2-3 года",
      content: `Потому что им выгодно, чтобы ты платил дольше.`,
    },
  ];

  const prevPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextPage = () => {
    setPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
  };

  return (
    <main className="min-h-screen bg-black text-white font-atyp flex justify-center items-center px-4 py-10">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl text-[#fca311] font-bold mb-6 text-center">
          IELTS MAXXX 1.0
        </h1>

        <div className="bg-white w-full shadow-lg flex flex-col md:flex-row md:min-h-[800px]">
          {/* Левая часть — содержание, по центру */}
          <div className="w-full md:w-1/2 bg-white text-black font-[var(--font-atyp)] flex flex-col items-center justify-center p-10 order-1 md:order-none">
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#d72638] mb-6">
                ВВЕДЕНИЕ
              </h2>
              <ul className="space-y-3 text-sm leading-relaxed text-left">
                <li>
                  <strong>1.1.</strong> Кто такой <strong>Mr.Doniyor</strong>
                </li>
                <li>
                  <strong>1.2.</strong> Почему реально подняться с
                  Pre-Intermediate до 70+
                </li>
                <li>
                  <strong>1.3.</strong> Почему обычные курсы тянут по 2-3 года
                </li>
                <li>
                  <strong>1.4.</strong> Что даёт балл 70
                </li>
                <li>
                  <strong>1.5.</strong> Как пользоваться этой книгой, чтобы
                  выжать максимум
                </li>
                <li>
                  <strong>1.6.</strong> Как отслеживать прогресс (метка роста,
                  тесты, трекеры)
                </li>
              </ul>
            </div>
          </div>

          {/* Правая часть — динамичный контент */}
          <div className="w-full md:w-1/2 p-10 bg-black text-white font-[var(--font-atyp)] text-sm flex flex-col justify-between order-2 md:order-none">
            <div>
              <h2 className="text-white font-bold text-sm mb-4">
                {pages[pageIndex].title}
              </h2>
              <p className="whitespace-pre-line leading-relaxed">
                {pages[pageIndex].content}
              </p>
            </div>
          </div>
        </div>

        {/* Навигация по страницам */}
        <div className="flex items-center justify-center gap-4 mt-10">
          {/* Prev Button */}
          <button
            onClick={prevPage}
            disabled={pageIndex === 0}
            className={`w-10 h-10 flex items-center justify-center border rounded-sm transition text-lg ${
              pageIndex === 0
                ? "border-[#fca311] text-[#fca311] opacity-50 cursor-not-allowed"
                : "border-[#fca311] text-white hover:bg-[#fca311] hover:text-black"
            }`}
          >
            ←
          </button>

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={pageIndex === pages.length - 1}
            className={`w-10 h-10 flex items-center justify-center bg-[#fca311] text-white rounded-sm transition text-lg ${
              pageIndex === pages.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            →
          </button>

          {/* Page Number */}
          <div className="bg-[#fca311] text-white font-semibold px-4 py-2 rounded-sm text-sm">
            Страница {pageIndex + 1}
          </div>
        </div>
      </div>
    </main>
  );
}
