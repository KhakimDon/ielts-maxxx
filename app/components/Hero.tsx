'use client';
import { Button } from './ui/button';
import { useOrderCount } from '../../hooks/useOrderCount';

export default function Hero() {
  const { displayCount } = useOrderCount();

  return (
    <section
      className="relative w-full h-screen bg-black bg-center bg-no-repeat pt-[120px]
                 bg-[url('/hero-mobile.png')] sm:bg-[url('/hero-bg.png')]"
      style={{
        backgroundSize: '100% auto'
      }}
    >
      <div className="absolute z-10 text-left top-[15vw] left-[9vw]"></div>

      {/* Счётчик */}
      <div className="absolute z-10 top-[7vw] left-[5vw] sm:top-[12vw] sm:left-[10vw]">
        <div className="bg-black relative leading-[40px] border-2 border-[#fca311] text-[#fca311] font-digital text-[40px] px-3 rounded-sm tracking-widest shadow-[0_0_10px_#fca311] inline-block w-[240px] text-center" style={{textShadow: '0 0 3px #fca311, 0 0 20px #fca311, 0 0 30px #fca311'}}>
          <p>
            {`${displayCount.toString().padStart(4, '0')}-3000`}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        className="absolute !font-[var(--font-atyp)] font-bold! tracking-[1px] bottom-30 left-1/2 -translate-x-1/2 bg-[#fca311] text-white text-sm sm:text-lg font-bold px-8 sm:px-10 py-4 sm:py-7 rounded-md shadow-[0_0_10px_#fca311] cursor-pointer hover:bg-[#fca311] transition"
        onClick={() => {
          document.getElementById('buybook')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        КУПИТЬ
      </Button>
    </section>
  );
}
