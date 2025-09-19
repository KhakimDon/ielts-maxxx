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
              Это не просто книга. Это оружие для уничтожения IELTS. Mr Doniyor создал 
              методику, которая ломает все стандартные подходы к подготовке. Здесь нет 
              скучных правил и зубрежки - только брутальные техники, которые работают 
              на 100%. Забудь про традиционные курсы и репетиторов. Эта книга - твой 
              билет к 8.0+ баллам. Не веришь? Посмотри на результаты наших студентов. 
              Они не просто сдают IELTS - они его уничтожают. Время перестать мечтать 
              и начать действовать. Твой высокий балл ждет тебя на страницах этой книги.
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
              Цель проста и ясна - сделать тебя машиной для сдачи IELTS. Не просто 
              сдать экзамен, а уничтожить его с результатом 8.0+. Mr Doniyor 
              разработал систему, которая работает даже для тех, кто считает себя 
              &quot;неспособным к языкам&quot;. Здесь ты найдешь секретные техники, которые 
              не преподают в обычных школах. Мы не учим тебя зубрить - мы учим 
              тебя думать как носитель языка. Каждая страница этой книги - это 
              шаг к твоей мечте. Университет за границей, работа мечты, 
              иммиграция - все это станет реальностью. Хватит оправданий. 
              Хватит откладывать. Твоя цель - 8.0+. Наша цель - помочь тебе 
              ее достичь. Время действовать.
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
