// Централизованная функция для очистки всех пользовательских данных

// Очистка данных реферальных покупок
let clearReferralPurchases: (() => void) | null = null;
export const setClearReferralPurchases = (fn: () => void) => {
  clearReferralPurchases = fn;
};

// Очистка данных реферального баланса
let clearReferralBalance: (() => void) | null = null;
export const setClearReferralBalance = (fn: () => void) => {
  clearReferralBalance = fn;
};

// Очистка данных заказов
let clearOrderCount: (() => void) | null = null;
export const setClearOrderCount = (fn: () => void) => {
  clearOrderCount = fn;
};

// Очистка данных пользователя
let clearUserData: (() => void) | null = null;
export const setClearUserData = (fn: () => void) => {
  clearUserData = fn;
};

// Очистка данных книг
let clearBookData: (() => void) | null = null;
export const setClearBookData = (fn: () => void) => {
  clearBookData = fn;
};

// Главная функция очистки всех данных
export const clearAllUserData = () => {
  console.log("🧹 Очищаем все пользовательские данные...");
  
  // Очищаем localStorage
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_data");
  
  // Очищаем все кэшированные данные
  clearReferralPurchases?.();
  clearReferralBalance?.();
  clearOrderCount?.();
  clearUserData?.();
  clearBookData?.();
  
  console.log("✅ Все пользовательские данные очищены");
};
