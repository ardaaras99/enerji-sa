'use client';

import { SolarPanelType } from '@/data/solarPanelTypes';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface SolarPanelCarouselProps {
    panels: SolarPanelType[];
    activeIndex: number;
    onSelectPanel: (index: number) => void;
}

const SolarPanelCarousel: React.FC<SolarPanelCarouselProps> = ({
    panels,
    activeIndex,
    onSelectPanel
}) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
    const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-scroll through panels
    useEffect(() => {
        if (!autoScrollEnabled) return;

        const startAutoScroll = () => {
            autoScrollTimeoutRef.current = setTimeout(() => {
                const nextIndex = (activeIndex + 1) % panels.length;
                onSelectPanel(nextIndex);
            }, 4000); // Change every 4 seconds
        };

        startAutoScroll();

        return () => {
            if (autoScrollTimeoutRef.current) {
                clearTimeout(autoScrollTimeoutRef.current);
            }
        };
    }, [activeIndex, autoScrollEnabled, panels.length, onSelectPanel]);

    // Disable auto-scroll when user interacts
    const disableAutoScroll = () => {
        setAutoScrollEnabled(false);
        if (autoScrollTimeoutRef.current) {
            clearTimeout(autoScrollTimeoutRef.current);
        }

        // Re-enable after 10 seconds of no interaction
        setTimeout(() => {
            setAutoScrollEnabled(true);
        }, 10000);
    };

    // Auto-scroll to center active card
    useEffect(() => {
        if (carouselRef.current && trackRef.current) {
            const carousel = carouselRef.current;
            const cardWidth = 288; // w-72 = 288px
            const gap = 16; // gap-4 = 16px
            const totalCardWidth = cardWidth + gap;
            const carouselWidth = carousel.offsetWidth;
            const centerOffset = carouselWidth / 2 - cardWidth / 2;

            // Calculate the position to center the active card
            const targetPosition = activeIndex * totalCardWidth - centerOffset;

            // Clamp the position to prevent over-scrolling
            const maxScroll = (panels.length * totalCardWidth) - carouselWidth + 32; // 32px for padding
            const clampedPosition = Math.max(0, Math.min(targetPosition, maxScroll));

            gsap.to(trackRef.current, {
                x: -clampedPosition,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    }, [activeIndex, panels.length]);

    // Handle mouse events for desktop dragging
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!trackRef.current) return;
        disableAutoScroll();
        setIsDragging(true);
        setStartX(e.pageX);
        setScrollLeft(trackRef.current.offsetLeft);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !trackRef.current) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX) * 2;
        gsap.set(trackRef.current, { x: scrollLeft + walk });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        // Snap to nearest card
        snapToNearestCard();
    };

    // Handle touch events for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!trackRef.current) return;
        disableAutoScroll();
        setIsDragging(true);
        setStartX(e.touches[0].pageX);
        setScrollLeft(trackRef.current.offsetLeft);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !trackRef.current) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 1.5;
        gsap.set(trackRef.current, { x: scrollLeft + walk });
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        snapToNearestCard();
    };

    const snapToNearestCard = () => {
        if (!trackRef.current || !carouselRef.current) return;

        const currentX = gsap.getProperty(trackRef.current, 'x') as number;
        const cardWidth = 288;
        const gap = 16;
        const totalCardWidth = cardWidth + gap;
        const carouselWidth = carouselRef.current.offsetWidth;
        const centerOffset = carouselWidth / 2 - cardWidth / 2;

        // Calculate which card should be centered
        const targetIndex = Math.round((Math.abs(currentX) + centerOffset) / totalCardWidth);
        const clampedIndex = Math.max(0, Math.min(targetIndex, panels.length - 1));

        if (clampedIndex !== activeIndex) {
            onSelectPanel(clampedIndex);
        }
    };

    const goToPrevious = () => {
        disableAutoScroll();
        const newIndex = activeIndex > 0 ? activeIndex - 1 : panels.length - 1;
        onSelectPanel(newIndex);
    };

    const goToNext = () => {
        disableAutoScroll();
        const newIndex = activeIndex < panels.length - 1 ? activeIndex + 1 : 0;
        onSelectPanel(newIndex);
    };

    return (
        <div className="relative">
            {/* Navigation Arrows - Desktop */}
            <div className="hidden md:block">
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Cards Track */}
                <div
                    ref={trackRef}
                    className="flex gap-4 py-12 px-8"
                    style={{ width: `${panels.length * 304}px` }} // Card width (288) + gap (16)
                >
                    {panels.map((panel, index) => (
                        <div
                            key={panel.id}
                            onClick={() => {
                                disableAutoScroll();
                                onSelectPanel(index);
                            }}
                            className={`flex-shrink-0 w-72 bg-white rounded-2xl border-2 transition-all duration-500 cursor-pointer overflow-hidden transform ${index === activeIndex
                                ? `border-transparent shadow-2xl scale-110 bg-gradient-to-br ${panel.gradient} z-10 relative carousel-active`
                                : 'border-gray-200 shadow-lg hover:shadow-xl hover:scale-102 scale-95'
                                }`}
                        >
                            {/* Card Header */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={panel.image}
                                    alt={panel.title}
                                    fill
                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                />
                                <div className={`absolute inset-0 ${index === activeIndex
                                    ? 'bg-black/20'
                                    : 'bg-gradient-to-t from-black/30 to-transparent'
                                    }`}></div>

                                {/* Active Badge */}
                                {index === activeIndex && (
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-gray-800 shadow-lg border-2 border-white">
                                        ✓ Seçili
                                    </div>
                                )}

                                {/* Active Glow Effect */}
                                {index === activeIndex && (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} opacity-10 rounded-2xl`}></div>
                                )}
                            </div>

                            {/* Card Content */}
                            <div className={`p-6 ${index === activeIndex ? 'text-white' : 'text-gray-800'}`}>
                                <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${index === activeIndex ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {panel.title}
                                </h3>

                                <p className={`text-sm leading-relaxed line-clamp-3 ${index === activeIndex ? 'text-white/90' : 'text-gray-600'
                                    }`}>
                                    {panel.description}
                                </p>

                                {/* Advantages Preview */}
                                <div className="mt-4 space-y-2">
                                    {panel.advantages.slice(0, 2).map((advantage, idx) => (
                                        <div key={idx} className="flex items-start space-x-2">
                                            <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${index === activeIndex ? 'bg-white' : 'bg-blue-500'
                                                }`}></div>
                                            <span className={`text-xs leading-relaxed line-clamp-2 ${index === activeIndex ? 'text-white/80' : 'text-gray-500'
                                                }`}>
                                                {advantage.split(':')[0]}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Select Button */}
                                <div className="mt-4 pt-4 border-t border-current/20">
                                    <span className={`text-xs font-medium ${index === activeIndex ? 'text-white' : 'text-gray-500'
                                        }`}>
                                        {index === activeIndex ? 'Detayları aşağıda görüntüleyebilirsiniz' : 'Detayları görmek için seçin'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
                {panels.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            disableAutoScroll();
                            onSelectPanel(index);
                        }}
                        className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                            ? 'bg-blue-600 scale-125'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                    >
                        {/* Auto-scroll progress indicator */}
                        {index === activeIndex && autoScrollEnabled && (
                            <div className="absolute inset-0 rounded-full border-2 border-blue-600">
                                <div className="w-full h-full rounded-full bg-blue-200 animate-pulse"></div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Auto-scroll status */}
            <div className="text-center mt-4">
                <div className={`inline-flex items-center space-x-2 text-xs transition-opacity duration-300 ${autoScrollEnabled ? 'text-blue-600 opacity-100' : 'text-gray-400 opacity-60'
                    }`}>
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${autoScrollEnabled ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                    <span>{autoScrollEnabled ? 'Otomatik geçiş aktif' : 'Manuel kontrol'}</span>
                </div>
            </div>
        </div>
    );
};

export default SolarPanelCarousel;
