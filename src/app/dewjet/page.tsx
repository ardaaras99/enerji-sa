'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Anchor, Battery, Zap, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DewJetPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const photos = [
    {
      src: '/dewjet/collab.jpeg',
      title: 'Tekin Power & DewJet İşbirliği',
      description: 'Denizcilik sektöründe yenilikçi enerji çözümleri'
    },
    {
      src: '/dewjet/gemi1.jpeg',
      title: 'Elektrikli Tahrik Sistemleri',
      description: 'Çevre dostu denizcilik geleceği'
    },
    {
      src: '/dewjet/gemi2.jpeg',
      title: 'Sürdürülebilir Teknoloji',
      description: 'Mavi sularda temiz enerji'
    },
    {
      src: '/dewjet/gemi3.jpeg',
      title: 'Yenilikçi Çözümler',
      description: 'Sessiz ve güçlü performans'
    },
    {
      src: '/dewjet/gemi4.jpeg',
      title: 'Denizcilik Devrimi',
      description: 'Sıfır emisyon hedefi'
    },
    {
      src: '/dewjet/gemi5.jpeg',
      title: 'Geleceğin Denizcilik Teknolojisi',
      description: 'Güvenilir ve verimli enerji'
    }
  ];

  // Auto swiper effect
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [photos.length, isAutoPlaying]);

  // Clear auto-play temporarily when manual navigation
  const handleManualNavigation = (newSlide: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(newSlide);

    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  // Scroll animations
  useEffect(() => {
    const sections = sectionsRef.current?.children;
    if (sections) {
      gsap.fromTo(Array.from(sections),
        {
          opacity: 0,
          y: 80,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }
  }, []);

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % photos.length;
    handleManualNavigation(newSlide);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + photos.length) % photos.length;
    handleManualNavigation(newSlide);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Photo Swiper Section */}
      <section className="relative h-[70vh] sm:h-[80vh] lg:h-screen overflow-hidden">
        {/* Swiper Container */}
        <div className="relative w-full h-full">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              {/* Background Image */}
              <Image
                src={photo.src}
                alt={photo.title}
                className="object-cover"
                fill
                priority={index === 0}
                sizes="100vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-transparent to-cyan-900/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-3 sm:px-4 z-20">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 drop-shadow-lg">
                  {photo.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light drop-shadow-md max-w-2xl leading-relaxed">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronLeft className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group"
          >
            <ChevronRight className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleManualNavigation(index)}
                className={`w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="bg-gray-50 min-h-screen w-full">
        <div ref={sectionsRef} className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-12 sm:py-16 lg:py-20 space-y-8 sm:space-y-10 lg:space-y-12">

          {/* Partnership Section */}
          <section className="text-center">
            <div className="mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Tekin Power & DewJet İşbirliği
              </h2>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 sm:mb-8"></div>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
                <span className="font-semibold text-gray-900">Tekin Power</span> ve <span className="font-semibold text-gray-900">DewJet</span>
                arasındaki stratejik işbirliği, denizcilik sektöründe çevre dostu ve sürdürülebilir enerji çözümlerinin öncüsü olma hedefiyle bir araya gelmiştir.
              </p>

              <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                DewJet&apos;in yenilikçi dıştan ve içten takmalı elektrikli tahrik sistemleri, Tekin Power&apos;ın LiFePO4 batarya teknolojisi ile
                birleşerek denizcilik dünyasında sıfır emisyon hedefine ulaşmayı amaçlamaktadır.
              </p>
            </div>
          </section>

          {/* DewJet Products Section */}
          <section className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">DewJet Ürün Aileleri</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* DWE OB-80 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DWE OB-80</h4>
                <p className="text-blue-600 font-semibold mb-4">96V 45 kW Nominal Güç</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Dıştan takmalı elektrikli tahrik sistemi. Çevre dostu tasarımı, estetik görünümü ve sessiz çalışma özelliğiyle öne çıkan güçlü performans.
                </p>
              </div>

              {/* DWE OB-30 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Battery className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DWE OB-30</h4>
                <p className="text-green-600 font-semibold mb-4">96V 18 kW Nominal Güç</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Orta ölçekli tekneler için ideal elektrikli tahrik çözümü. Sessiz çalışma ve düşük bakım maliyeti ile kullanıcı dostu tasarım.
                </p>
              </div>

              {/* DWE OB-10 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DWE OB-10</h4>
                <p className="text-cyan-600 font-semibold mb-4">96V 7 kW Nominal Güç</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Küçük tekneler ve botlar için kompakt elektrikli motor. Hafif yapısı ve verimli enerji kullanımı ile ekonomik çözüm.
                </p>
              </div>

              {/* DWE UB-80 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DWE UB-80</h4>
                <p className="text-purple-600 font-semibold mb-4">96V 45 kW Nominal Güç</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Under-board (su altı) montaj seçeneği ile estetik ve aerodinamik tasarım. Güçlü performans ve sessiz çalışma avantajı.
                </p>
              </div>

              {/* DWE IB-30 */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Battery className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DWE IB-30</h4>
                <p className="text-orange-600 font-semibold mb-4">96V 15 kW Nominal Güç</p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  İçten takmalı sistem. Elektronik gaz kolu kontrolü ve şanzımansız tasarımı ile bakım ihtiyacını minimize eder. Yağ kaçağı ve arıza riski yoktur.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Environmental Benefits */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Çevre Dostu</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Sıfır emisyon</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Sessiz çalışma</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Atık yok</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Sürdürülebilir teknoloji</span>
                </div>
              </div>
            </div>

            {/* Technical Benefits */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold">Teknik Üstünlük</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Düşük bakım maliyeti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Uzun ömürlü batarya teknolojisi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Elektronik kontrol sistemi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-lg">Kullanıcı dostu tasarım</span>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Daha Fazla Bilgi İçin</h3>
            <p className="text-lg sm:text-xl mb-8 opacity-95">
              DewJet ürünleri hakkında detaylı bilgi almak için web sitesini ziyaret edebilirsiniz.
            </p>
            <a
              href="https://dewjet.com/tr/urunlerimiz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              DewJet Ürünlerini İncele
            </a>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DewJetPage;
