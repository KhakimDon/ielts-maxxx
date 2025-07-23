"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="relative w-full bg-black text-white py-16 px-4 sm:px-10 !font-[var(--font-atyp)]">
      <h2 className="text-center text-[#fca311] text-3xl !font-[var(--font-atyp)] sm:text-4xl !font-extrabold tracking-wider uppercase mb-12">
        КУПИТЬ КНИГУ
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full mx-auto">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            width={500}
            height={500}
            src="/book.png"
            alt="IELTS MAXXX Book"
            className="max-w-[500px] pointer-events-none w-full h-auto object-cover lg:scale-x-[1.2] lg:scale-y-[1.2]"
          />
        </div>

         {/* Left top glow */}
      {/* <div
        className="absolute top-0 left-0 w-[500px] h-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, #fca31155 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

        <div
          className="absolute bottom-0 right-0 w-[300px] h-[1000px] z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at bottom right, #fca31155 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        /> */}

        <form className="w-full !font-[var(--font-atyp)] font-semibold! max-w-[550px] bg-black border border-[#fca311] p-6 sm:p-8 rounded-md space-y-4 shadow-md">
          <input
            type="text"
            placeholder="Имя"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />
          <input
            type="text"
            placeholder="Телефон"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />
          <input
            type="email"
            placeholder="E-Mail"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-white font-bold gap-2">
            <div>
              <span className="block">Дата и время</span>
              <span className="text-neutral-300 font-normal">
                11.06.2025 23:30 - 0:00
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <Image
                src="/payme.svg"
                width={50}
                height={50}
                alt="Payme"
                className="scale-x-[1.3] scale-y-[1.3]"
              />
              <Image
                src="/click.svg"
                width={50}
                height={50}
                alt="Click"
                className="scale-x-[1.3] scale-y-[1.3]"
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Номер карты"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />
          <input
            type="text"
            placeholder="CVC"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-[#fca311] bg-transparent text-white placeholder:text-neutral-400 outline-none text-base"
          />

          <div className="text-sm text-white mt-2">
            <span className="block font-bold">Стоимость</span>
            <span className="text-neutral-300 font-normal">500.000 сум</span>
          </div>

          <button
            type="submit"
            className="w-full !font-[var(--font-atyp)] cursor-pointer bg-[#fca311] text-white text-base !font-bold py-4 rounded-md hover:bg-[#e6950e] transition"
          >
            Оплатить
          </button>
        </form>
      </div>
    </section>
  );
}
