"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { setReferralCode } from "@/lib/cookies";
import { getReferralSummary } from "@/lib/api";

export default function ReferalPage() {
  const router = useRouter();
  const params = useParams();
  const code = params?.code as string;
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAndSaveReferral = async () => {
      if (!code) {
        router.push("/");
        return;
      }

      try {
        // Проверяем, авторизован ли пользователь
        const accessToken = localStorage.getItem("access_token");
        
        if (accessToken) {
          try {
            // Получаем реферальный код текущего пользователя
            const referralSummary = await getReferralSummary(accessToken, 'uzs');
            const userReferralCode = referralSummary.code;
            
            // Если код из URL совпадает с кодом пользователя, не сохраняем
            if (userReferralCode && userReferralCode === code) {
              console.log("Пользователь перешел по своей реферальной ссылке, код не сохраняется");
              router.push("/");
              return;
            }
          } catch (error) {
            // Если не удалось получить код пользователя, продолжаем сохранение
            console.log("Не удалось проверить реферальный код пользователя, сохраняем код из URL");
          }
        }

        // Сохраняем реферальный код в cookies (код не принадлежит пользователю или пользователь не авторизован)
        setReferralCode(code);
        
        // Редиректим на главную страницу
        router.push("/");
      } catch (error) {
        console.error("Ошибка при обработке реферальной ссылки:", error);
        router.push("/");
      } finally {
        setIsChecking(false);
      }
    };

    checkAndSaveReferral();
  }, [code, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
        <p>Перенаправление...</p>
      </div>
    </div>
  );
}

