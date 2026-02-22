"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@medusajs/icons";
import { clx } from "@medusajs/ui";

type ProductCarouselProps = {
    children: ReactNode[];
    itemsPerView?: number;
    gap?: number;
    showDots?: boolean;
    autoLoop?: boolean;
};

export default function ProductCarousel({
    children,
    itemsPerView = 5,
    gap = 16,
    showDots = true,
    autoLoop = true,
}: ProductCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // If we have fewer items than itemsPerView and autoLoop is true, duplicate items
    const items =
        children.length < itemsPerView && autoLoop
            ? Array.from(
                  { length: Math.ceil(itemsPerView / children.length) },
                  () => children
              ).flat()
            : children;

    const totalItems = items.length;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [currentIndex, maxIndex]);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    // Calculate transform
    const itemWidth = containerRef.current
        ? (containerRef.current.offsetWidth - gap * (itemsPerView - 1)) /
          itemsPerView
        : 0;
    const transform = -(currentIndex * (itemWidth + gap));

    return (
        <div
            className="relative"
            role="region"
            aria-label="Product carousel"
            aria-live="polite"
        >
            {/* Navigation Buttons */}
            {totalItems > itemsPerView && (
                <>
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="carousel-nav-btn left-0 -ml-4 focus:outline-none focus:ring-2 focus:ring-space_indigo"
                        aria-label="Previous products"
                        type="button"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700 shrink-0 block" />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className="carousel-nav-btn right-0 -mr-4 focus:outline-none focus:ring-2 focus:ring-space_indigo"
                        aria-label="Next products"
                        type="button"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700 shrink-0 block" />
                    </button>
                </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden" ref={containerRef}>
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(${transform}px)`,
                        gap: `${gap}px`,
                    }}
                    role="list"
                >
                    {items.map((child, index) => (
                        <div
                            key={index}
                            role="listitem"
                            style={{
                                flex: `0 0 ${100 / itemsPerView}%`,
                                maxWidth: `calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`,
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation */}
            {showDots && totalItems > itemsPerView && (
                <div className="carousel-dots" role="tablist">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={clx("carousel-dot", {
                                "carousel-dot-active": index === currentIndex,
                            })}
                            role="tab"
                            aria-selected={index === currentIndex}
                            aria-label={`Go to slide ${index + 1}`}
                            type="button"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

