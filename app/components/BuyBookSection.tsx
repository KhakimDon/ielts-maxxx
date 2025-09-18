"use client";
import Image from "next/image";
import RegisterModal from "./RegisterModal";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { env } from "@/lib/env";

export default function AboutSection() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleBuy = () => {
    if (!agreed) return; 

    if (isAuthenticated) {
      router.push(env.PAYMENT_LINK); 
    } else {
      setIsRegisterOpen(true);
    }
  };

  return (
    <section
      id="buybook"
      className="relative w-full bg-black text-white py-16 px-4 sm:px-10 !font-[var(--font-atyp)]"
    >
      <h2 className="text-center text-[#fca311] text-3xl sm:text-4xl font-extrabold tracking-wider uppercase mb-12">
        КУПИТЬ КНИГУ
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-12 w-full mx-auto">
        <div className="w-full lg:w-1/2 flex justify-center mt-[30px]">
          <Image
            width={500}
            height={500}
            src="/book.png"
            alt="IELTS MAXXX Book"
            className="max-w-[500px] pointer-events-none w-full h-auto object-cover lg:scale-x-[1.2] lg:scale-y-[1.2]"
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl text-[#fca311] font-bold mb-3">
            КУПИТЬ КНИГУ
          </h2>
          <p className="text-lg sm:text-xl font-semibold mb-2">
            КУПИТЬ КНИГУ В ОДИН КЛИК
          </p>
          <p className="mb-6">
            ПОСЛЕ ОПЛАТЫ КНИГА БУДЕТ ДОСТУПНА В ЛИЧНОМ КАБИНЕТЕ
          </p>

          <button
            onClick={handleBuy}
            disabled={!agreed}
            className={`font-semibold text-lg px-8 py-3 rounded-md transition-opacity ${
              agreed
                ? "bg-[#fca311] text-white hover:opacity-90"
                : "bg-[#fca311] text-white opacity-50 cursor-not-allowed"
            }`}
          >
            Купить
          </button>

          <div className="mt-4 text-sm flex items-center gap-2">
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="accent-[#fca311] cursor-pointer"
            />
            <label htmlFor="agreement" className="text-white">
              Принимаю{" "}
              <Link
                href="/agreement"
                target="_blank"
                className="underline text-[#fca311]"
              >
                УСЛОВИЯ СОГЛАШЕНИЯ
              </Link>
            </label>
          </div>

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onSwitchToLogin={() => {
              setIsRegisterOpen(false);
              // тут можно открыть логин модалку
            }}
            onOpenOTP={(phone) => {
              // Handle OTP modal opening
              console.log('Open OTP for phone:', phone);
            }}
          />
        </div>
      </div>
    </section>
  );
}
