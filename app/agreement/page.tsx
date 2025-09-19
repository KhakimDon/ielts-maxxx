// app/agreement/page.tsx

import React from "react";

export default function AgreementPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-white bg-black font-atyp">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#fca311] mb-8">
          УСЛОВИЯ СОГЛАШЕНИЯ
        </h1>
        <div className="text-sm leading-relaxed text-neutral-300 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">1. ОБЩИЕ ПОЛОЖЕНИЯ</h2>
            <p>
              Настоящее Соглашение регулирует отношения между Mr Doniyor (далее - &quot;Автор&quot;) 
              и Пользователем (далее - &quot;Студент&quot;) при использовании образовательного 
              контента &quot;IELTS MAXXX 1.0&quot;. Покупая книгу, Студент автоматически 
              принимает все условия данного соглашения.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">2. ПРЕДМЕТ СОГЛАШЕНИЯ</h2>
            <p>
              Автор предоставляет Студенту доступ к цифровой версии книги &quot;IELTS MAXXX 1.0&quot;, 
              содержащей авторские методики подготовки к экзамену IELTS. Книга включает 
              нестандартные техники, практические задания и секретные стратегии, 
              разработанные Mr Doniyor на основе 10-летнего опыта преподавания.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">3. ПРАВА И ОБЯЗАННОСТИ СТУДЕНТА</h2>
            <p>
              Студент имеет право использовать материалы книги для личной подготовки к IELTS. 
              Запрещается копирование, распространение, продажа или передача материалов 
              третьим лицам. Студент обязуется следовать методикам, изложенным в книге, 
              и нести ответственность за результаты своего обучения.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">4. ГАРАНТИИ И ОТВЕТСТВЕННОСТЬ</h2>
            <p>
              Автор гарантирует качество предоставляемых материалов и их соответствие 
              заявленному содержанию. Однако, Автор не несет ответственности за 
              индивидуальные результаты Студента, так как успех зависит от 
              приложенных усилий и соблюдения методик. Автор не гарантирует 
              конкретный балл IELTS, но предоставляет проверенные инструменты 
              для достижения высоких результатов.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">5. ОТВЕТСТВЕННОСТЬ ЗА НАРУШЕНИЯ</h2>
            <p>
              В случае нарушения авторских прав или условий использования, 
              Студент несет полную материальную ответственность. Автор оставляет 
              за собой право заблокировать доступ к материалам без возврата средств 
              при обнаружении нарушений. Незаконное распространение материалов 
              преследуется по закону.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">6. ВОЗВРАТ СРЕДСТВ</h2>
            <p>
              Возврат средств возможен в течение 7 дней с момента покупки при 
              условии, что Студент не скачал и не использовал материалы книги. 
              После скачивания или использования материалов возврат средств 
              не производится. Запрос на возврат должен быть направлен на 
              официальную почту поддержки.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">7. КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
            <p>
              По всем вопросам, связанным с использованием материалов или 
              техническими проблемами, обращайтесь по следующим контактам:
            </p>
            <div className="mt-4 space-y-2">
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
                  Ташкент, Юнусабадский район, махаллинский сход граждан Адолат, 4-й квартал, 20
                </span>
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
              <p><strong>Instagram:</strong> 
                <a 
                  href="https://www.instagram.com/mr.doniyorbotirov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#fca311] hover:text-white transition-colors cursor-pointer ml-2"
                >
                  @mr.doniyorbotirov
                </a>
              </p>
            </div>
            <p className="mt-4">
              Mr Doniyor и его команда готовы помочь каждому 
              студенту достичь максимальных результатов.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#fca311] mb-4">8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
            <p>
              Настоящее соглашение вступает в силу с момента покупки книги. 
              Автор оставляет за собой право изменять условия соглашения 
              с уведомлением пользователей. Продолжение использования 
              материалов после изменений означает согласие с новыми условиями.
            </p>
          </section>

          <div className="mt-8 p-4 bg-[#fca311] bg-opacity-10 border border-[#fca311] rounded-lg">
            <p className="text-[black] font-bold text-center">
              &quot;Помни: твой успех в IELTS зависит только от тебя. 
              Мы даем тебе оружие - используй его правильно.&quot; - Mr Doniyor
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
