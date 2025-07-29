'use client';

import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { MenuIcon, UserIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';
import Image from 'next/image';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass =
    'text-neutral-400 font-[600] !font-[var(--font-atyp)] font-medium! hover:text-[#fca311] transition-colors';

  return (
    <header className="bg-black sticky top-0 left-0 z-50 w-full text-white border-b border-[#fca311]">
      <div className="max-w-screen-xl w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="IELTS MAXXX"
            width={80}
            height={70}
            className="h-auto w-[70px] sm:w-[80px]"
          />
        </Link>

        {/* Модалка */}
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Desktop nav */}
        <nav className="hidden md:flex !font-[var(--font-atyp)] items-center space-x-6 lg:space-x-10 text-sm">
          <Link href="/" className={navLinkClass}>Home</Link>
          <Link href="/book" className={navLinkClass}>О книге</Link>
          <Link href="/author" className={navLinkClass}>Автор</Link>
          <Link href="/profile" className={navLinkClass}>Купить книгу</Link>
          <Link href="/promo" className={navLinkClass}>Акция</Link>
        </nav>

        {/* Login button (desktop only) */}
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="ghost"
          className="hidden md:flex bg-[#fca311] text-white text-sm px-6 py-2 items-center hover:bg-[#fca311] hover:text-white transition cursor-pointer"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          Войти / Зарегистрироваться
        </Button>

        {/* Mobile toggle */}
        <button
          className="md:hidden ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XIcon className="w-6 h-6 text-[#fca311] cursor-pointer" />
          ) : (
            <MenuIcon className="w-6 h-6 text-[#fca311] cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed top-[72px] left-0 w-full z-40 px-4 py-10 space-y-4 text-sm flex flex-col items-center bg-black transition-all duration-300 ease-out ${
          isMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-5 opacity-0 pointer-events-none'
        }`}
      >
        <Link href="/" className="block text-[#fca311] font-semibold">Home</Link>
        <Link href="/book" className="block text-neutral-400 hover:text-[#fca311]">О книге</Link>
        <Link href="/author" className="block text-neutral-400 hover:text-[#fca311]">Автор</Link>
        <Link href="/profile" className="block text-neutral-400 hover:text-[#fca311]">Купить книгу</Link>
        <Link href="/promo" className="block text-neutral-400 hover:text-[#fca311]">Акция</Link>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="ghost"
          className="w-full cursor-pointer max-w-xs mx-auto bg-[#fca311] text-white text-sm px-4 py-2 items-center flex justify-center hover:bg-[#fca311] transition"
        >
          <UserIcon className="mr-2 h-4 w-4" />
          Войти / Зарегистрироваться
        </Button>
      </div>
    </header>
  );
}
