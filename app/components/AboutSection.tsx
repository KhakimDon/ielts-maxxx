"use client";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black text-white py-20 px-4 sm:px-10 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[500px] h-[1000px] z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, #fca31155 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="absolute bottom-10 right-0 w-[300px] h-[1000px] z-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, #fca31155 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 w-[90%] sm:w-[90%] w-[95%] mx-auto space-y-20">
        {/* Блок "О КНИГЕ" */}
        <div>
          <h2 className="text-[#fca311] text-4xl sm:text-4xl font-bold uppercase mb-6 text-center">
            О КНИГЕ
          </h2>
          <div className="relative text-neutral-300 leading-relaxed text-sm sm:text-base px-2 sm:px-10">
            <span className="absolute -left-2 -top-4 text-[#fca311] text-6xl font-bold">
              “
            </span>
            <p className="text-[12px] sm:text-[16px] font-semibold! tracking-wider !font-[var(--font-atyp)] text-center sm:text-left">
              Это не просто книга. Это оружие для уничтожения IELTS — без цензуры, без соплей, без воды.
              Mr.Doniyor создал методику, которая ломает все стандартные подходы к подготовке.
              Здесь нет скучных правил и детсадовской грамматики. Только брутальные техники, которые работают на 100%.
              Забудь про репетиторов, курсы и “лайтовые советы”.
              <br />
              <br />
              Эта книга — твой билет в 7.0+, если ты готов пахать и не искать оправданий.
              Не веришь? Посмотри на наших студентов — они не просто сдают IELTS, они разносят его в клочья.
              <br />
              <br />
              ⚠️ Эта книга 18+
              Без фильтров. Без цензуры. Без фальши.
              Только реальные методы, реальные ошибки и реальные победы.
              <br />
              <br />
              Время перестать мечтать.
              Твой высокий балл ждёт тебя здесь.
              <br />
              Добро пожаловать в зону, где выживают только те, кто готов действовать.
            </p>
            <span className="absolute -right-2 -bottom-4 text-[#fca311] text-5xl font-bold rotate-180">
              “
            </span>
          </div>
        </div>

        <br />
        <br />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-center w-[100%]">
          {/* ТЕКСТ */}
          <div className="lg:col-span-2">
            <h2 className="text-[#fca311] !font-[var(--font-atyp)] text-center text-4xl sm:text-4xl font-bold! uppercase mb-6">
              ЦЕЛЬ ЭТОЙ КНИГИ
            </h2>
            <p className="text-[12px] sm:text-[16px] !font-[var(--font-atyp)] tracking-wider font-semibold! leading-[1.8] px-2 sm:px-0 text-center sm:text-left">
              Никаких красивых слов — только цель: сделать из тебя инструмент точного уничтожения IELTS.
              Не просто сдать экзамен, а уничтожить его с результатом 8.0+.
              Mr.Doniyor разработал систему, которая работает даже для тех, кто считает себя “без способностей к языкам”.
              Здесь — секретные техники, которых нет ни в школах, ни в курсах, ни на YouTube.
              Мы не учим тебя зубрить. Мы перепрошиваем твоё мышление.
              Ты начнёшь мыслить, писать и говорить, как человек, который управляет языком, а не наоборот.
              <br /> 
              Каждая страница этой книги — шаг к жизни без границ: <br />
              📍 Университет за рубежом <br />
              📍 Работа мечты <br />
              📍 Иммиграция и свобода <br />
              <br />
              Это не мотивация. Это инструкция по выживанию в мире IELTS.
              Хватит откладывать. Хватит жаловаться.
              Твоя цель — 7.0+. Наша цель — сделать так, чтобы ты её взял.
            </p>
          </div>

          {/* МИШЕНЬ */}
          <div className="flex justify-center">
            <Image
              src="/target.svg"
              alt="Мишень"
              width={350}
              height={350}
              className="w-full max-w-[300px] sm:max-w-[300px] max-w-[200px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
