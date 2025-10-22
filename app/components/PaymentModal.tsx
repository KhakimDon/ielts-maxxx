"use client";
import { useState } from "react";
import Image from "next/image";
import { createOrder } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  referralCode?: string;
}

export default function PaymentModal({ isOpen, onClose, onSuccess, onError, referralCode }: PaymentModalProps) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async (currency: string) => {
    if (!isAuthenticated) {
      onError?.("Необходимо войти в систему");
      return;
    }

    try {
      setIsLoading(true);
      setSelectedMethod(currency);
      
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        onError?.("Токен доступа не найден");
        return;
      }

      console.log(`💳 Начинаем оплату в валюте ${currency}...`, referralCode ? `Реферальный код: ${referralCode}` : '');
      
      // Создаем заказ с указанием валюты и реферального кода
      const orderData = await createOrder(accessToken, currency, referralCode);
      
      console.log(`💳 Получен URL для оплаты в валюте ${currency}:`, orderData.url);
      
      // Открываем URL с поддержкой iOS Safari
      const openPaymentUrl = (url: string) => {
        // Проверяем, является ли устройство iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
          // Для iOS используем location.href
          window.location.href = url;
        } else {
          // Для других браузеров используем window.open
          const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
          
          // Если window.open заблокирован, используем location.href как fallback
          if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            console.log('🔄 window.open заблокирован, используем location.href');
            window.location.href = url;
          }
        }
      };
      
      openPaymentUrl(orderData.url);
      
      onSuccess?.();
      onClose();
      
    } catch (err) {
      console.error(`Ошибка при оплате в валюте ${currency}:`, err);
      onError?.(`Ошибка при создании заказа в валюте ${currency}. Попробуйте еще раз.`);
    } finally {
      setIsLoading(false);
      setSelectedMethod(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black rounded-2xl p-6 w-full max-w-md mx-1 border border-[#F7971D] font-[var(--font-dm-sans)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Выберите способ оплаты</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Humo/Uzcard - UZS */}
          <button
            onClick={() => handlePayment("uzs")}
            disabled={isLoading}
            className={`w-full p-4 border-2 border-[#F7971D] rounded-xl transition-all duration-200 flex items-center justify-between relative ${
              selectedMethod === "uzs" 
                ? "border-[#F7971D] bg-[#F7971D]/20" 
                : "border-[#F7971D] hover:border-[#F7971D]/80 bg-gray-800/50"
            } ${
              isLoading && selectedMethod !== "uzs" 
                ? "opacity-50 cursor-not-allowed" 
                : "cursor-pointer"
            }`}
          >
            {/* Иконка в верхнем правом углу */}
            <div className="absolute top-2 right-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-[#F7971D]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 items-start space-x-3">
              <div className="flex items-center space-x-2">
                {/* HUMO Logo */}
                <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-2">
                  <Image
                    src="/banks/humo.png"
                    alt="HUMO"
                    width={48}
                    height={30}
                    className="object-contain"
                  />
                </div>
                {/* UZCARD Logo */}
                <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-0">
                  <Image
                    src="/banks/Uzcard.png"
                    alt="UZCARD"
                    width={48}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Humo / Uzcard</div>
                <div className="text-sm text-gray-300">Локальные карты Узбекистана (UZS)</div>
              </div>
            </div>
            {selectedMethod === "uzs" && isLoading && (
              <div className="w-5 h-5 border-2 border-[#F7971D] border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>

          {/* Visa/Mastercard/UnionPay - USD */}
          <button
            onClick={() => handlePayment("usd")}
            disabled={isLoading}
            className={`w-full p-4 border-[#F7971D] border-2 rounded-xl transition-all duration-200 flex items-center justify-between relative ${
              selectedMethod === "usd" 
                ? "border-[#F7971D] bg-[#F7971D]/20" 
                : "border-[#F7971D] hover:border-[#F7971D]/80 bg-gray-800/50"
            } ${
              isLoading && selectedMethod !== "usd" 
                ? "opacity-50 cursor-not-allowed" 
                : "cursor-pointer"
            }`}
          >
            {/* Иконка в верхнем правом углу */}
            <div className="absolute top-2 right-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-[#F7971D]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-2 space-x-3">
              <div className="flex items-center space-x-2">
                {/* Visa Logo */}
                <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-2">
                  <Image
                    src="/banks/visa.webp"
                    alt="VISA"
                    width={48}
                    height={30}
                    className="object-contain"
                  />
                </div>
                {/* Mastercard Logo */}
                <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-3">
                  <Image
                    src="/banks/master.svg.webp"
                    alt="Mastercard"
                    width={48}
                    height={30}
                    className="object-contain"
                  />
                </div>
                {/* UnionPay Logo */}
                <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-2">
                  <Image
                    src="/banks/UnionPay_logo.svg.png"
                    alt="UnionPay"
                    width={48}
                    height={30}
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Visa / Mastercard / UnionPay</div>
                <div className="text-sm text-gray-300">Международные карты (USD)</div>
              </div>
            </div>
            {selectedMethod === "usd" && isLoading && (
              <div className="w-5 h-5 border-2 border-[#F7971D] border-t-transparent rounded-full animate-spin"></div>
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300 mb-4">
            После выбора способа оплаты вы будете перенаправлены на страницу платежной системы
          </p>
          
          {/* Логотипы платежных систем */}
          <div className="flex justify-center items-center space-x-3 text-xs text-gray-400">
            <span>Принимаем:</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center p-1.5">
                <Image
                  src="/banks/visa.webp"
                  alt="VISA"
                  width={20}
                  height={12}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center p-1.5">
                <Image
                  src="/banks/master.svg.webp"
                  alt="Mastercard"
                  width={20}
                  height={12}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center p-1.5">
                <Image
                  src="/banks/UnionPay_logo.svg.png"
                  alt="UnionPay"
                  width={20}
                  height={12}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center p-1.5">
                <Image
                  src="/banks/humo.png"
                  alt="HUMO"
                  width={20}
                  height={12}
                  className="object-contain"
                />
              </div>
              <div className="w-8 h-5 bg-white rounded flex items-center justify-center p-1.5">
                <Image
                  src="/banks/Uzcard.png"
                  alt="UZCARD"
                  width={20}
                  height={12}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

