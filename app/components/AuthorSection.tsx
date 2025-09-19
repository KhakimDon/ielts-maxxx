"use client";
import Image from "next/image";

export default function AuthorSection() {
  return (
    <section id="author" className="relative bg-black text-white p-5 px-4 sm:px-10 overflow-hidden">
      <h2 className="text-[#fca311] !font-[var(--font-atyp)] !font-extrabold text-3xl sm:text-4xl uppercase text-center mb-12">
        Автор этой книги
      </h2>

      {/* Left top glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, #fca31155 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Right bottom glow */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at bottom right, #fca31155 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="w-[90%] sm:w-[90%] w-[95%] mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        <div className="text-base sm:text-lg leading-relaxed font-normal md:w-[60%]">
          <p className="leading-6 !font-[var(--font-atyp)] text-[12px] sm:text-[16px] tracking-[1px] font-atyp mt-[40px] text-center sm:text-left">
            Mr Doniyor - это не просто преподаватель. Это революционер в мире IELTS. 
            За 10 лет он помог более 50,000 студентов достичь невозможного. Его 
            методики считаются &quot;нестандартными&quot; только потому, что они работают 
            там, где традиционные подходы терпят поражение. Doniyor не верит в 
            &quot;волшебные таблетки&quot; - он верит в систему. Систему, которая превращает 
            слабых студентов в чемпионов IELTS. Его ученики получают 8.0+ не потому, 
            что они гении, а потому что они следуют проверенной формуле успеха. 
            &quot;IELTS - это не экзамен по английскому. Это игра, и я научил тебя 
            в нее играть&quot; - говорит Mr Doniyor. И он прав. Тысячи студентов 
            доказали это своими результатами. Теперь твоя очередь.
          </p>
        </div>

        <div className="md:w-[30%] w-[100%] mb-[30px] flex justify-center md:justify-end">
          <Image
            src="/person.png"
            alt="author"
            width={300}
            height={400}
            className="w-full max-w-[400px] sm:max-w-[400px] max-w-[250px] h-auto rounded-[30px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
