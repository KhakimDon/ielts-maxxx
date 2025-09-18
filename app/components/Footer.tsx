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
              г. ТАШКЕНТ, ЯШНАБАДСКИЙ РАЙОН, УЛ. П. МАХМУД, 2- <br />
              ПРОЕЗД, 1-ТУПИК, ДОМ 31, КВ. 1
            </p>
            <p className="mt-2">(99) 999 99 99</p>
          </div>
        </div>

        {/* Соцсети */}
        <div className="flex mt-3 sm:flex-col gap-4 sm:items-end items-center">
          <Link href="#">
            <div className="bg-[#fca311] w-10 h-10 rounded-md flex items-center justify-center">
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={10}
                height={10}
              />
            </div>
          </Link>
          <Link href="#">
            <div className="bg-[#fca311] w-10 h-10 rounded-md flex items-center justify-center">
              <Image
                src="/inst.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
            </div>
          </Link>
          <Link href="#">
            <div className="bg-[#fca311] w-10 h-10 rounded-md flex items-center justify-center">
              <Image
                src="/twitter.svg"
                alt="Twitter"
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
