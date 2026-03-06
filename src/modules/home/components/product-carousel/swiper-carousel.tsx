"use client"

import { useRef, ReactNode } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import "swiper/css"

type SwiperCarouselProps = {
  children: ReactNode[]
  breakpoints?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
  showDots?: boolean
  infiniteScroll?: boolean
  variant?: "products" | "categories"
}

export default function SwiperCarousel({
  children,
  breakpoints = { mobile: 2, tablet: 3, desktop: 6 },
  gap = 12,
  showDots = false,
  infiniteScroll = true,
  variant = "categories",
}: SwiperCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  const mobile = breakpoints.mobile ?? 2
  const tablet = breakpoints.tablet ?? 3
  const desktop = breakpoints.desktop ?? 6

  const swiperBreakpoints = {
    0: { slidesPerView: mobile, spaceBetween: gap },
    640: { slidesPerView: tablet, spaceBetween: gap },
    1024: { slidesPerView: desktop, spaceBetween: gap },
  }

  const showNav = children.length > 1
  const useLoop = false

  const handlePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  const wrapperClass = "max-w-[1440px] w-full mx-auto px-6"

  return (
    <div className={wrapperClass} role="region" aria-label="Product carousel" data-swiper-variant={variant}>
      <div className="relative product-swiper-container">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[]}
        spaceBetween={gap}
        slidesPerView={mobile}
        slidesPerGroup={1}
        speed={300}
        loop={useLoop}
        breakpoints={swiperBreakpoints}
        className="product-swiper"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {showNav && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="product-swiper-nav-btn product-swiper-nav-prev"
            aria-label="Produse anterioare"
            style={variant === "products" ? { left: "-5.5rem", marginLeft: 0 } : undefined}
          >
            <ChevronLeft className="product-swiper-nav-icon" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="product-swiper-nav-btn product-swiper-nav-next"
            aria-label="Produse următoare"
            style={variant === "products" ? { right: "-5.5rem", marginRight: 0, left: "auto" } : undefined}
          >
            <ChevronRight className="product-swiper-nav-icon" />
          </button>
        </>
      )}
      </div>
    </div>
  )
}
