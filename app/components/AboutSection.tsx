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

      <div className="relative z-10 w-[90%] mx-auto space-y-20">
        {/* Блок "О КНИГЕ" */}
        <div>
          <h2 className="text-[#fca311] text-4xl sm:text-4xl font-bold uppercase mb-6 text-center">
            О КНИГЕ
          </h2>
          <div className="relative text-neutral-300 leading-relaxed text-sm sm:text-base px-4 sm:px-10">
            <span className="absolute -left-2 -top-4 text-[#fca311] text-6xl font-bold">
              “
            </span>
            <p className="text-[16px] font-semibold! tracking-wider !font-[var(--font-atyp)]">
              Lorem ipsum dolor sit amet consectetur. Aliquam velit pellentesque
              in nec pharetra condimentum laoreet diam. Egestas mollis feugiat
              diam amet eu rhoncus lectus facilisis. Vitae faucibus mauris diam
              nunc. Tortor lacus at dictumst pellentesque... Lorem ipsum dolor
              sit amet consectetur. laoreet diam. Egestas mollis feugiat diam
              amet eu rhoncus lectus facilisis. Vitae faucibus mauris diam nunc.
              lor sit amet consectetur. lis feugiat diam amet eu rhoncus lectus
              facilisis. Vitae faucibus Lorem ipsum dolor sit amet consectetur.
              Aliquam velit pellentesque in nec pharetra condimentum laoreet
              diam. Egestas mollis feugiat diam amet eu rhoncus lectus
              facilisis. Vitae faucibus mauris mauris diam nunc. Tortor la
              laoreet diam. Egesnunc. Tortor la laoreet diam. Egestas
              mollis feugiat diam amet eu rhoncus lectus facilisis. Vitae
              faucibus Tortor l Lorem ipsum dolor sit amet consectetur. Aliquam
              velit pellentesque in nec pharetra condimentum laoreet diam.
              Egestas mollis feugiat diam amet eu rhoncus lectus facilisis Lorem
              ipsum dolor sit amet consectetur. Aliquam velit pellentesque in
              nec pharetra condimentum laoreet diam. Egestas mollis feugiat diam
              amet eu rhoncus lectus facilisis...
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
            <p className="text-[16px] !font-[var(--font-atyp)] tracking-wider font-semibold! leading-[1.8]">
              Lorem ipsum dolor sit amet consectetur. Aliquam velit pellentesque
              in nec pharetra condimentum laoreet diam. Egestas mollis feugiat
              diam amet eu rhoncus lectus facilisis. Vitae faucibus mauris diam
              nunc. Tortor lacus at dictumst pellentesque... Lorem ipsum dolor
              sit amet consectetur. laoreet diam. Egestas mollis feugiat diam
              amet eu rhoncus lectus facilisis. Vitae faucibus mauris diam nunc.
              lor sit amet consectetur. lis feugiat diam amet eu rhoncus lectus
              facilisis. Vitae faucibus Lorem ipsum dolor sit amet consectetur.
              Aliquam velit pellentesque in nec pharetra condimentum laoreet
              diam. Egestas mollis feugiat diam amet eu rhoncus lectus
              facilisis. Vitae faucibus mauris mauris diam nunc. Tortor la
              laoreet diam. Egesnunc. Tortor la laoreet diam. Egestas
              mollis feugiat diam amet eu rhoncus lectus facilisis. Vitae
              faucibus Tortor l Lorem ipsum dolor sit amet consectetur. Aliquam
              velit pellentesque in nec pharetra condimentum laoreet diam.
              Egestas mollis feugiat diam amet eu rhoncus lectus facilisis Lorem
              ipsum dolor sit amet consectetur. Aliquam velit pellentesque in
              nec pharetra condimentum laoreet diam. Egestas mollis feugiat diam
              amet eu rhoncus lectus facilisis...
            </p>
          </div>

          {/* МИШЕНЬ */}
          <div className="flex justify-center">
            <Image
              src="/target.svg"
              alt="Мишень"
              width={350}
              height={350}
              className="w-full max-w-[300px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
