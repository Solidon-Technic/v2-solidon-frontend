"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "@medusajs/icons";
import { clx } from "@medusajs/ui";

type ResponsiveCarouselProps = {
    children: ReactNode[];
    breakpoints?: {
        mobile?: number;
        tablet?: number;
        desktop?: number;
    };
    gap?: number;
    showDots?: boolean;
    autoLoop?: boolean;
    infiniteScroll?: boolean;
};

export default function ResponsiveCarousel({
    children,
    breakpoints = { mobile: 2, tablet: 3, desktop: 5 },
    gap = 16,
    showDots = true,
    autoLoop = true,
    infiniteScroll = true,
}: ResponsiveCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(breakpoints.desktop || 5);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setItemsPerView(breakpoints.mobile || 2);
            } else if (width < 1024) {
                setItemsPerView(breakpoints.tablet || 3);
            } else {
                setItemsPerView(breakpoints.desktop || 5);
            }
        };

        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, [breakpoints]);

    // Handle cases where we have fewer items than slots
    let items: ReactNode[];
    let totalItems: number;
    let startIndex: number;

    if (children.length < itemsPerView) {
        // If fewer items than slots, duplicate to fill all slots
        const duplicatedItems = [];
        const timesToRepeat = Math.ceil(itemsPerView / children.length);

        for (let i = 0; i < timesToRepeat; i++) {
            duplicatedItems.push(...children);
        }

        if (infiniteScroll) {
            // For infinite scroll with few items, create enough copies
            items = [...duplicatedItems, ...duplicatedItems, ...duplicatedItems];
            totalItems = children.length;
            startIndex = duplicatedItems.length;
        } else {
            items = duplicatedItems;
            totalItems = duplicatedItems.length;
            startIndex = 0;
        }
    } else {
        // Normal case: enough items to fill slots
        if (infiniteScroll) {
            items = [...children, ...children, ...children];
            totalItems = children.length;
            startIndex = children.length;
        } else {
            items = children;
            totalItems = children.length;
            startIndex = 0;
        }
    }

    // Initialize at the start of the middle set for infinite scroll
    useEffect(() => {
        if (infiniteScroll) {
            setCurrentIndex(startIndex);
        }
    }, [infiniteScroll, startIndex]);

    const handlePrev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    const handleNext = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    // Handle infinite scroll wrapping
    useEffect(() => {
        if (!infiniteScroll) return;

        const timer = setTimeout(() => {
            if (currentIndex >= startIndex + totalItems) {
                setIsTransitioning(false);
                setTimeout(() => {
                    setCurrentIndex(startIndex);
                    setTimeout(() => setIsTransitioning(true), 50);
                }, 50);
            } else if (currentIndex < startIndex) {
                setIsTransitioning(false);
                setTimeout(() => {
                    setCurrentIndex(startIndex + totalItems - 1);
                    setTimeout(() => setIsTransitioning(true), 50);
                }, 50);
            }
        }, 300); // Wait for transition to complete

        return () => clearTimeout(timer);
    }, [currentIndex, infiniteScroll, startIndex, totalItems]);

    const goToSlide = (index: number) => {
        setIsTransitioning(true);
        setCurrentIndex(startIndex + index);
    };

    // Calculate transform
    const itemWidth = containerRef.current
        ? (containerRef.current.offsetWidth - gap * (itemsPerView - 1)) /
        itemsPerView
        : 0;
    const transform = -(currentIndex * (itemWidth + gap));

    const displayIndex = infiniteScroll
        ? ((currentIndex - startIndex + totalItems) % totalItems)
        : currentIndex;

    return (
        <div
            className="relative"
            role="region"
            aria-label="Product carousel"
            aria-live="polite"
        >
            {/* Navigation Buttons - Always visible when infinite scroll or multiple unique items */}
            {(infiniteScroll && children.length > 1) && (
                <>
                    <button
                        onClick={handlePrev}
                        className="carousel-nav-btn left-0 -ml-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-space_indigo"
                        aria-label="Previous products"
                        type="button"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="carousel-nav-btn right-0 -mr-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-space_indigo"
                        aria-label="Next products"
                        type="button"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden" ref={containerRef}>
                <div
                    className={clx("flex", {
                        "transition-transform duration-300 ease-out":
                            isTransitioning,
                    })}
                    style={{
                        transform: `translateX(${transform}px)`,
                        gap: `${gap}px`,
                    }}
                    role="list"
                >
                    {items.map((child, index) => (
                        <div
                            key={`item-${index}`}
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

            {/* Dots Navigation - Only show if we have multiple unique items */}
            {showDots && children.length > 1 && infiniteScroll && (
                <div className="carousel-dots" role="tablist">
                    {Array.from({ length: totalItems }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={clx("carousel-dot", {
                                "carousel-dot-active": index === displayIndex,
                            })}
                            role="tab"
                            aria-selected={index === displayIndex}
                            aria-label={`Go to slide ${index + 1}`}
                            type="button"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

