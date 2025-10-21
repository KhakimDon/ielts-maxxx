// app/security/page.tsx

import React from "react";

export default function SecurityPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black font-[var(--font-dm-sans)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#fca311] mb-8">
          ПОЛИТИКА БЕЗОПАСНОСТИ
        </h1>
        <div className="text-sm leading-relaxed text-neutral-300 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p>
               Настоящая Политика безопасности (далее - &quot;Политика&quot;) определяет меры по обеспечению 
               безопасности пользователей и их данных на платформе IELTS MAXXX 1.0, принадлежащей 
               ООО «THE BOTIROFF». Политика разработана в соответствии с международными стандартами
              информационной безопасности и законодательством Республики Узбекистан.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">2. ТЕХНИЧЕСКАЯ БЕЗОПАСНОСТЬ</h2>
            <p>
              Мы применяем многоуровневую систему защиты данных:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>SSL/TLS шифрование</strong> - все данные передаются по защищенным каналам</li>
              <li><strong>Шифрование данных</strong> - персональные данные зашифрованы в базе данных</li>
              <li><strong>Firewall защита</strong> - серверы защищены от несанкционированного доступа</li>
              <li><strong>DDoS защита</strong> - защита от атак на отказ в обслуживании</li>
              <li><strong>Регулярные обновления</strong> - своевременное обновление систем безопасности</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">3. БЕЗОПАСНОСТЬ ПЛАТЕЖЕЙ</h2>
            <p>
              Все платежные операции защищены современными стандартами безопасности:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>PCI DSS соответствие</strong> - соблюдение стандартов индустрии платежных карт</li>
              <li><strong>Токенизация</strong> - чувствительные данные платежей заменены токенами</li>
              <li><strong>3D Secure</strong> - дополнительная аутентификация для карточных платежей</li>
              <li><strong>Мониторинг транзакций</strong> - автоматическое выявление подозрительных операций</li>
              <li><strong>Шифрование платежных данных</strong> - все платежные данные зашифрованы</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">4. ЗАЩИТА ОТ МОШЕННИЧЕСТВА</h2>
            <p>
              Мы используем передовые технологии для предотвращения мошенничества:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Машинное обучение</strong> - ИИ-системы для выявления подозрительной активности</li>
              <li><strong>Анализ поведения</strong> - мониторинг необычных паттернов использования</li>
              <li><strong>Геолокация</strong> - проверка соответствия местоположения и платежных данных</li>
              <li><strong>Верификация устройств</strong> - отслеживание подозрительных устройств</li>
              <li><strong>Черные списки</strong> - блокировка известных мошеннических IP и устройств</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">5. БЕЗОПАСНОСТЬ УЧЕТНЫХ ЗАПИСЕЙ</h2>
            <p>
              Защита пользовательских аккаунтов обеспечивается следующими мерами:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Надежные пароли</strong> - требования к сложности паролей</li>
              <li><strong>Двухфакторная аутентификация</strong> - дополнительная защита аккаунтов</li>
              <li><strong>Сессии с истечением</strong> - автоматический выход из системы</li>
              <li><strong>Уведомления о входе</strong> - информирование о новых входах в аккаунт</li>
              <li><strong>Блокировка при подозрении</strong> - временная блокировка при подозрительной активности</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">6. МОНИТОРИНГ И АУДИТ</h2>
            <p>
              Постоянный мониторинг безопасности включает:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>24/7 мониторинг</strong> - круглосуточное наблюдение за системой</li>
              <li><strong>Логирование событий</strong> - детальное ведение журналов безопасности</li>
              <li><strong>Анализ угроз</strong> - регулярная оценка потенциальных рисков</li>
              <li><strong>Пентестинг</strong> - периодическое тестирование на проникновение</li>
              <li><strong>Аудит безопасности</strong> - независимая оценка мер безопасности</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">7. ОБРАБОТКА ИНЦИДЕНТОВ</h2>
            <p>
              В случае нарушения безопасности мы:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Немедленно изолируем затронутые системы</li>
              <li>Проводим анализ масштаба инцидента</li>
              <li>Уведомляем затронутых пользователей в течение 72 часов</li>
              <li>Принимаем меры по устранению последствий</li>
              <li>Документируем инцидент для предотвращения повторения</li>
              <li>Сообщаем в компетентные органы при необходимости</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">8. ОБУЧЕНИЕ ПОЛЬЗОВАТЕЛЕЙ</h2>
            <p>
              Мы предоставляем рекомендации по безопасности:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Создание надежных паролей</strong> - руководство по выбору паролей</li>
              <li><strong>Распознавание фишинга</strong> - как избежать мошеннических сайтов</li>
              <li><strong>Безопасность устройств</strong> - защита компьютеров и мобильных устройств</li>
              <li><strong>Публичные сети</strong> - осторожность при использовании Wi-Fi</li>
              <li><strong>Регулярные обновления</strong> - важность обновления программного обеспечения</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">9. СОТРУДНИЧЕСТВО С ВЛАСТЯМИ</h2>
            <p>
              В соответствии с законодательством Республики Узбекистан мы сотрудничаем с 
              правоохранительными органами при расследовании киберпреступлений. Передача 
              данных осуществляется только по официальному запросу и в рамках действующего 
              законодательства.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">10. МЕЖДУНАРОДНЫЕ СТАНДАРТЫ</h2>
            <p>
              Наша политика безопасности соответствует международным стандартам:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>ISO 27001</strong> - международный стандарт управления информационной безопасностью</li>
              <li><strong>GDPR</strong> - общие правила защиты данных ЕС</li>
              <li><strong>NIST Framework</strong> - рамочная структура кибербезопасности</li>
              <li><strong>OWASP</strong> - рекомендации по безопасности веб-приложений</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">11. КОНТАКТЫ ПО БЕЗОПАСНОСТИ</h2>
            <p>
              Сообщить о проблемах безопасности можно по следующим каналам:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email безопасности:</strong> 
                <a 
                  href="mailto:security@ieltsmaxxx.com" 
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  security@ieltsmaxxx.com
                </a>
              </p>
              <p><strong>Телефон:</strong> 
                <a 
                  href="tel:+998970066066" 
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  +998 97 006 60 66
                </a>
              </p>
              <p><strong>Telegram:</strong> 
                <a 
                  href="https://t.me/mr_doniyormanager" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  @mr_doniyormanager
                </a>
              </p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-[#fca311] bg-opacity-10 border border-[#fca311] rounded-lg">
            <p className="text-[#fca311] font-bold text-center">
               &quot;Безопасность - это не продукт, а процесс. Мы постоянно совершенствуем наши системы защиты.&quot; - Команда безопасности IELTS MAXXX
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
