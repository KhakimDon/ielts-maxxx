# Настройка переменных окружения

## Создание .env файла

Скопируйте файл `env.example` в `.env.local` и настройте переменные:

```bash
cp env.example .env.local
```

## Переменные окружения

### API Configuration
- `NEXT_PUBLIC_API_BASE_URL` - Базовый URL API (по умолчанию: https://api.doniyortest.uz)
- `NEXT_PUBLIC_API_VERSION` - Версия API (по умолчанию: /api/v1)
- `NEXT_PUBLIC_LOGIN_ENDPOINT` - Endpoint для авторизации (по умолчанию: /user/auth/Login/)
- `NEXT_PUBLIC_REGISTER_ENDPOINT` - Endpoint для регистрации (по умолчанию: /user/auth/Register/)
- `NEXT_PUBLIC_PAYMENT_LINK` - Ссылка для оплаты (по умолчанию: https://your-payment-link.com)

## Пример .env.local файла

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.doniyortest.uz
NEXT_PUBLIC_API_VERSION=/api/v1
NEXT_PUBLIC_LOGIN_ENDPOINT=/user/auth/Login/
NEXT_PUBLIC_REGISTER_ENDPOINT=/user/auth/Register/
NEXT_PUBLIC_PAYMENT_LINK=https://your-payment-link.com
```

## Важные замечания

1. Все переменные должны начинаться с `NEXT_PUBLIC_` для доступности в браузере
2. Файл `.env.local` не должен быть добавлен в git (уже добавлен в .gitignore)
3. После изменения переменных перезапустите сервер разработки
4. Для production используйте переменные окружения вашего хостинга

## Использование в коде

```typescript
import { env, buildApiUrl } from "@/lib/env";

// Получение полного URL для API
const loginUrl = buildApiUrl(env.LOGIN_ENDPOINT);

// Прямое использование переменных
const paymentLink = env.PAYMENT_LINK;
```
