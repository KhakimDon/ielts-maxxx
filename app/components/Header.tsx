"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { MenuIcon, UserIcon, XIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import AuthModal from "./AuthModal";
import RegisterModal from "./RegisterModal";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const navLinkClass =
    "text-neutral-400 font-[600] !font-[var(--font-atyp)] hover:text-[#fca311] transition-colors";

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

        {/* 🔒 Модалки */}
        <AuthModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSwitchToRegister={() => {
            setIsModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsModalOpen(true);
          }}
        />

        {/* 🖥 Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 text-sm font-[var(--font-atyp)]">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/" className={navLinkClass}>
            О книге
          </Link>
          <Link href="/author" className={navLinkClass}>
            Автор
          </Link>
          <Link href="#buybook" className={navLinkClass}>
            Купить книгу
          </Link>
          <Link href="/promo" className={navLinkClass}>
            Акция
          </Link>
        </nav>

        {/* 👤 Auth UI — Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {isAuthenticated && user ? (
            <>
              <Button
                onClick={() => router.push("/profile")}
                className="bg-[#fca311] text-white text-sm px-4 py-2 items-center"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                {user.first_name} {user.last_name}
              </Button>
              <Button
                onClick={logout}
                className="bg-[#fca311] text-white text-sm px-4 py-2"
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#fca311] text-white text-sm px-6 py-2 items-center"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Войти / Зарегистрироваться
            </Button>
          )}
        </div>

        {/* 📱 Mobile menu toggle */}
        <button
          className="md:hidden ml-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <XIcon className="w-6 h-6 text-[#fca311]" />
          ) : (
            <MenuIcon className="w-6 h-6 text-[#fca311]" />
          )}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full z-40 px-4 py-10 space-y-4 text-sm flex flex-col items-center bg-black transition-all duration-300 ease-out">
          <Link href="/" className="block text-[#fca311] font-semibold">
            Home
          </Link>
          <Link
            href="/book"
            className="block text-neutral-400 hover:text-[#fca311]"
          >
            О книге
          </Link>
          <Link
            href="/author"
            className="block text-neutral-400 hover:text-[#fca311]"
          >
            Автор
          </Link>
          <Link
            href="/buy"
            className="block text-neutral-400 hover:text-[#fca311]"
          >
            Купить книгу
          </Link>
          <Link
            href="/promo"
            className="block text-neutral-400 hover:text-[#fca311]"
          >
            Акция
          </Link>

          {isAuthenticated && user ? (
            <>
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  router.push("/profile");
                }}
                className="w-full max-w-xs bg-[#fca311] text-white text-sm"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                {user.first_name} {user.last_name}
              </Button>
              <Button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full max-w-xs bg-[#fca311] text-white text-sm"
              >
                Выйти
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full max-w-xs bg-[#fca311] text-white text-sm"
            >
              Войти / Зарегистрироваться
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
