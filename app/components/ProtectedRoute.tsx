"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserData } from "@/hooks/useUserData";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useUserData();
  const router = useRouter();

  console.log("🔍 ProtectedRoute Debug:", { isAuthenticated, isLoading });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("🚫 Неавторизованный пользователь, перенаправление на главную");
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Показываем загрузку пока проверяем авторизацию
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fca311] mx-auto mb-4"></div>
          <p className="text-[#fca311]">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован, не показываем контент
  if (!isAuthenticated) {
    return null;
  }

  // Если авторизован, показываем контент
  return <>{children}</>;
}
