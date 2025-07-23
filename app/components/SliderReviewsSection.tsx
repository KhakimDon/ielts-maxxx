"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Jake Will.",
    date: "04 June 2023",
    title:
      "5 Exercises Basketball Players Should Be Using To Develop Strength",
    text: "This article was written by Jake Willhoite from Healthlisted.com. Strength in basketball isn’t all about a massive body mass or ripped muscles.",
    avatar: "/avatar.svg",
  },
  {
    id: 2,
    name: "Jake Will.",
    date: "04 June 2023",
    title:
      "5 Exercises Basketball Players Should Be Using To Develop Strength",
    text: "This article was written by Jake Willhoite from Healthlisted.com. Strength in basketball isn’t all about a massive body mass or ripped muscles.",
    avatar: "/avatar.svg",
  },
  {
    id: 3,
    name: "Jake Will.",
    date: "04 June 2023",
    title:
      "5 Exercises Basketball Players Should Be Using To Develop Strength",
    text: "This article was written by Jake Willhoite from Healthlisted.com. Strength in basketball isn’t all about a massive body mass or ripped muscles.",
    avatar: "/avatar.svg",
  },
  {
    id: 4,
    name: "Jake Will.",
    date: "04 June 2023",
    title:
      "5 Exercises Basketball Players Should Be Using To Develop Strength",
    text: "This article was written by Jake Willhoite from Healthlisted.com. Strength in basketball isn’t all about a massive body mass or ripped muscles.",
    avatar: "/avatar.svg",
  },
  {
    id: 5,
    name: "Jake Will.",
    date: "04 June 2023",
    title:
      "5 Exercises Basketball Players Should Be Using To Develop Strength",
    text: "This article was written by Jake Willhoite from Healthlisted.com. Strength in basketball isn’t all about a massive body mass or ripped muscles.",
    avatar: "/avatar.svg",
  },
];

export default function ReviewsSlider() {
  return (
    <section className="relative bg-black text-white py-16 px-4 sm:px-10 font-atyp overflow-hidden">
      <h2 className="text-center text-[#fca311] text-3xl sm:text-4xl font-extrabold uppercase mb-12">
        Читатели этой книги
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full overflow-visible"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="border border-[#fca311] rounded-md p-6 bg-black">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={review.avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
                <p className="text-[#fca311] !font-[var(--font-atyp)] !font-semibold text-l">
                  {review.name}
                </p>
              </div>
              <p className="text-sm text-neutral-400 mb-2">{review.date}</p>
              <h3 className="font-[var(--font-atyp)] !font-normal mt-5 text-[20px] tracking-wide mb-2 text-white text-base leading-snug">
                {review.title}
              </h3>
              <p className="text-sm mt-5 text-white text-opacity-90 leading-snug">
                {review.text}
              </p>
            </div>
          </SwiperSlide>
        ))}

        {/* Кнопки */}
        <div className="flex gap-4 lg:justify-start justify-center mt-6">
          <button className="swiper-button-prev-custom w-17 h-11 rounded-md bg-transparent border border-[#fca311] text-white hover:bg-[#fca311] transition">
            <ArrowLeft size={20} className="mx-auto" />
          </button>
          <button className="swiper-button-next-custom w-17 h-11 rounded-md bg-[#fca311] text-black hover:bg-[#e6950e] transition">
            <ArrowRight size={20} className="mx-auto" />
          </button>
        </div>
      </Swiper>
    </section>
  );
}
