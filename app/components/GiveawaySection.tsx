"use client";
import Image from "next/image";

export default function GiveawaySection() {
  return (
    <section id="promo" className="relative bg-black text-white py-20 px-4 sm:px-10 overflow-hidden">
      <h2 className="text-[#fca311] !font-[var(--font-atyp)] text-3xl sm:text-4xl !font-extrabold uppercase leading-tight text-center mb-16">
        3000 продаж — <br className="sm:hidden" />
        1 легендарный
        <br /> гелик для победителя!
      </h2>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-start">
        <div className="space-y-8">
          <div>
            <p className="!font-[var(--font-atyp)] text-[#fca311] text-xl !font-semibold mb-3">
              Условия акции:
            </p>
            <div className="flex flex-col items-start space-y-3">
              {[
                "После достижения 3000 продаж мы выберем победителя",
                "Победитель определяется полностью случайным образом (рандомайзер)",
                "Каждая покупка — это новый шанс на победу!",
                "Количество покупок не ограничено — чем больше покупок, тем выше ваши шансы",
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-[#fca311] !font-[var(--font-atyp)] text-white text-sm sm:text-base font-normal! py-2 px-4 rounded-md shadow-md inline-block"
                  style={{ maxWidth: "100%", width: "fit-content" }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Счётчик */}
          <div className="pt-6">
            <p className="text-sm font-semibold text-white mb-2">
              Осталось до покупки
            </p>
            <div className="bg-black relative leading-[40px] border-2 border-[#fca311] text-[#fca311] font-digital text-[40px] px-3  rounded-sm tracking-widest shadow-[0_0_10px_#fca311] inline-block shad">
              <p>
                222-3000
              </p>
            </div>
          </div>
        </div>

        {/* 🚙 Машина (справа, выходит из экрана) */}
        <div className="relative hidden lg:block">
          <Image
            src="/gelik.png"
            alt="Гелик"
            width={1500}
            height={1500}
            className="absolute right-[-100px] top-10 pointer-events-none"
            priority
          />
        </div>
      </div>

      <div className="mt-16 block lg:hidden relative flex justify-center">
        <Image
          src="/gelik.png"
          alt="Гелик"
          width={500}
          height={300}
          className="w-full max-w-[500px] sm:max-w-[500px] max-w-[350px] h-auto"
        />
      </div>
    </section>
  );
}
