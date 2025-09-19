"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t-1 border-t-[#fca311] text-white font-atyp px-6 sm:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between">
        {/* Левая часть */}
        <div className="flex flex-col sm:flex-row gap-10 w-full">
          {/* Логотип и ссылки */}
          <div className="flex flex-col sm:w-1/2 gap-6">
            {/* Лого */}
            <Image
              src="/logo.svg"
              alt="IELTS MAXXX Logo"
              width={120}
              height={40}
              className="mb-2"
            />
            <div className="!font-[var(--font-atyp)] !font-semibold tracking-wide">
              <h4 className="text-[#fca311] mb-3">Компания</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#about">О книге</Link>
                </li>
                <li>
                  <Link href="#buybook">Купить книгу</Link>
                </li>
                <li>
                  <Link href="#about">Цель этой книги</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Контакты */}
          <div className="sm:w-1/1 !font-[var(--font-atyp)] !font-semibold tracking-wide">
            <h4 className="text-[#fca311] mb-3">Контакты</h4>
            <p className="leading-snug">
              Ташкент, Юнусабадский район, махаллинский сход граждан Адолат, <br />
              4-й квартал, 20
            </p>
            <a 
              href="tel:+998970066066" 
              className="mt-2 text-[#fca311] hover:text-white transition-colors cursor-pointer"
            >
              +998 97 006 60 66
            </a>
          </div>
        </div>

        {/* Соцсети */}
        <div className="flex mt-3 sm:flex-col gap-4 sm:items-end items-center">
          <Link href="https://t.me/mr_doniyormanager" target="_blank" rel="noopener noreferrer">
            <div className="bg-[#fca311] w-10 h-10 rounded-md flex items-center justify-center">
              <Image
                src="/icons8-telegram-50.png"
                alt="Telegram"
                width={25}
                height={25}
              />
            </div>
          </Link>
          <Link href="https://www.instagram.com/mr.doniyorbotirov" target="_blank" rel="noopener noreferrer">
            <div className="bg-[#fca311] w-10 h-10 rounded-md flex items-center justify-center">
              <Image
                src="/inst.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
