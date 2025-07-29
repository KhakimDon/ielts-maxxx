"use client";

import { useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#00000060] backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative bg-black border border-[#fca311] text-white p-8 rounded-md w-[90%] max-w-md font-atyp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-3 right-4 text-white text-4xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-[#fca311] mb-6">Войти</h2>
        <input
          placeholder="Электронная Почта Или Телефон"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />
        <input
          placeholder="Пароль"
          className="w-full mb-2 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />
        <div className="text-sm mb-3">
          <p className="font-semibold cursor-pointer">Забыли пароль?</p>
          <br />
          <p>
            Новый Пользователь?{" "}
            <a href="#" className="underline">
              Создать Учетную Запись
            </a>
          </p>
        </div>
        <button className="w-full cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90">
          Продолжить
        </button>
      </div>
    </div>
  );
}
