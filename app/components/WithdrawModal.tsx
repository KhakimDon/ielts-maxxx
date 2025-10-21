"use client";
import { useState } from "react";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  currency: string;
}

export default function WithdrawModal({ isOpen, onClose, balance, currency }: WithdrawModalProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  if (!isOpen) return null;

  const adminPhone = "+998 90 123 45 67";
  const adminTelegram = "@admin_support";

  const copyToClipboard = async (text: string, type: 'phone' | 'telegram') => {
    try {
      // Пробуем современный API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback для старых браузеров и мобильных устройств
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed:', err);
          // Показываем текст для ручного копирования
          alert(`Скопируйте вручную:\n${text}`);
          return;
        }
        
        document.body.removeChild(textArea);
      }
      
      if (type === 'phone') {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedTelegram(true);
        setTimeout(() => setCopiedTelegram(false), 2000);
      }
    } catch (err) {
      console.error("Ошибка при копировании:", err);
      // Показываем текст для ручного копирования
      alert(`Скопируйте вручную:\n${text}`);
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toLocaleString()} ${currency}`;
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2">
      <div className="bg-black border border-[#F7971D] rounded-2xl p-4 w-full max-w-md mx-0 font-[var(--font-dm-sans)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Вывод средств</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Информация о сумме */}
          <div className="text-center">
            <p className="text-gray-300 mb-2">Сумма к выводу:</p>
            <p className="text-2xl font-bold text-[#F7971D]">
              {formatAmount(balance, currency)}
            </p>
          </div>

          {/* Инструкция */}
          <div className="bg-gray-800/50 border border-[#F7971D]/30 rounded-xl p-4">
            <p className="text-white text-center mb-4">
              Для вывода средств свяжитесь с администратором
            </p>
            <p className="text-gray-300 text-sm text-center">
              Администратор переведет деньги на вашу карту после подтверждения
            </p>
          </div>

          {/* Контакты администратора */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white text-left sm:text-center">
              Контакты администратора:
            </h3>

            {/* Телефон */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-800/50 border border-[#F7971D]/30 rounded-xl gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#F7971D] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium">Телефон</p>
                  <p className="text-gray-300 text-sm break-all">{adminPhone}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(adminPhone, 'phone')}
                className="px-4 py-2 bg-[#F7971D] text-black font-semibold rounded-lg hover:bg-[#F7971D]/90 transition-colors text-sm w-full sm:w-auto flex-shrink-0"
              >
                {copiedPhone ? "Скопировано!" : "Копировать"}
              </button>
            </div>

            {/* Telegram */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-800/50 border border-[#F7971D]/30 rounded-xl gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#F7971D] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium">Telegram</p>
                  <p className="text-gray-300 text-sm break-all">{adminTelegram}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(adminTelegram, 'telegram')}
                className="px-4 py-2 bg-[#F7971D] text-black font-semibold rounded-lg hover:bg-[#F7971D]/90 transition-colors text-sm w-full sm:w-auto flex-shrink-0"
              >
                {copiedTelegram ? "Скопировано!" : "Копировать"}
              </button>
            </div>
          </div>

          {/* Кнопка закрытия */}
          <div className="text-center">
            <button
              onClick={onClose}
              className="px-8 py-3 w-full bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors"
            >
              Понятно
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
