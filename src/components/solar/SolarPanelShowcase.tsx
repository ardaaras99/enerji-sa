'use client';

import { solarPanelTypes } from '@/data/solarPanelTypes';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import SolarPanelDetail from './SolarPanelDetail';
import SolarPanelSlider from './SolarPanelSlider';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SolarPanelShowcase: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDetail, setShowDetail] = useState(false);
    const [isChangingPanel, setIsChangingPanel] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Slider animation
            gsap.fromTo(sliderRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: sliderRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSelectPanel = (index: number, shouldScroll: boolean = false) => {
        if (index === activeIndex) return; // Don't do anything if same panel is selected

        setIsChangingPanel(true);

        // Clear any existing scroll timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Add a slight delay for smooth transition
        setTimeout(() => {
            setActiveIndex(index);
            setShowDetail(true);
            setIsChangingPanel(false);
        }, 150);
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    const activePanel = solarPanelTypes[activeIndex];

    return (
        <div ref={sectionRef} className="relative">
            {/* Hero Section with Carousel */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div ref={headerRef} className="text-center mb-16">
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-200/50 rounded-full mb-8">
                            <Zap className="w-5 h-5 text-blue-600 mr-2" />
                            <span className="text-blue-700 font-semibold">Güneş Paneli Çeşitleri</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                Güneş Paneli
                            </span>
                            <span className="block text-gray-800 text-3xl lg:text-4xl mt-2">
                                Teknolojileri
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                            Her ihtiyaca uygun, son teknoloji güneş paneli çeşitlerimizi keşfedin.
                            <span className="block mt-2 text-gray-900 font-semibold">
                                Görsellerden detayları incelemek için buton kullanın veya ok tuşları ile gezinin.
                            </span>
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span>6 Farklı Panel Türü</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span>Premium Kalite</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span>25 Yıl Garanti</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span>Profesyonel Kurulum</span>
                            </div>
                        </div>
                    </div>

                    {/* Slider Section */}
                    <div ref={sliderRef}>
                        <SolarPanelSlider
                            panels={solarPanelTypes}
                            activeIndex={activeIndex}
                            onSelectPanel={(index) => handleSelectPanel(index)}
                        />
                    </div>

                </div>
            </section>

            {/* Detail Section */}
            {showDetail && (
                <div id="panel-detail-section" className="relative">
                    {isChangingPanel && (
                        <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                                <p className="text-gray-600 text-sm">Panel değiştiriliyor...</p>
                            </div>
                        </div>
                    )}
                    <SolarPanelDetail
                        panel={activePanel}
                        isVisible={showDetail && !isChangingPanel}
                    />
                </div>
            )}

            {/* Additional Info Section */}
            <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                        Neden Tekin Power Güneş Panelleri?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4">
                                <Zap className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Yüksek Verimlilik</h3>
                            <p className="text-gray-300 leading-relaxed">
                                En son teknoloji ile üretilmiş panellerimiz maksimum enerji verimliliği sağlar.
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                                <Zap className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Uzun Ömür</h3>
                            <p className="text-gray-300 leading-relaxed">
                                25 yıl garanti ile desteklenen dayanıklı yapı ve güvenilir performans.
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-4">
                                <Zap className="w-full h-full text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Profesyonel Destek</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Uzman ekibimiz kurulumdan bakıma kadar tüm süreçte yanınızda.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolarPanelShowcase;
