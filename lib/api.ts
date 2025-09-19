import { buildApiUrl, env } from "./env";

// Интерфейсы для типизации
interface LoginResponse {
  access: string;
  refresh: string;
}

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

interface RefreshResponse {
  access: string;
}

interface ConfirmPhoneResponse {
  access: string;
  refresh: string;
}

interface BookData {
  id: number;
  title: string;
  slug: string;
  is_purchased: boolean;
}

interface BookReadResponse {
  // Здесь будет структура ответа от API BookRead
  // Пока что оставляем как any, пока не увидим реальный ответ
  [key: string]: any;
}

// Функция для получения данных пользователя
export async function getUserData(accessToken: string): Promise<UserData> {
  try {
    const res = await fetch(buildApiUrl(env.PROFILE_ENDPOINT), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка получения данных пользователя:", errorText);
      throw new Error("Ошибка получения данных пользователя");
    }

    const responseData = await res.json();
    console.log("📡 API Response - Данные пользователя:", responseData);
    
    // API возвращает массив, берем первый элемент
    const userData = Array.isArray(responseData) ? responseData[0] : responseData;
    
    if (!userData) {
      throw new Error("Данные пользователя не найдены");
    }
    
    console.log("👤 Извлеченные данные пользователя:", userData);
    
    return userData;
  } catch (err) {
    console.error("Ошибка получения данных пользователя:", err);
    throw err;
  }
}

// Функция для обновления токена
export async function refreshToken(refreshToken: string): Promise<RefreshResponse> {
  try {
    const res = await fetch(buildApiUrl(env.REFRESH_ENDPOINT), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!res.ok) {
      throw new Error("Ошибка обновления токена");
    }

    return await res.json();
  } catch (err) {
    console.error("Ошибка обновления токена:", err);
    throw err;
  }
}

// Функция для входа пользователя
export async function loginUser(phone: string, password: string): Promise<LoginResponse> {
  try {
    // Убираем +998 или 998 из начала номера телефона для бэкенда
    const cleanPhone = phone.replace(/^(\+998|998)/, '');
    
    const res = await fetch(buildApiUrl(env.LOGIN_ENDPOINT), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", 
      },
      body: JSON.stringify({
        phone_number: cleanPhone,
        password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || "Неверный номер телефона или пароль");
    }

    return await res.json();
  } catch (err) {
    console.error("Ошибка логина:", err);
    throw err;
  }
}

// Функция для подтверждения OTP кода
export async function confirmPhone(phone: string, code: string): Promise<ConfirmPhoneResponse> {
  try {
    console.log("📱 Подтверждение OTP для номера:", phone, "код:", code);
    
    const res = await fetch(buildApiUrl(env.CONFIRM_PHONE_ENDPOINT), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
      body: JSON.stringify({
        phone_number: phone,
        code: code,
      }),
    });

    const responseData = await res.json();
    console.log("📡 API Response - Подтверждение OTP:", responseData);

    if (!res.ok) {
      throw new Error(responseData.message || "Неверный код подтверждения");
    }

    // Сохраняем токены в localStorage
    if (responseData.access && responseData.refresh) {
      localStorage.setItem("access_token", responseData.access);
      localStorage.setItem("refresh_token", responseData.refresh);
      console.log("✅ Токены сохранены в localStorage");
    }

    return responseData;
  } catch (err) {
    console.error("Ошибка подтверждения OTP:", err);
    throw err;
  }
}

// Функция для получения списка книг
export async function getBookList(accessToken: string): Promise<BookData[]> {
  try {
    const res = await fetch(buildApiUrl('/main/book/BookList/'), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка получения списка книг:", errorText);
      throw new Error("Ошибка получения списка книг");
    }

    const responseData = await res.json();
    console.log("📚 API Response - Список книг:", responseData);
    
    return responseData;
  } catch (err) {
    console.error("Ошибка получения списка книг:", err);
    throw err;
  }
}

// Функция для получения книги по slug для чтения
export async function getBookRead(accessToken: string, slug: string): Promise<BookReadResponse> {
  try {
    const res = await fetch(buildApiUrl(`/main/book/${slug}/BookRead/`), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка получения книги для чтения:", errorText);
      throw new Error("Ошибка получения книги для чтения");
    }

    const responseData = await res.json();
    console.log("📖 API Response - Книга для чтения:", responseData);
    
    return responseData;
  } catch (err) {
    console.error("Ошибка получения книги для чтения:", err);
    throw err;
  }
}
