"use client"

export default function BookPage() {
  return (
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

      {/* Фиксированные кнопки навигации */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        {/* Кнопка назад */}
        <button className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
        </button>

        <button className="px-[18px] font-medium h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
          1-2/4
        </button>

        {/* Кнопка вперед */}
        <button className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </button>

         {/* Кнопка воспроизведения */}
         <button className="px-[18px] cursor-pointer h-[51px] bg-[#F7971D] text-black rounded-lg flex items-center justify-center hover:bg-[#E8850A] transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
           </svg>
         </button>

      </div>
    </div>
  );
}