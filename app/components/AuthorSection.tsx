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

      <div className="w-[90%] mx-auto flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        <div className="text-base sm:text-lg leading-relaxed font-normal md:w-[60%]">
          <p className="leading-6 !font-[var(--font-atyp)] text-[16px] tracking-[1px] font-atyp mt-[40px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae 
            consectetur ea aliquid autem soluta atque blanditiis incidunt, sit
             voluptatum perferendis magnam obcaecati ut a. Animi quas nulla non 
             dolorum eius consequuntur beatae eveniet repellendus sapiente facere. 
             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio cum sit, nobis voluptates debitis pariatur cupiditate, sequi repellendus eius optio recusandae nemo! Eaque a quibusdam ut nemo aliquam accusantium, porro ea magnam harum, corporis, nesciunt beatae ab sint doloremque alias perspiciatis explicabo fuga veniam eveniet eligendi cumque laudantium deserunt illum asperiores. Deserunt nam odit ullam, quaerat reiciendis quidem vel soluta id doloremque! Maiores sint id saepe, iusto eaque, deleniti corrupti fugiat necessitatibus doloribus non possimus est et excepturi iure sapiente? At eum tempora nemo, saepe neque fugit aperiam repellendus accusantium eaque exercitationem distinctio dolor facere debitis cum autem eos perspiciatis asperiores adipisci dolore nulla! Maxime, sint beatae. Maxime suscipit unde molestiae repellendus accusamus repudiandae ad iure nobis voluptatum saepe necessitatibus dolores, tenetur quae tempore voluptates ratione deserunt mollitia. Praesentium asperiores similique dolore, quos debitis minima quam obcaecati sit doloribus natus iste. Repellat dolorem adipisci incidunt alias quisquam impedit atque nobis dicta, quae unde autem doloremque fuga aperiam maiores quos corrupti porro dolore ipsam voluptas repudiandae repellendus. Quas blanditiis aliquam quasi explicabo reiciendis quibusdam id, dicta repudiandae quia, et dolorum odit rem debitis ad iste unde impedit eaque! Facere, optio. Ut facere itaque laudantium perspiciatis consequuntur ea molestiae quaerat! Quasi, sed.
             Nemo id perferendis odit, nostrum consectetur ab labore itaque eius consequatur, 
             quibusdam fugit, corrupti dolorum veniam magni sapiente perspiciatis repudiandae commodi 
             quo ut pariatur obcaecati dolores inventore. Quam, reprehenderit maxime unde perferendis 
             beatae facere non aliquam earum recusandae ipsa. In sequi eligendi, reprehenderit, ab quas magni optio asperiores natus soluta mollitia facere perferendis fugiat? Sunt, adipisci rem labore possimus laboriosam autem provident neque unde.
          </p>
        </div>

        <div className="md:w-[30%] w-[100%] mb-[30px] flex justify-center md:justify-end">
          <Image
            src="/person.png"
            alt="author"
            width={300}
            height={400}
            className="w-full max-w-[400px] h-auto rounded-[30px] object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
