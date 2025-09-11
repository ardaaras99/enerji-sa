'use client';

import { SolarPanelType } from '@/data/solarPanelTypes';
import { gsap } from 'gsap';
import { ArrowDown, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface SolarPanelSliderProps {
    panels: SolarPanelType[];
    activeIndex: number;
    onSelectPanel: (index: number) => void;
}

const SolarPanelSlider: React.FC<SolarPanelSliderProps> = ({
    panels,
    activeIndex,
    onSelectPanel
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const startAutoPlay = () => {
            autoPlayTimeoutRef.current = setTimeout(() => {
                if (!isTransitioning) {
                    const nextIndex = (activeIndex + 1) % panels.length;
                    handleSlideChange(nextIndex);
                }
            }, 5000); // Change every 5 seconds
        };

        startAutoPlay();

        return () => {
            if (autoPlayTimeoutRef.current) {
                clearTimeout(autoPlayTimeoutRef.current);
            }
        };
    }, [activeIndex, isAutoPlaying, isTransitioning, panels.length]);

    const handleSlideChange = (newIndex: number) => {
        if (newIndex === activeIndex || isTransitioning) return;

        setIsTransitioning(true);

        // Animate slide transition
        if (imageRef.current) {
            gsap.fromTo(imageRef.current,
                { opacity: 1, scale: 1 },
                {
                    opacity: 0,
                    scale: 1.1,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        onSelectPanel(newIndex);
                        gsap.fromTo(imageRef.current,
                            { opacity: 0, scale: 0.9 },
                            {
                                opacity: 1,
                                scale: 1,
                                duration: 0.4,
                                ease: 'power2.out',
                                onComplete: () => setIsTransitioning(false)
                            }
                        );
                    }
                }
            );
        }
    };

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        const newIndex = activeIndex === 0 ? panels.length - 1 : activeIndex - 1;
        handleSlideChange(newIndex);

        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        const newIndex = (activeIndex + 1) % panels.length;
        handleSlideChange(newIndex);

        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const handleViewDetails = () => {
        const detailSection = document.getElementById('panel-detail-section');
        if (detailSection) {
            const elementTop = detailSection.getBoundingClientRect().top;
            const offsetPosition = elementTop + window.pageYOffset - 100;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const currentPanel = panels[activeIndex];

    return (
        <div ref={sliderRef} className="relative w-full">
            {/* Main Slider Container */}
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Background Image */}
                <div ref={imageRef} className="absolute inset-0">
                    <Image
                        src={currentPanel.image}
                        alt={currentPanel.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    disabled={isTransitioning}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-7 h-7" />
                </button>

                <button
                    onClick={goToNext}
                    disabled={isTransitioning}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="w-7 h-7" />
                </button>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8 z-10">
                    {/* Top Section - Panel Info */}
                    <div className="flex justify-between items-start">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${currentPanel.gradient} mb-3`}>
                                <span className="text-white font-semibold text-sm">
                                    {activeIndex + 1} / {panels.length}
                                </span>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                {currentPanel.title}
                            </h2>
                            <p className="text-white/90 text-sm lg:text-base leading-relaxed max-w-md">
                                {currentPanel.description.slice(0, 150)}...
                            </p>
                        </div>

                        {/* Auto-play Control */}
                        <button
                            onClick={toggleAutoPlay}
                            className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                        >
                            {isAutoPlaying ? (
                                <Pause className="w-5 h-5" />
                            ) : (
                                <Play className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Bottom Section - CTA Button */}
                    <div className="flex items-end justify-between">
                        <button
                            onClick={handleViewDetails}
                            className={`bg-gradient-to-r ${currentPanel.gradient} text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2`}
                        >
                            <span>Detayları İncele</span>
                            <ArrowDown className="w-5 h-5" />
                        </button>

                        {/* Progress Indicators */}
                        <div className="flex space-x-2">
                            {panels.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        handleSlideChange(index);
                                        setTimeout(() => setIsAutoPlaying(true), 10000);
                                    }}
                                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? 'bg-white scale-125'
                                            : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                >
                                    {/* Auto-play progress ring for active indicator */}
                                    {index === activeIndex && isAutoPlaying && (
                                        <div className="absolute inset-0 rounded-full">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="rgba(255,255,255,0.3)"
                                                    strokeWidth="2"
                                                    fill="none"
                                                />
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    fill="none"
                                                    strokeDasharray="63"
                                                    strokeDashoffset="63"
                                                    className="animate-progress-ring"
                                                    style={{
                                                        animation: 'progress-ring 5s linear infinite'
                                                    }}
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loading Overlay */}
                {isTransitioning && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-30">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-gray-700 font-medium">Yükleniyor...</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Slider Info Bar */}
            <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-4 shadow-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentPanel.gradient}`}></div>
                        <span className="text-gray-700 font-medium">{currentPanel.title}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span>{isAutoPlaying ? 'Otomatik' : 'Manuel'}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                            <span>{activeIndex + 1}</span>
                            <span>/</span>
                            <span>{panels.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarPanelSlider;
