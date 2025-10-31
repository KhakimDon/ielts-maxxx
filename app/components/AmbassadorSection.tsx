"use client";
import { useState, useMemo } from "react";
import { useReferralBalance } from "@/hooks/useReferralBalance";
import { useReferralPurchases } from "@/hooks/useReferralPurchases";
import WithdrawModal from "./WithdrawModal";
// import { getReferralData, withdrawFunds } from "@/lib/api"; // Пока не используется


export default function AmbassadorSection() {
  const { referralData, isLoading, error } = useReferralBalance();
  const { promoData } = useReferralPurchases();
  const [copied, setCopied] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Показываем промокод пользователя
  const referralCode = referralData?.code || "";

  // Формируем полную реферальную ссылку для отображения
  const referralLink = useMemo(() => {
    if (!referralCode) return "";
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/referal/${referralCode}`;
  }, [referralCode]);

  // Используем баланс из API
  const balance = referralData?.balance.uzs || 0;
  const usdBalance = referralData?.balance.usd || 0;

  const copyReferralLink = async () => {
    if (!referralLink) return;
    
    try {
      // Пробуем современный API
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
      } else {
        // Fallback для старых браузеров и мобильных устройств
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
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
          alert(`Скопируйте ссылку вручную:\n${referralLink}`);
          return;
        }
        
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
      // Показываем текст для ручного копирования
      alert(`Скопируйте ссылку вручную:\n${referralLink}`);
    }
  };

  const handleWithdraw = () => {
    if (!promoData) return;
    setIsWithdrawModalOpen(true);
  };

  const formatBalance = () => {
    if (isLoading) return "Загрузка...";
    if (error) return "Ошибка загрузки";
    return `${balance.toLocaleString()} Сум${usdBalance > 0 ? ` ($${usdBalance.toFixed(2)})` : ''}`;
  };

  if (isLoading) {
    return (
      <div className="bg-black border border-[#F7971D] rounded-2xl p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black border border-[#F7971D] rounded-2xl p-6 mb-8">
        <div className="text-center text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!referralData) {
    return null;
  }

  return (
    <div className="sm:w-[90%] w-full rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 font-[var(--font-dm-sans)]">
      {/* Заголовок */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#F7971D] text-center mb-6 sm:mb-8 px-4">
        СТАНЬ НАШИМ АМБАССАДОРОМ
      </h2>

      {/* Реферальная ссылка и баланс */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-[200px] mb-8">
        {/* Реферальная ссылка */}
        <div className="space-y-3">
          <label className="block text-[#F7971D] font-semibold text-sm sm:text-base">
            ВАШ РЕФЕРАЛЬНЫЙ КОД
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[#F7971D] rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F7971D]/50"
            />
            <button
              onClick={copyReferralLink}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#F7971D] text-white font-semibold rounded-xl hover:bg-[#F7971D]/90 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              {copied ? "Скопировано!" : "Скопировать"}
            </button>
          </div>
        </div>

        {/* Баланс */}
        <div className="space-y-3">
          <label className="block text-[#F7971D] font-semibold text-sm sm:text-base">
            ВАШ БАЛАНС
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-[#F7971D] rounded-xl text-white text-sm sm:text-base">
              {formatBalance()}
            </div>
            <button
              onClick={handleWithdraw}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-[#F7971D] text-white font-semibold rounded-xl hover:bg-[#F7971D]/90 transition-colors whitespace-nowrap text-sm sm:text-base"
            >
              Вывести средства
            </button>
          </div>
        </div>
      </div>

      {/* Таблица покупок */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          КУПИЛИ ВО ТВОЕЙ РЕФЕРАЛКЕ:
        </h3>

        <div className="border border-[#F7971D] rounded-xl overflow-hidden">
          {/* Заголовки таблицы - скрыты на мобильных */}
          <div className="hidden sm:grid grid-cols-3 gap-4 p-4 text-[#F7971D] border-b border-[#F7971D] font-semibold">
            <div>ПОЛЬЗОВАТЕЛЬ</div>
            <div>ДАТА ПОКУПКИ</div>
            <div>СУММА</div>
          </div>

          {promoData?.buyers && promoData.buyers.length > 0 ? (
            promoData.buyers.map((buyer, index) => (
              <div
                key={buyer.id}
                className={`${index < promoData.buyers.length - 1 ? 'border-b border-[#F7971D]' : ''
                  }`}
              >
                {/* Десктопная версия */}
                <div className="hidden sm:grid grid-cols-3 gap-4 p-4 text-white">
                  <div className="font-medium">
                    {buyer.first_name || buyer.last_name
                      ? `${buyer.first_name} ${buyer.last_name}`.trim()
                      : 'Не указано'
                    }
                  </div>
                  <div>
                    {new Date(buyer.paid_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div>
                    +100.000 Сум
                  </div>
                </div>

                {/* Мобильная версия */}
                <div className="sm:hidden p-4 text-white">
                  <div className="font-medium text-[#F7971D] mb-2">
                    {buyer.first_name || buyer.last_name
                      ? `${buyer.first_name} ${buyer.last_name}`.trim()
                      : 'Не указано'
                    }
                  </div>
                  <div className="text-sm text-gray-300 mb-1">
                    {new Date(buyer.paid_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="text-sm">
                    +100.000 Сум
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 sm:p-8 text-center text-gray-400 text-sm sm:text-base">
              Пока нет покупок по вашей реферальному коду
            </div>
          )}
        </div>
      </div>

      {/* Модалка вывода средств */}
      {referralData && (
        <WithdrawModal
          isOpen={isWithdrawModalOpen}
          onClose={() => setIsWithdrawModalOpen(false)}
          balance={balance}
          currency="UZS"
        />
      )}
    </div>
  );
}
