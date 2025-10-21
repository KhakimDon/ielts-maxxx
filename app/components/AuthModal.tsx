"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";
import { loginUser } from "@/lib/api";
import { Eye, EyeOff } from "lucide-react";

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
  const { login } = useUserData();

  const [phoneOrEmail, setPhoneOrEmail] = useState("+");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Очищаем поля при закрытии
        setPhoneOrEmail("+");
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
    // Фильтруем только цифры и +
    const filteredValue = value.replace(/[^0-9+]/g, '');

    // Если пользователь пытается удалить +, не позволяем
    if (filteredValue.length < 1) {
      setPhoneOrEmail("+");
      return;
    }
    // Ограничиваем длину до 15 символов (включая +)
    if (filteredValue.length > 15) {
      return;
    }
    setPhoneOrEmail(filteredValue);
  };

  // Функция для получения только цифр номера (без +)
  const getPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // Валидация полей
      if (!phoneOrEmail.trim() || phoneOrEmail === "+") {
        setError("Введите номер телефона");
        return;
      }

      // Проверяем длину номера (минимум 8 цифр, максимум 14)
      const phoneNumber = getPhoneNumber(phoneOrEmail);
      if (phoneNumber.length < 8 || phoneNumber.length > 14) {
        setError("Номер телефона должен содержать от 8 до 14 цифр");
        return;
      }
      
      // Проверяем, что номер начинается с кода страны (минимум 3 цифры)
      if (phoneNumber.length < 10) {
        setError("Введите полный номер с кодом страны");
        return;
      }
      if (!password.trim()) {
        setError("Введите пароль");
        return;
      }

      // Номер уже проверен выше, отправляем номер без +
      const phoneForApi = phoneOrEmail.startsWith('+') ? phoneOrEmail.substring(1) : phoneOrEmail;
      
      console.log("🔍 Отладка номера:", {
        введен: phoneOrEmail,
        для_апи: phoneForApi,
        только_цифры: getPhoneNumber(phoneOrEmail)
      });

      // Выполняем вход через API
      const loginData = await loginUser(phoneForApi, password);

      // Сохраняем токены и получаем данные пользователя
      await login(loginData.access, loginData.refresh);

      // Очищаем поля формы
      setPhoneOrEmail("+");
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
        setPhoneOrEmail("+");
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
            setPhoneOrEmail("+");
            setPassword("");
            setError("");
            onClose();
          }}
          className="absolute cursor-pointer top-3 right-4 text-white text-4xl"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-[#fca311] mb-6">Войти</h2>

        <div className="relative mb-3">
          <input
            type="tel"
            value={phoneOrEmail}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onKeyPress={(e) => {
              // Разрешаем только цифры, + и специальные клавиши
              if (!/[0-9+]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            className="w-full px-4 py-2 border border-[#fca311] rounded-md bg-black text-white"
            maxLength={15}
          />
          {phoneOrEmail === "+" && (
            <div className="absolute !left-[35px] top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              Введите номер телефона
            </div>
          )}
        </div>

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
          className={`w-full mt-3 cursor-pointer bg-[#fca311] text-white py-2 rounded-md font-semibold hover:opacity-90 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
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
