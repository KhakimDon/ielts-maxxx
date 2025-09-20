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
  // Пока что оставляем как unknown, пока не увидим реальный ответ
  [key: string]: unknown;
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

// Функция для получения PDF файла из API
export async function getBookPdfFile(accessToken: string, slug: string): Promise<string> {
  try {
    console.log("📖 Загружаем PDF файл из API для slug:", slug);
    
    // Запрашиваем PDF файл напрямую
    const res = await fetch(buildApiUrl(`/main/book/${slug}/BookRead/`), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/pdf, application/json, */*",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка получения PDF файла:", errorText);
      throw new Error("Ошибка получения PDF файла");
    }

    const contentType = res.headers.get("content-type");
    console.log("📖 Content-Type ответа:", contentType);

    // Если ответ - PDF файл
    if (contentType && contentType.includes("application/pdf")) {
      console.log("📖 API вернул PDF файл напрямую");
      const blob = await res.blob();
      console.log("📖 Размер PDF blob:", blob.size, "байт");
      console.log("📖 Тип PDF blob:", blob.type);
      const pdfUrl = URL.createObjectURL(blob);
      console.log("📖 Создан blob URL для PDF:", pdfUrl);
      return pdfUrl;
    }
    
    // Если ответ - JSON (с ссылкой на PDF)
    try {
    const responseData = await res.json();
    console.log("📖 API Response - Данные книги (JSON):", responseData);
    
    // Ищем ссылку на PDF файл в ответе
    let pdfUrl = null;
    if (responseData.file) {
      pdfUrl = responseData.file;
    } else if (responseData.url) {
      pdfUrl = responseData.url;
    } else if (responseData.pdf_url) {
      pdfUrl = responseData.pdf_url;
    } else if (responseData.book_file) {
      pdfUrl = responseData.book_file;
    } else if (responseData.pdf) {
      pdfUrl = responseData.pdf;
    } else if (responseData.content) {
      pdfUrl = responseData.content;
    }

    console.log("📖 Все поля ответа:", Object.keys(responseData));
    console.log("📖 Значения полей:", Object.values(responseData));

    if (!pdfUrl) {
      console.error("📖 Ссылка на PDF не найдена. Доступные поля:", Object.keys(responseData));
      throw new Error("Ссылка на PDF файл не найдена в ответе API");
    }

    console.log("📖 Найдена ссылка на PDF:", pdfUrl);

    // Если это внешняя ссылка, используем её напрямую
    if (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')) {
      console.log("📖 Внешняя ссылка на PDF, используем напрямую");
      return pdfUrl;
    }

    // Если это относительная ссылка, добавляем базовый URL API
    if (pdfUrl.startsWith('/')) {
      const fullUrl = `https://api.doniyortest.uz${pdfUrl}`;
      console.log("📖 Относительная ссылка, создаем полный URL:", fullUrl);
      return fullUrl;
    }

    // Если это просто имя файла, добавляем путь к медиа
    const fullUrl = `https://api.doniyortest.uz/media/${pdfUrl}`;
    console.log("📖 Имя файла, создаем полный URL:", fullUrl);
    return fullUrl;
      
    } catch {
      // Если не JSON, возможно это PDF в текстовом виде
      const textData = await res.text();
      console.log("📖 API Response - Текст (первые 100 символов):", textData.substring(0, 100));
      
      if (textData.includes("PDF") || textData.includes("%PDF")) {
        console.log("📖 Обнаружен PDF контент в тексте, создаем blob");
        const blob = new Blob([textData], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        console.log("📖 Создан blob URL для PDF из текста:", pdfUrl);
        return pdfUrl;
      }
      
      // Если это не PDF, возможно это JSON с ошибкой парсинга
      try {
        const jsonData = JSON.parse(textData);
        console.log("📖 Удалось распарсить JSON после ошибки:", jsonData);
        
        // Ищем ссылку на PDF в распарсенном JSON
        let pdfUrl = null;
        if (jsonData.file) {
          pdfUrl = jsonData.file;
        } else if (jsonData.url) {
          pdfUrl = jsonData.url;
        } else if (jsonData.pdf_url) {
          pdfUrl = jsonData.pdf_url;
        } else if (jsonData.book_file) {
          pdfUrl = jsonData.book_file;
        } else if (jsonData.pdf) {
          pdfUrl = jsonData.pdf;
        } else if (jsonData.content) {
          pdfUrl = jsonData.content;
        }

        if (pdfUrl) {
          console.log("📖 Найдена ссылка на PDF в распарсенном JSON:", pdfUrl);
          
          // Если это внешняя ссылка, используем её напрямую
          if (pdfUrl.startsWith('http://') || pdfUrl.startsWith('https://')) {
            return pdfUrl;
          }

          // Если это относительная ссылка, добавляем базовый URL API
          if (pdfUrl.startsWith('/')) {
            return `https://api.doniyortest.uz${pdfUrl}`;
          }

          // Если это просто имя файла, добавляем путь к медиа
          return `https://api.doniyortest.uz/media/${pdfUrl}`;
        }
      } catch {
        // Игнорируем ошибки парсинга JSON
      }
      
      throw new Error("Неизвестный формат ответа от API");
    }

  } catch (err) {
    console.error("Ошибка получения PDF файла:", err);
    throw err;
  }
}

// Интерфейс для ответа создания заказа
interface CreateOrderResponse {
  url: string;
}

// Функция для создания заказа
export async function createOrder(accessToken: string): Promise<CreateOrderResponse> {
  try {
    console.log("🛒 Создаем заказ...");
    
    const res = await fetch(buildApiUrl("/main/order/create/"), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-CSRFTOKEN": env.CSRF_TOKEN,
      },
      body: JSON.stringify({
        book: 5,
        currency: "uzs"
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка создания заказа:", errorText);
      throw new Error("Ошибка создания заказа");
    }

    const responseData = await res.json();
    console.log("🛒 Заказ создан успешно:", responseData);
    
    return responseData;
  } catch (err) {
    console.error("Ошибка создания заказа:", err);
    throw err;
  }
}
