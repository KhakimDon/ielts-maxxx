'use client';
import { Button } from './ui/button';

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen bg-black bg-center bg-no-repeat pt-[120px]
                 bg-[url('/hero-mobile.png')] sm:bg-[url('/hero-bg.png')]"
      style={{
        backgroundSize: '100% auto'
      }}
    >
      <div className="absolute z-10 text-left top-[15vw] left-[9vw]"></div>

      <Button
        variant="ghost"
        className="absolute !font-[var(--font-atyp)] font-bold! tracking-[1px] bottom-30 left-1/2 -translate-x-1/2 bg-[#fca311] text-white text-sm sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-7 rounded-md shadow-[0_0_10px_#fca311] cursor-pointer hover:bg-[#fca311] transition"
      >
        <a href="#buybook">КУПИТЬ</a>
      </Button>
    </section>
  );
}
