"use client"

import { useRef, ReactNode } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { Pagination } from "swiper/modules"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"
import "swiper/css"
import "swiper/css/pagination"

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
}

export default function SwiperCarousel({
  children,
  breakpoints = { mobile: 2, tablet: 3, desktop: 5 },
  gap = 16,
  showDots = true,
  infiniteScroll = true,
}: SwiperCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null)

  const mobile = breakpoints.mobile ?? 2
  const tablet = breakpoints.tablet ?? 3
  const desktop = breakpoints.desktop ?? 5

  const swiperBreakpoints = {
    0: { slidesPerView: mobile, spaceBetween: gap },
    640: { slidesPerView: tablet, spaceBetween: gap },
    1024: { slidesPerView: desktop, spaceBetween: gap },
  }

  const showNav = children.length > 1
  const showPagination = showDots && children.length > 1
  const useLoop = false

  const handlePrev = () => {
    swiperRef.current?.slidePrev()
  }

  const handleNext = () => {
    swiperRef.current?.slideNext()
  }

  return (
    <div className="relative product-swiper-container" role="region" aria-label="Product carousel">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        modules={[Pagination]}
        spaceBetween={gap}
        slidesPerView={mobile}
        slidesPerGroup={1}
        speed={300}
        loop={useLoop}
        breakpoints={swiperBreakpoints}
        pagination={showPagination ? { clickable: true } : false}
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
            className="carousel-nav-btn left-0 -ml-4 z-30 focus:outline-none focus:ring-2 focus:ring-space_indigo"
            aria-label="Produse anterioare"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 shrink-0 block" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="carousel-nav-btn right-0 -mr-4 z-30 focus:outline-none focus:ring-2 focus:ring-space_indigo"
            aria-label="Produse următoare"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 shrink-0 block" />
          </button>
        </>
      )}
    </div>
  )
}
