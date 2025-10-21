// app/payment/page.tsx

import React from "react";

export default function PaymentPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black font-[var(--font-dm-sans)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#fca311] mb-8">
          ПЛАТЕЖНАЯ ПОЛИТИКА
        </h1>
        <div className="text-sm leading-relaxed text-neutral-300 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p>
              Настоящая Платежная политика (далее - "Политика") определяет условия и порядок 
              осуществления платежей за образовательные услуги IELTS MAXXX 1.0, предоставляемые 
              ООО «THE BOTIROFF». Политика действует в соответствии с законодательством Республики 
              Узбекистан и международными стандартами платежных систем.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">2. ПРИНИМАЕМЫЕ СПОСОБЫ ОПЛАТЫ</h2>
            <p>
              Мы принимаем следующие способы оплаты:
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#fca311] font-semibold mb-2">Локальные платежные системы (UZS)</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>HUMO</strong> - национальная платежная система Узбекистана</li>
                  <li><strong>UZCARD</strong> - локальная карточная система</li>
                  <li>Банковские карты узбекских банков</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-[#fca311] font-semibold mb-2">Международные платежные системы (USD)</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>VISA</strong> - международные карты Visa</li>
                  <li><strong>Mastercard</strong> - международные карты Mastercard</li>
                  <li><strong>UnionPay</strong> - китайская платежная система</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">3. ВАЛЮТЫ И КУРСЫ</h2>
            <p>
              Оплата принимается в следующих валютах:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>UZS (узбекский сум)</strong> - для локальных платежных систем</li>
              <li><strong>USD (доллар США)</strong> - для международных платежных систем</li>
            </ul>
            <p className="mt-4">
              Курсы валют устанавливаются платежными системами и могут изменяться в зависимости 
              от рыночных условий. Окончательная сумма к оплате отображается на странице оплаты 
              перед подтверждением транзакции.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">4. ПРОЦЕСС ОПЛАТЫ</h2>
            <p>
              Процесс оплаты включает следующие этапы:
            </p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Выбор способа оплаты (HUMO/Uzcard или Visa/Mastercard/UnionPay)</li>
              <li>Перенаправление на страницу платежной системы</li>
              <li>Ввод данных карты или авторизация в мобильном приложении</li>
              <li>Подтверждение платежа</li>
              <li>Возврат на сайт с подтверждением оплаты</li>
              <li>Активация доступа к материалам</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">5. БЕЗОПАСНОСТЬ ПЛАТЕЖЕЙ</h2>
            <p>
              Все платежи защищены современными технологиями безопасности:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>SSL-шифрование</strong> - все данные передаются по защищенным каналам</li>
              <li><strong>PCI DSS соответствие</strong> - соблюдение стандартов индустрии платежных карт</li>
              <li><strong>3D Secure</strong> - дополнительная аутентификация для карточных платежей</li>
              <li><strong>Токенизация</strong> - чувствительные данные заменены токенами</li>
              <li><strong>Мониторинг мошенничества</strong> - автоматическое выявление подозрительных операций</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">6. КОМИССИИ И ДОПОЛНИТЕЛЬНЫЕ РАСХОДЫ</h2>
            <p>
              Комиссии за обработку платежей:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>HUMO/Uzcard:</strong> 0% - комиссия не взимается</li>
              <li><strong>Visa/Mastercard:</strong> 2.5% - комиссия платежной системы</li>
              <li><strong>UnionPay:</strong> 2.0% - комиссия платежной системы</li>
              <li><strong>Международные переводы:</strong> согласно тарифам банка-эмитента</li>
            </ul>
            <p className="mt-4">
              Все комиссии включены в итоговую сумму к оплате и отображаются перед подтверждением платежа.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">7. ПОДТВЕРЖДЕНИЕ ПЛАТЕЖЕЙ</h2>
            <p>
              После успешной оплаты пользователь получает:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Электронное подтверждение на email</li>
              <li>Уведомление в личном кабинете</li>
              <li>Мгновенную активацию доступа к материалам</li>
              <li>Чек об оплате (при необходимости)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">8. ОБРАБОТКА ОШИБОК ПЛАТЕЖЕЙ</h2>
            <p>
              В случае ошибок при обработке платежа:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Средства автоматически возвращаются на карту в течение 1-3 рабочих дней</li>
              <li>Пользователь уведомляется о проблеме по email</li>
              <li>Предлагается альтернативный способ оплаты</li>
              <li>Техническая поддержка оказывает помощь в решении проблемы</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">9. ВОЗВРАТ СРЕДСТВ</h2>
            <p>
              <strong className="text-red-400">ВОЗВРАТ СРЕДСТВ НЕ ОСУЩЕСТВЛЯЕТСЯ.</strong> 
              В связи с цифровой природой продукта и возможностью мгновенного доступа к материалам 
              после покупки, возврат средств не производится ни при каких обстоятельствах. 
              Покупая книгу, пользователь подтверждает, что ознакомился с содержанием и согласен 
              с данным условием.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">10. НАЛОГОВОЕ ОБЛОЖЕНИЕ</h2>
            <p>
              Все цены указаны с учетом налогов:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>НДС:</strong> включен в стоимость для резидентов Узбекистана</li>
              <li><strong>Международные пользователи:</strong> налоги согласно законодательству страны</li>
              <li><strong>Чеки:</strong> предоставляются в соответствии с требованиями налогового законодательства</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">11. ОТВЕТСТВЕННОСТЬ</h2>
            <p>
              ООО «THE BOTIROFF» не несет ответственности за:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Технические сбои платежных систем</li>
              <li>Блокировку карт банком-эмитентом</li>
              <li>Ошибки пользователя при вводе данных</li>
              <li>Действия третьих лиц (мошенников)</li>
              <li>Изменения курсов валют</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">12. КОНТАКТЫ ПО ПЛАТЕЖАМ</h2>
            <p>
              По вопросам платежей обращайтесь:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> 
                <a 
                  href="mailto:payments@ieltsmaxxx.com" 
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  payments@ieltsmaxxx.com
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
              "Безопасные платежи - основа доверия. Мы используем только проверенные платежные системы." - Команда IELTS MAXXX
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
