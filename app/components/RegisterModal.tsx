"use client";

import { useState, useEffect } from "react";
import { buildApiUrl, env } from "@/lib/env";
import { Eye, EyeOff } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onOpenOTP: (phone: string) => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onOpenOTP,
}: RegisterModalProps) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Очищаем поля при закрытии
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setError("");
        setShowPassword(false);
        setIsLoading(false);
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Функция для обработки ввода номера телефона
  const handlePhoneChange = (value: string) => {
    // Убираем все символы кроме цифр
    const numbersOnly = value.replace(/\D/g, '');
    setPhone(numbersOnly);
  };

  const handleRegister = async () => {
    setError("");

    // Валидация полей
    if (!firstName.trim()) {
      setError("Введите имя");
      return;
    }
    if (!lastName.trim()) {
      setError("Введите фамилию");
      return;
    }
    if (!phone.trim()) {
      setError("Введите номер телефона");
      return;
    }
    if (!email.trim()) {
      setError("Введите email");
      return;
    }
    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    setIsLoading(true);

    try {
      // Убираем +998 или 998 из начала номера телефона для бэкенда
      const cleanPhone = phone.replace(/^(\+998|998)/, '');
      
      // Получаем токен из localStorage для авторизации
      const accessToken = localStorage.getItem("access_token");
      
      const response = await fetch(
        buildApiUrl(env.REGISTER_ENDPOINT),
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Authorization": accessToken ? `Bearer ${accessToken}` : "",
            "Content-Type": "application/json",
            "X-CSRFTOKEN": env.CSRF_TOKEN,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            phone_number: cleanPhone,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Проверяем ответ
      if (response.ok) {
        // Очищаем поля формы
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setError("");
        setShowPassword(false);

        console.log("✅ Успешная регистрация, открываем OTP");
        
        // Закрываем модалку регистрации
        onClose();
        
        // Открываем OTP модалку через Header
        onOpenOTP(cleanPhone);
      } else {
        // Ошибка регистрации
        console.error("Ошибка регистрации:", data);
        setError("Ошибка регистрации");
      }
    } catch (err: unknown) {
      console.error("Ошибка при отправке запроса:", err);
      setError("Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div
      className="fixed inset-0 bg-[#00000060] backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => {
        // Очищаем поля при закрытии
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setError("");
        setShowPassword(false);
        setIsLoading(false);
        onClose();
      }}
    >
      <div
        className="relative bg-black border border-[#fca311] text-white p-8 rounded-md w-[90%] max-w-md font-atyp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            // Очищаем поля при закрытии
            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setPassword("");
            setError("");
            setShowPassword(false);
            onClose();
          }}
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
          type="tel"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Номер телефона"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Электронная Почта"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white"
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-2 pr-12 border border-[#fca311] rounded-md bg-black placeholder-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-[#fca311] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Отправка...
            </>
          ) : (
            "Продолжить"
          )}
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
