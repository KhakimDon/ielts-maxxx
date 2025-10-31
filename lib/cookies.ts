// Хелпер для работы с cookies

const REFERRAL_CODE_COOKIE = 'referral_code';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 год в секундах

export function setReferralCode(code: string): void {
  if (typeof document === 'undefined') return;
  
  // Устанавливаем cookie с максимальным сроком действия
  const expires = new Date();
  expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);
  
  document.cookie = `${REFERRAL_CODE_COOKIE}=${code}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

export function getReferralCode(): string | null {
  if (typeof document === 'undefined') return null;
  
  const name = REFERRAL_CODE_COOKIE + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  
  return null;
}

export function clearReferralCode(): void {
  if (typeof document === 'undefined') return;
  
  // Удаляем cookie, устанавливая срок истечения в прошлом
  document.cookie = `${REFERRAL_CODE_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

