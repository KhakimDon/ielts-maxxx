'use client';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-black bg-top bg-no-repeat bg-cover pt-[120px]
                 bg-[url('/hero-mobile.png')] sm:bg-[url('/hero-bg.png')]"
    >

      <div
        className="absolute z-10 text-left top-[15vw] left-[9vw]"
      >
        {/* <div className="bg-black border-2 !font-[var(--font-atyp)] font-medium! border-[#fca311] text-[#fca311] text-xl sm:text-2xl px-4 py-1 rounded-sm tracking-widest shadow-[0_0_10px_#fca311] inline-block">
          222-3000
        </div>
        <p className="text-[#fca311] text-xs sm:text-sm mt-1 uppercase font-medium">
          Осталось до покупки
        </p> */}
      </div>

      <Button
        variant="ghost"
        className="absolute !font-[var(--font-atyp)] font-bold! tracking-[1px] bottom-30 left-1/2 -translate-x-1/2 bg-[#fca311] text-white text-sm sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-7 rounded-md shadow-[0_0_10px_#fca311] cursor-pointer hover:bg-[#fca311] transition"
      >
        КУПИТЬ
      </Button>
    </section>
  );
}
