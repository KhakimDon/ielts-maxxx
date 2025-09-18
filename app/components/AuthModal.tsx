"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(
        "https://api.doniyortest.uz/api/v1/user/auth/Login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phoneOrEmail,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          "Ошибка авторизации: " +
            (errorData.detail || JSON.stringify(errorData))
        );
      }

      const data = await response.json();

      // Временно подставим фейковое имя/фамилию, пока не делаем /me endpoint
      login(data.access, data.refresh, {
        first_name: "Имя",
        last_name: "Пользователя",
      });

      console.log("✅ Пользователь вошёл");
      onClose();
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

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
          value={phoneOrEmail}
          onChange={(e) => setPhoneOrEmail(e.target.value)}
          placeholder="Телефон или Email"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full mb-2 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="text-sm mb-3">
          <p className="font-semibold cursor-pointer">Забыли пароль?</p>
        </div>

        <button
          onClick={handleLogin}
          className="w-full cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}
