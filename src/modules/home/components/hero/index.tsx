"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Pagination, Autoplay } from "swiper/modules"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import "swiper/css"
import "swiper/css/pagination"

const slides = [
  {
    badge: "Oferte speciale",
    title: "Cele mai bune prețuri",
    description:
      "Descoperă ofertele noastre exclusive pentru casa ta. Termopane premium la prețuri imbatabile.",
    cta: "Descoperă ofertele",
    href: "/store",
  },
  {
    badge: "Noutăți",
    title: "Produse noi în fiecare săptămână",
    description:
      "Explorează ultimele adăugiri în catalogul nostru. Calitate premium și livrare rapidă.",
    cta: "Vezi noutățile",
    href: "/store?sort=created_at",
  },
  {
    badge: "Magazin",
    title: "Toate produsele la un click",
    description:
      "Navighează prin întreaga noastră gamă de produse. Găsește exact ce cauți.",
    cta: "În magazin",
    href: "/store",
  },
]

const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
)

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
  </svg>
)

const BenefitIcons = {
  truck: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  card: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5h6" />
    </svg>
  ),
  chat: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  ),
}

const benefits = [
  {
    icon: BenefitIcons.truck,
    title: "Livrare rapidă",
    description: (
      <>
        Maxim 48h la orice produs cu <strong>stoc</strong>
      </>
    ),
  },
  {
    icon: BenefitIcons.check,
    title: "Distribuitor Autorizat",
    description: (
      <>
        Comercializăm doar produse <strong>originale</strong>
      </>
    ),
  },
  {
    icon: BenefitIcons.card,
    title: "Plată Flexibilă",
    description: "Ramburs, Plata cu cardul, Transfer bancar sau Plata în rate",
  },
  {
    icon: BenefitIcons.chat,
    title: "Suport Tehnic",
    description: (
      <>
        Scrie-ne pe <strong>Whatsapp</strong> orice neclaritate!
      </>
    ),
  },
]

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className="flex flex-col gap-4 h-full">
    <div className="relative h-[350px] small:h-[400px] rounded-lg overflow-hidden group flex-shrink-0">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="hero-swiper h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
              {/* Decorative circles */}
              <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full" />
              <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 bg-white/5 rounded-full" />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full p-8 small:p-12 max-w-lg">
                <span className="inline-block bg-sales text-white text-xs font-bold px-3 py-1 rounded mb-4 w-fit">
                  {slide.badge}
                </span>
                <h2 className="text-2xl small:text-3xl font-bold text-white mb-2 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-sm small:text-base mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <LocalizedClientLink
                  href={slide.href}
                  className="inline-flex items-center gap-2 bg-accent-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-accent-600 transition-colors duration-200 w-fit text-sm"
                >
                  {slide.cta}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </LocalizedClientLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom arrow buttons */}
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-accent-500 hover:text-accent-600 transition-colors"
        aria-label="Slide anterior"
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center text-accent-500 hover:text-accent-600 transition-colors"
        aria-label="Slide următor"
      >
        <ArrowRight />
      </button>
    </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-lg border border-neutral-200 p-4 small:p-6 flex-1 min-h-0">
        <div className="grid grid-cols-2 small:grid-cols-4 gap-4 small:gap-6">
          {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="text-neutral-800 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-semibold text-green-600">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-800 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
