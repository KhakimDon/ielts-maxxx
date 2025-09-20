"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { loginUser } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";
import { IMaskInput } from "react-imask";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void; // ✅ добавлено
}

export default function AuthModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: AuthModalProps) {
  const router = useRouter();
  const { login } = useAuth();

  const [phoneOrEmail, setPhoneOrEmail] = useState("+998 ");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Очищаем поля при закрытии
        setPhoneOrEmail("+998 ");
        setPassword("");
        setError("");
        setShowPassword(false);
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  // Функция для обработки ввода номера телефона
  const handlePhoneChange = (value: string) => {
    // Если пользователь пытается удалить +998, не позволяем
    if (value.length < 5) {
      setPhoneOrEmail("+998 ");
      return;
    }
    setPhoneOrEmail(value);
  };

  // Функция для получения только цифр номера (без +998)
  const getPhoneNumber = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.startsWith('998') ? numbers.substring(3) : numbers;
  };

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Валидация полей
      if (!phoneOrEmail.trim() || phoneOrEmail === "+998 ") {
        setError("Введите номер телефона");
        return;
      }
      if (!password.trim()) {
        setError("Введите пароль");
        return;
      }

      // Получаем только цифры номера для отправки
      const phoneNumber = getPhoneNumber(phoneOrEmail);
      if (phoneNumber.length < 9) {
        setError("Введите корректный номер телефона");
        return;
      }

      // Выполняем вход через API
      const loginData = await loginUser(phoneNumber, password);
      
      // Сохраняем токены и получаем данные пользователя
      await login(loginData.access, loginData.refresh);

      // Очищаем поля формы
      setPhoneOrEmail("+998 ");
      setPassword("");
      setError("");
      setShowPassword(false);

      console.log("✅ Пользователь вошёл");
      onClose();
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#00000060] backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => {
        // Очищаем поля при закрытии
        setPhoneOrEmail("+998 ");
        setPassword("");
        setError("");
        setShowPassword(false);
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
            setPhoneOrEmail("+998 ");
            setPassword("");
            setError("");
            onClose();
          }}
          className="absolute cursor-pointer top-3 right-4 text-white text-4xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-[#fca311] mb-6">Войти</h2>

        <IMaskInput
          mask="+998 00 000-00-00"
          value={phoneOrEmail}
          onAccept={(value: string) => handlePhoneChange(value)}
          placeholder="+998 99 999-99-99"
          className="w-full mb-3 px-4 py-2 border border-[#fca311] rounded-md bg-black placeholder-white text-white"
          lazy={false}
        />

        <div className="relative mb-2">
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
          onClick={handleLogin}
          disabled={isLoading}
          className={`w-full mt-3 cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Вход..." : "Продолжить"}
        </button>

        {onSwitchToRegister && (
          <p
            className="text-sm text-[#fca311] mt-4 cursor-pointer text-center"
            onClick={onSwitchToRegister}
          >
            Нет аккаунта? Зарегистрироваться
          </p>
        )}
      </div>
    </div>
  );
}
