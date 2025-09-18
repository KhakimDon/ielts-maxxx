"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-white font-atyp px-6 sm:px-12 py-10 flex flex-col items-center">
      <h2 className="text-3xl mt-[50px] sm:text-4xl font-bold text-[#fca311] text-center mb-8">
        КНИГИ
      </h2>

      <div className="w-full max-w-7xl justify-center items-center flex flex-col gap-8">
        <div className="w-[90%] border border-[#fca311] rounded-md p-4 flex flex-col md:flex-row items-center gap-10">
          <Image
            className="scale-y-[1.5] scale-x-[1.5]"
            src="/bookd.png"
            alt="book"
            width={160}
            height={240}
          />
          <div className="flex-1 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-white !font-[var(--font-atyp)] font-bold! text-[30px]">
                IELTS MAXXX <span className="text-[#fca311]">1.0</span>
              </h3>
              <span className="text-[#fca311] text-[30px] font-bold">222</span>
            </div>
            <p className="text-sm mt-1 !font-[var(--font-atyp)] font-normal">
              Ты участвуешь в розыгрыше Гелика.
              <br />
              Твой номер — 222.
            </p>
            <div className="flex flex-wrap gap-5 mt-[30px]">
              <button className="bg-[#2196F3] cursor-pointer text-white !font-[var(--font-atyp)] font-bold! tracking-wider px-4 py-2 rounded-md text-sm flex items-center gap-1">
                <a href="#">Зайти на канал</a>
                <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                  <path d="M21.426 11.096 3.203 3.367c-.653-.27-1.263.158-1.05.98l2.385 9.737c.109.444.432.718.89.718.171 0 .345-.037.516-.108l3.72-1.58 1.65 4.95c.18.53.57.82 1.065.82.45 0 .848-.244 1.014-.62l2.13-4.88 4.638 2.317c.147.073.3.11.45.11.45 0 .832-.3.99-.765.162-.477-.01-1.017-.49-1.38l-4.573-3.24 4.837-2.062c.4-.17.6-.483.593-.833-.01-.36-.22-.672-.563-.83z" />
                </svg>
              </button>
              <button className="bg-[#fca311] cursor-pointer !font-[var(--font-atyp)] font-bold! tracking-wider text-white px-4 py-2 rounded-md text-sm">
                Читать
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
