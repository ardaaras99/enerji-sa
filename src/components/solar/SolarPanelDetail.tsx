'use client';

import { SolarPanelType } from '@/data/solarPanelTypes';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    CheckCircle,
    Mail,
    Phone,
    Shield,
    Star,
    TrendingUp,
    Zap
} from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import AdvantageCard from './AdvantageCard';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SolarPanelDetailProps {
    panel: SolarPanelType;
    isVisible: boolean;
}

const SolarPanelDetail: React.FC<SolarPanelDetailProps> = ({ panel, isVisible }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const advantagesRef = useRef<HTMLDivElement>(null);
    const applicationsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isVisible) return;

        const ctx = gsap.context(() => {
            // Reset all elements first
            gsap.set([titleRef.current, imageRef.current, descriptionRef.current, advantagesRef.current, applicationsRef.current, ctaRef.current], {
                opacity: 0,
                y: 50
            });

            // Create timeline for sequential animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate elements in sequence
            tl.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to(imageRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .to(descriptionRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .to(advantagesRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .to(applicationsRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .to(ctaRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.4');

        }, sectionRef);

        return () => ctx.revert();
    }, [isVisible, panel.id]);

    // Animation for panel changes
    useEffect(() => {
        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
            );
        }
    }, [panel.id]);

    const getIconByName = (iconName: string) => {
        const icons: { [key: string]: React.ComponentType<any> } = {
            CheckCircle,
            Zap,
            Shield,
            Star,
            TrendingUp
        };
        return icons[iconName] || CheckCircle;
    };

    return (
        <section
            ref={sectionRef}
            className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div ref={titleRef} className="text-center mb-12">
                    <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${panel.gradient} rounded-full mb-6`}>
                        <span className="text-white font-semibold text-sm">Ürün Detayı</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {panel.title}
                    </h2>

                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>25 Yıl Garanti</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Premium Kalite</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>Yüksek Verim</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Image */}
                    <div ref={imageRef} className="relative">
                        <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                            <Image
                                src={panel.image}
                                alt={panel.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                            {/* Feature badges */}
                            <div className="absolute top-6 left-6 space-y-3">
                                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                                    <div className="text-sm font-bold text-gray-900">Premium</div>
                                    <div className="text-xs text-gray-600">Kalite</div>
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6">
                                <div className={`bg-gradient-to-r ${panel.gradient} rounded-xl px-4 py-3 shadow-lg`}>
                                    <div className="text-sm font-bold text-white">Yeni Teknoloji</div>
                                    <div className="text-xs text-white/80">Gelişmiş Çözüm</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div ref={descriptionRef} className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${panel.gradient} p-2`}>
                                    <CheckCircle className="w-full h-full text-white" />
                                </div>
                                <span>Nedir?</span>
                            </h3>

                            <p className="text-gray-700 leading-relaxed text-lg">
                                {panel.description}
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${panel.gradient} p-3`}>
                                    <Zap className="w-full h-full text-white" />
                                </div>
                                <div className="text-sm font-bold text-gray-900">Yüksek</div>
                                <div className="text-xs text-gray-600">Verimlilik</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${panel.gradient} p-3`}>
                                    <Shield className="w-full h-full text-white" />
                                </div>
                                <div className="text-sm font-bold text-gray-900">25 Yıl</div>
                                <div className="text-xs text-gray-600">Garanti</div>
                            </div>

                            <div className="text-center p-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
                                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-r ${panel.gradient} p-3`}>
                                    <TrendingUp className="w-full h-full text-white" />
                                </div>
                                <div className="text-sm font-bold text-gray-900">Maksimum</div>
                                <div className="text-xs text-gray-600">Tasarruf</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advantages Section */}
                <div ref={advantagesRef} className="mb-16">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
                        Avantajları Nelerdir?
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {panel.advantages.map((advantage, index) => (
                            <AdvantageCard
                                key={index}
                                advantage={advantage}
                                gradient={panel.gradient}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Applications Section */}
                {panel.applications && panel.applications.length > 0 && (
                    <div ref={applicationsRef} className="mb-16">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
                            Kullanılması Önerilen Uygulamalar
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {panel.applications.map((application, index) => {
                                const [title, description] = application.split(':');
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${panel.gradient} p-3 flex-shrink-0`}>
                                                <CheckCircle className="w-full h-full text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">
                                                    {title}
                                                </h4>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div ref={ctaRef} className="text-center">
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl max-w-4xl mx-auto">
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            Detaylı Bilgi İçin Bize Ulaşın
                        </h3>

                        <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                            {panel.title} hakkında daha fazla bilgi almak ve size özel fiyat teklifi almak için
                            uzman ekibimizle iletişime geçin.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className={`bg-gradient-to-r ${panel.gradient} text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center space-x-2`}>
                                <Phone className="w-5 h-5" />
                                <span>Hemen Ara</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 inline-flex items-center space-x-2">
                                <Mail className="w-5 h-5" />
                                <span>E-posta Gönder</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolarPanelDetail;
