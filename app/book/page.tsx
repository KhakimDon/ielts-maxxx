"use client"

import ProtectedRoute from "@/app/components/ProtectedRoute";

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
           <div className="w-full max-w-[1170px] h-[826.49px] bg-gray-800 rounded-lg border border-gray-700 flex">
             {/* Левая часть - показывается всегда */}
             <div className="w-1/2 h-full bg-gray-700 border-r border-gray-600 flex items-center justify-center">
               <div className="text-center">
                 <p className="text-gray-400">Левая страница</p>
                 <p className="text-sm text-gray-500 mt-2">50% ширины</p>
               </div>
             </div>
             
             {/* Правая часть - скрывается на экранах меньше 1200px */}
             <div className="w-1/2 h-full bg-gray-700 flex items-center justify-center xl:block hidden">
               <div className="text-center">
                 <p className="text-gray-400">Правая страница</p>
                 <p className="text-sm text-gray-500 mt-2">50% ширины</p>
               </div>
             </div>
           </div>
         </div>
        <div className="h-[100px] bg-black"></div>
      </div>
    </ProtectedRoute>
  );
}