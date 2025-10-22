"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  phone: string;
}

export default function OTPModal({ isOpen, onClose, onVerify, phone }: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    console.log("🔍 OTP Modal useEffect - isOpen:", isOpen);
    if (isOpen) {
      console.log("🔍 OTP Modal открывается!");
      setOtp(["", "", "", ""]);
      setIsLoading(false);
      
      // Добавляем небольшую задержку для Safari
      setTimeout(() => {
        const firstInput = inputRefs.current[0];
        if (firstInput) {
          console.log("🔍 Фокусируемся на первом инпуте");
          firstInput.focus();
          // Дополнительная проверка для Safari
          firstInput.click();
        } else {
          console.log("❌ Первый инпут не найден");
        }
      }, 200);
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    // Разрешаем только цифры
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Переходим к следующему инпуту
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Если все поля заполнены, автоматически отправляем
    if (newOtp.every(digit => digit !== "") && newOtp.join("").length === 4) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Удаление - переходим к предыдущему инпуту
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 4; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
    
    // Фокусируемся на последнем заполненном поле
    const lastFilledIndex = Math.min(pastedData.length - 1, 3);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join("");
    if (code.length !== 4) return;

    setIsLoading(true);
    try {
      await onVerify(code);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    // Здесь можно добавить логику повторной отправки OTP
    console.log("Resend OTP");
  };

  console.log("🔍 OTP Modal render - isOpen:", isOpen, "phone:", phone);
  
  if (!isOpen) {
    console.log("🔍 OTP Modal не отображается - isOpen = false");
    return null;
  }

  console.log("🔍 OTP Modal отображается!");

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        WebkitBackdropFilter: 'blur(4px)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-md relative shadow-2xl"
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '28rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Подтверждение номера</h2>
          <p className="text-gray-600">
            Введите код из SMS, отправленный на номер
          </p>
          <p className="text-gray-900 font-medium">+{phone}</p>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
                console.log(`🔍 Input ${index} ref установлен:`, el);
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#fca311] focus:outline-none transition-colors text-black"
              style={{
                width: '3rem',
                height: '3rem',
                textAlign: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                outline: 'none',
                color: 'black',
                backgroundColor: 'white'
              }}
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          ))}
        </div>

        <button
          onClick={() => handleVerify()}
          disabled={otp.join("").length !== 4 || isLoading}
          className="w-full bg-[#fca311] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e6940f] transition-colors mb-4"
        >
          {isLoading ? "Проверка..." : "Подтвердить"}
        </button>

        <div className="text-center">
          <button
            onClick={handleResend}
            className="text-[#fca311] hover:text-[#e6940f] transition-colors text-sm"
            disabled={isLoading}
          >
            Отправить код повторно
          </button>
        </div>
      </div>
    </div>
  );
}