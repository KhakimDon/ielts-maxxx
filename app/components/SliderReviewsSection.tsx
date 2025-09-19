"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Анна Петрова",
    date: "15 января 2025",
    title: "Невероятно полезная книга!",
    text: "Эта книга полностью изменила мой подход к подготовке к IELTS. За 2 месяца занятий по методике из книги я поднял свой балл с 6.0 до 8.0! Особенно помогли практические задания и советы по тайм-менеджменту.",
    avatar: "/avatar.svg",
  },
  {
    id: 2,
    name: "Михаил Козлов",
    date: "8 января 2025",
    title: "Лучшая инвестиция в образование",
    text: "Покупал книгу для подготовки к IELTS Academic. Результат превзошел все ожидания - получил 8.5 баллов! Структура материала очень логичная, все объяснения понятные. Рекомендую всем, кто серьезно настроен на высокий балл.",
    avatar: "/avatar.svg",
  },
  {
    id: 3,
    name: "Елена Смирнова",
    date: "2 января 2025",
    title: "Спасибо за отличную подготовку!",
    text: "Занималась по этой книге 3 месяца перед экзаменом. Особенно понравились разделы по Writing и Speaking - много полезных фраз и шаблонов. В итоге получила 7.5 баллов, хотя изначально рассчитывала максимум на 6.5.",
    avatar: "/avatar.svg",
  },
  {
    id: 4,
    name: "Дмитрий Волков",
    date: "25 декабря 2024",
    title: "Методика работает на 100%",
    text: "Изучал английский самостоятельно, но для IELTS нужна была структурированная подготовка. Эта книга дала мне все необходимое - от базовых правил до продвинутых техник. Результат: 8.0 баллов с первого раза!",
    avatar: "/avatar.svg",
  },
  {
    id: 5,
    name: "Ольга Новикова",
    date: "18 декабря 2024",
    title: "Потрясающий результат!",
    text: "Готовилась к IELTS General Training. Книга помогла систематизировать знания и выявить слабые места. Практические упражнения очень эффективные. Получила 7.0 баллов, что было моей целью. Очень довольна покупкой!",
    avatar: "/avatar.svg",
  },
  {
    id: 6,
    name: "Александр Морозов",
    date: "12 декабря 2024",
    title: "Настоятельно рекомендую!",
    text: "Работаю в IT и нужен был IELTS для иммиграции. Времени на подготовку было мало, но благодаря четкой структуре книги и практическим советам успешно сдал экзамен с результатом 8.5. Книга стоит своих денег!",
    avatar: "/avatar.svg",
  },
  {
    id: 7,
    name: "Татьяна Лебедева",
    date: "5 декабря 2024",
    title: "Отличное качество материала",
    text: "Преподаю английский, но для сдачи IELTS нужна была специальная подготовка. Книга дала мне все необходимые знания и техники. Особенно ценны разделы по Reading и Listening. Получила 9.0 баллов!",
    avatar: "/avatar.svg",
  },
  {
    id: 8,
    name: "Игорь Соколов",
    date: "28 ноября 2024",
    title: "Лучшая книга для IELTS!",
    text: "Готовился к экзамену 4 месяца по этой книге. Материал изложен очень доступно, много примеров и практических заданий. Результат: 7.5 баллов, что позволило поступить в желаемый университет. Спасибо автору!",
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
                <div className="w-10 h-10 bg-[#fca311] rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="w-6 h-6 text-black"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" 
                    />
                  </svg>
                </div>
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
