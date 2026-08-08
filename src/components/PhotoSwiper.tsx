'use client';

import { gsap } from 'gsap';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const PhotoSwiper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const dotsRef = useRef<HTMLButtonElement[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const blurredImageRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      id: 1,
      image: '/hizmetlerimiz/marin.jpg',
      title: 'Marin',
      description: 'Denizcilik uygulamaları için dayanıklı ve güvenilir LiFePO4 batarya sistemleri',
      category: 'Denizcilik',
      gradient: 'from-blue-600 via-cyan-500 to-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-900/20 via-cyan-800/20 to-blue-600/20',
      slug: 'marin'
    },
    {
      id: 2,
      image: '/hizmetlerimiz/enerjidepolama.jpg',
      title: 'Enerji Depolama Sistemleri',
      description: 'Enerji depolama sistemleri, güç sistemlerinde enerjiyi depolamaya yarayan sistemlerdir',
      category: 'Enerji Depolama',
      gradient: 'from-indigo-600 via-blue-500 to-teal-400',
      bgColor: 'bg-gradient-to-br from-indigo-900/20 via-blue-800/20 to-teal-600/20',
      slug: 'enerji-depolama'
    },
    {
      id: 3,
      image: '/hizmetlerimiz/telekomunikasyonbazistasyonu.jpg',
      title: 'Telekomünikasyon Baz İstasyonu',
      description: 'Güvenilir iletişim altyapısı için telekomünikasyon baz istasyonlarına yönelik enerji çözümleri',
      category: 'Telekomünikasyon',
      gradient: 'from-blue-600 via-cyan-500 to-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-900/20 via-cyan-800/20 to-blue-600/20',
      slug: 'telekomunikasyon'
    },
    {
      id: 4,
      image: '/hizmetlerimiz/askerisistemuygulamalari.jpg',
      title: 'Askeri Sistem Uygulamaları',
      description: 'Savunma sanayii için özel tasarlanmış güvenilir ve dayanıklı enerji sistemleri',
      category: 'Savunma',
      gradient: 'from-green-600 via-emerald-500 to-teal-400',
      bgColor: 'bg-gradient-to-br from-green-900/20 via-emerald-800/20 to-teal-600/20',
      slug: 'askeri-sistem-uygulamalari'
    },
    {
      id: 5,
      image: '/hizmetlerimiz/carport.jpg',
      title: 'Car Port',
      description: 'Araç park alanları için güneş paneli entegreli çatı sistemleri ve EV şarj istasyonları',
      category: 'Otomotiv',
      gradient: 'from-green-600 via-emerald-500 to-teal-400',
      bgColor: 'bg-gradient-to-br from-green-900/20 via-emerald-800/20 to-teal-600/20',
      slug: 'car-port'
    },
    {
      id: 6,
      image: '/hizmetlerimiz/mobil-solar.jpg',
      title: 'Mobil Solar',
      description: 'Bir noktadan diğerine taşınabilir olan panellere mobil solar şarj panelleri adı verilir',
      category: 'Mobil Solar Panel',
      gradient: 'from-yellow-600 via-orange-500 to-red-400',
      bgColor: 'bg-gradient-to-br from-yellow-900/20 via-orange-800/20 to-red-600/20',
      slug: 'mobil-solar'
    },
    {
      id: 7,
      image: '/hizmetlerimiz/homesolarsystem.jpg',
      title: 'Konut Çözümleri',
      description: 'Evler için özel tasarlanmış güneş paneli sistemleri ve enerji depolama çözümleri',
      category: 'Konut',
      gradient: 'from-amber-600 via-yellow-500 to-lime-400',
      bgColor: 'bg-gradient-to-br from-amber-900/20 via-yellow-800/20 to-lime-600/20',
      slug: 'konut-cozumleri'
    },
    {
      id: 8,
      image: '/hizmetlerimiz/golfcar.jpg',
      title: 'Golf Car',
      description: 'Golf araçları için sessiz ve çevre dostu elektrikli güç sistemleri',
      category: 'Rekreasyon',
      gradient: 'from-lime-600 via-green-500 to-emerald-400',
      bgColor: 'bg-gradient-to-br from-lime-900/20 via-green-800/20 to-emerald-600/20',
      slug: 'golf-araclari'
    },
    {
      id: 9,
      image: '/hizmetlerimiz/drone.jpg',
      title: 'Drone',
      description: 'İnsansız hava araçları için hafif ve yüksek performanslı enerji çözümleri',
      category: 'Havacılık',
      gradient: 'from-purple-600 via-pink-500 to-red-400',
      bgColor: 'bg-gradient-to-br from-purple-900/20 via-pink-800/20 to-red-600/20',
      slug: 'drone'
    },
    {
      id: 10,
      image: '/hizmetlerimiz/forklift.jpg',
      title: 'Forklift',
      description: 'Endüstriyel forkliftler için güçlü ve uzun ömürlü elektrikli güç sistemleri',
      category: 'Endüstriyel',
      gradient: 'from-orange-600 via-red-500 to-pink-400',
      bgColor: 'bg-gradient-to-br from-orange-900/20 via-red-800/20 to-pink-600/20',
      slug: 'forklift'
    },
    {
      id: 11,
      image: '/hizmetlerimiz/ebus.jpg',
      title: 'E-Bus',
      description: 'Elektrikli otobüsler için yüksek kapasiteli batarya sistemleri ve şarj altyapısı',
      category: 'Ulaşım',
      gradient: 'from-teal-600 via-blue-500 to-cyan-400',
      bgColor: 'bg-gradient-to-br from-teal-900/20 via-blue-800/20 to-cyan-600/20',
      slug: 'e-bus'
    }
  ];

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !slidesRef.current.includes(el)) {
      slidesRef.current[index] = el;
    }
  };

  const addToDotsRefs = (el: HTMLButtonElement | null, index: number) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current[index] = el;
    }
  };

  const animateSlide = (newIndex: number, direction: 'next' | 'prev' = 'next') => {
    const currentSlideEl = slidesRef.current[currentSlide];
    const newSlideEl = slidesRef.current[newIndex];
    const currentDot = dotsRef.current[currentSlide];
    const newDot = dotsRef.current[newIndex];

    if (!currentSlideEl || !newSlideEl) return;

    const tl = gsap.timeline();

    // Background transition
    tl.to([backgroundRef.current, blurredImageRef.current], {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    })
      .call(() => {
        setCurrentSlide(newIndex);
      })
      .to([backgroundRef.current, blurredImageRef.current], {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '-=0.4');

    // Slide out current
    gsap.to(currentSlideEl, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      rotationY: direction === 'next' ? -15 : 15,
      duration: 1.0,
      ease: 'power2.inOut'
    });

    // Slide in new
    gsap.fromTo(newSlideEl,
      {
        x: direction === 'next' ? 100 : -100,
        opacity: 0,
        scale: 0.8,
        rotationY: direction === 'next' ? 15 : -15
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.0,
        ease: 'back.out(1.7)',
        delay: 0.3
      }
    );

    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.6 }
    );

    // Dots animation
    if (currentDot) {
      gsap.to(currentDot, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }

    if (newDot) {
      gsap.to(newDot, {
        scale: 1.3,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    }
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % slides.length;
    animateSlide(newIndex, 'next');
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    animateSlide(newIndex, 'prev');
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    const direction = index > currentSlide ? 'next' : 'prev';
    animateSlide(index, direction);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSlide, nextSlide]);

  // Initial animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(slidesRef.current[0],
        { scale: 0.8, opacity: 0, rotationY: 15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

    // Set initial dot state
    if (dotsRef.current[0]) {
      gsap.set(dotsRef.current[0], { scale: 1.3 });
    }
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Dynamic Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Blurred background image/video */}
        <div ref={blurredImageRef} className="absolute inset-0">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={currentSlideData.image}
              alt={`${currentSlideData.title} background`}
              fill
              className="object-cover blur-2xl scale-110 transition-all duration-1000"
              sizes="100vw"
              loading="lazy"
              quality={50}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>

        <div className={`absolute inset-0 ${currentSlideData.bgColor} transition-all duration-1000`}></div>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient} opacity-10 transition-all duration-1000`}></div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div ref={titleRef}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              <span className="block">Tekin Power</span>
              <span className={`block bg-gradient-to-r ${currentSlideData.gradient} bg-clip-text text-transparent transition-all duration-1000`}>
                Yenilenebilir Enerji
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md px-4 sm:px-0">
              Gelişmiş LiFePO4 batarya teknolojisi ile yenilenebilir enerji dönüşümünde öncülük eden,
              marin, otomotiv, havacılık ve endüstriyel sektörlerde sürdürülebilir çözümler sunan.
            </p>
          </div>
        </div>

        {/* Main Swiper Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-0 top-1/2 transform -translate-y-1/2 sm:-translate-x-16 z-20 w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-white/20  border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group shadow-xl"
          >
            <ChevronLeft className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-0 top-1/2 transform -translate-y-1/2 sm:translate-x-16 z-20 w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 bg-white/20  border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group shadow-xl"
          >
            <ChevronRight className="w-5 sm:w-6 lg:w-7 h-5 sm:h-6 lg:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Slides Container */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] perspective-1000">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                ref={el => addToRefs(el, index)}
                className={`absolute inset-0 ${index === currentSlide ? 'z-10' : 'z-0'}`}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">

                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    quality={85}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-12">
                    <div className="max-w-2xl">
                      <span className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${slide.gradient} text-white text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4 shadow-lg`}>
                        {slide.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 drop-shadow-lg">
                        {slide.title}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed drop-shadow-md mb-4 sm:mb-6">
                        {slide.description}
                      </p>

                      {/* Detail Button */}
                      <Link
                        href={`/hizmetlerimiz/${slide.slug}`}
                        className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg group text-sm sm:text-base"
                      >
                        <span>Detay İçin</span>
                        <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 space-y-3 sm:space-y-4">
          {/* Interaction Hint */}
          <div className="text-center">
            <p className="text-white/70 text-xs sm:text-sm font-medium mb-2">
              Gezinmek için oklara veya noktalara tıklayın
            </p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              {/* Dots */}
              <div className="flex space-x-2 sm:space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    ref={el => addToDotsRefs(el, index)}
                    onClick={() => goToSlide(index)}
                    className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide
                      ? `bg-gradient-to-r ${slides[index].gradient} scale-125`
                      : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={toggleAutoplay}
                className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group shadow-lg"
              >
                {isPlaying ? (
                  <Pause className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                ) : (
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoSwiper;