"use client"

import dynamic from "next/dynamic";
import ProtectedRoute from "@/app/components/ProtectedRoute";

// const BookViewer = dynamic(() => import("@/app/components/BookViewer"), {
//   ssr: false,
// });

export default function BookPage() {
  return (
    <ProtectedRoute>
      {/* <BookViewer /> */}
      <div>
        <div className="text-center bg-black pb-5 pt-15">
          <h1 className="text-4xl font-bold text-[#fca311] mb-4">IELTS MAXXX 1.0</h1>
          <p className="text-gray-400">Приятного чтения!</p>
        </div>
        {/* короче это контейнер для pdf файла */}
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
          <div className="w-full max-w-[1170px] h-[826.49px] bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">

          </div>
        </div>
        <div className="h-[100px] bg-black"></div>
      </div>
    </ProtectedRoute>
  );
}