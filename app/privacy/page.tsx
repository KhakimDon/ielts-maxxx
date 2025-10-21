// app/privacy/page.tsx

import React from "react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black font-[var(--font-dm-sans)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#fca311] mb-8">
          ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
        </h1>
        <div className="text-sm leading-relaxed text-neutral-300 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p>
              Настоящая Политика конфиденциальности (далее - "Политика") определяет порядок обработки 
              персональных данных пользователей сайта IELTS MAXXX 1.0, принадлежащего ООО «THE BOTIROFF» 
              (далее - "Компания"). Политика действует в соответствии с законодательством Республики 
              Узбекистан и международными стандартами защиты данных.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">2. СБОР ПЕРСОНАЛЬНЫХ ДАННЫХ</h2>
            <p>
              Мы собираем следующие категории персональных данных:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Имя и контактная информация (телефон, email)</li>
              <li>Данные для регистрации и аутентификации</li>
              <li>Информация о платежах и транзакциях</li>
              <li>Данные об использовании сервиса (логи, IP-адрес)</li>
              <li>Реферальные коды и данные партнерской программы</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">3. ЦЕЛИ ОБРАБОТКИ ДАННЫХ</h2>
            <p>
              Персональные данные обрабатываются для следующих целей:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Предоставление образовательных услуг</li>
              <li>Обработка платежей и заказов</li>
              <li>Техническая поддержка пользователей</li>
              <li>Улучшение качества сервиса</li>
              <li>Соблюдение правовых обязательств</li>
              <li>Маркетинговые коммуникации (с согласия пользователя)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">4. ПРАВА ПОЛЬЗОВАТЕЛЕЙ</h2>
            <p>
              Пользователи имеют следующие права в отношении своих персональных данных:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Право на доступ к своим данным</li>
              <li>Право на исправление неточных данных</li>
              <li>Право на удаление данных</li>
              <li>Право на ограничение обработки</li>
              <li>Право на портабельность данных</li>
              <li>Право на возражение против обработки</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">5. ЗАЩИТА ДАННЫХ</h2>
            <p>
              Мы применяем современные технические и организационные меры для защиты персональных данных:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Шифрование данных при передаче и хранении</li>
              <li>Ограничение доступа к данным</li>
              <li>Регулярное обновление систем безопасности</li>
              <li>Обучение сотрудников вопросам защиты данных</li>
              <li>Мониторинг и аудит доступа к данным</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">6. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ</h2>
            <p>
              Мы не передаем персональные данные третьим лицам, за исключением случаев:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Получения явного согласия пользователя</li>
              <li>Выполнения договорных обязательств</li>
              <li>Соблюдения правовых требований</li>
              <li>Защиты прав и интересов Компании</li>
              <li>Работы с платежными системами (только необходимые данные)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">7. МЕЖДУНАРОДНЫЕ ПЕРЕДАЧИ</h2>
            <p>
              При передаче данных за пределы Республики Узбекистан мы обеспечиваем адекватный уровень 
              защиты в соответствии с международными стандартами. Все международные передачи данных 
              осуществляются с соблюдением требований законодательства Узбекистана и стран назначения.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">8. ХРАНЕНИЕ ДАННЫХ</h2>
            <p>
              Персональные данные хранятся в течение времени, необходимого для достижения целей 
              обработки, но не более 5 лет с момента последнего взаимодействия с пользователем. 
              Данные о платежах хранятся в соответствии с требованиями налогового законодательства.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">9. COOKIES И АНАЛИТИКА</h2>
            <p>
              Мы используем cookies и аналогичные технологии для улучшения пользовательского опыта, 
              анализа трафика и персонализации контента. Пользователи могут управлять настройками 
              cookies через настройки браузера.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">10. КОНТАКТЫ</h2>
            <p>
              По вопросам обработки персональных данных обращайтесь:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> 
                <a 
                  href="mailto:privacy@ieltsmaxxx.com" 
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  privacy@ieltsmaxxx.com
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
              <p><strong>Адрес:</strong> 
                <span className="text-neutral-300 ml-2">
                  Узбекистан, Ташкент, Юнусобод-4
                </span>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">11. ИЗМЕНЕНИЯ В ПОЛИТИКЕ</h2>
            <p>
              Мы оставляем за собой право изменять настоящую Политику. О существенных изменениях 
              пользователи будут уведомлены через сайт или по электронной почте. Продолжение 
              использования сервиса после изменений означает согласие с новой версией Политики.
            </p>
          </section>

          <div className="mt-8 p-4 bg-[#fca311] bg-opacity-10 border border-[#fca311] rounded-lg">
            <p className="text-white font-bold text-center">
              "Ваша конфиденциальность - наш приоритет. Мы защищаем ваши данные как свои собственные."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
