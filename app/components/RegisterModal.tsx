"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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

  const handleRegister = async () => {
    setError("");

    try {
      const formData = new FormData();
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone_number", phone);
      formData.append("email", email);
      formData.append("password", password);

      const response = await fetch(
        "https://api.doniyortest.uz/api/v1/user/auth/Register/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      // ✅ Если пришли токены — даже с ошибкой SMS — считаем успешной регистрацией
      if (response.ok || (data.access && data.refresh)) {
        login(data.access, data.refresh, {
          first_name: firstName,
          last_name: lastName,
        });

        console.log("✅ Успешная регистрация и вход (возможно, без SMS)");
        onClose();
        router.push("/profile");
      } else {
        // ❌ Ошибка без токенов
        throw new Error(
          "Ошибка регистрации: " +
            (data.detail || data.message || JSON.stringify(data))
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Ошибка регистрации: " + err.message);
      } else {
        setError("Произошла неизвестная ошибка");
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

        <h2 className="text-3xl font-bold text-[#fca311] mb-6">Регистрация</h2>

        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Имя"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Фамилия"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Электронная Почта"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90"
        >
          Продолжить
        </button>

        <p className="text-sm mt-4">
          Есть Аккаунт?{" "}
          <span
            className="underline cursor-pointer text-[#fca311]"
            onClick={onSwitchToLogin}
          >
            Войти В Аккаунт
          </span>
        </p>
      </div>
    </div>
  );
}
