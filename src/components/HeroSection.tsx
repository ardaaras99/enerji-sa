"use client";

import { gsap } from "gsap";
import {
  ArrowRight,
  BatteryCharging,
  Car,
  ChevronLeft,
  ChevronRight,
  Drone,
  Play,
  Ship,
  SunIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useVideoOptimization } from "../hooks/useVideoOptimization";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; delay: number }>
  >([]);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<number | null>(null);

  // Video state management to prevent race conditions
  const videoPlayPromises = useRef<Map<HTMLVideoElement, Promise<void>>>(
    new Map()
  );

  // Network speed detection function
  const checkNetworkSpeed = async (): Promise<number> => {
    try {
      // Use the Network Information API if available
      if ("connection" in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.downlink) {
          // Convert from Mbps to Mbps (already in Mbps)
          return connection.downlink;
        }
      }

      // Fallback: Simple speed test using a small image
      const startTime = performance.now();
      const testImage = new Image();
      const testImageUrl = "/next.svg"; // Small image for testing

      return new Promise((resolve) => {
        testImage.onload = () => {
          const endTime = performance.now();
          const duration = (endTime - startTime) / 1000; // Convert to seconds
          const imageSize = 1024; // Approximate size in bytes
          const speedMbps = (imageSize * 8) / (duration * 1000000); // Convert to Mbps
          resolve(speedMbps);
        };
        testImage.onerror = () => {
          // If test fails, assume slow connection
          resolve(5);
        };
        testImage.src = testImageUrl + "?t=" + Date.now(); // Cache busting
      });
    } catch (error) {
      console.log("Network speed detection failed:", error);
      return 5; // Default to slow connection
    }
  };

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Background animasyonu
    tl.fromTo(
      backgroundRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    )
      // Title animasyonu
      .fromTo(
        titleRef.current?.children || [],
        { y: 100, opacity: 0, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1.5"
      )
      // Subtitle animasyonu
      .fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      // CTA butonları animasyonu
      .fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      // Sağ taraf kart animasyonu
      .fromTo(
        cardRef.current,
        { x: 80, opacity: 0, scale: 0.8, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
        },
        "-=0.7"
      )
      // Kategori indicators animasyonu
      .fromTo(
        categoriesRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Floating animasyonu
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    });

    // Particle animasyonu
    gsap.to(".particle", {
      y: -100,
      x: "random(-50, 50)",
      opacity: 0,
      duration: "random(3, 6)",
      ease: "power2.out",
      repeat: -1,
      delay: "random(0, 3)",
    });
  }, []);

  // Start initial videos when component mounts (only if videos should be loaded)
  useEffect(() => {
    if (!shouldLoadVideos) return;

    const timer = setTimeout(async () => {
      const backgroundVideo = backgroundVideoRef.current;
      const cardVideo = cardVideoRef.current;

      if (backgroundVideo) {
        await switchVideoSafely(backgroundVideo);
        setIsVideoLoading(false);
      }
      if (cardVideo) {
        await switchVideoSafely(cardVideo);
      }
    }, 100); // Small delay to ensure videos are loaded

    return () => clearTimeout(timer);
  }, [shouldLoadVideos]); // Run when shouldLoadVideos changes

  // Check network speed on component mount
  useEffect(() => {
    const initializeNetworkCheck = async () => {
      const speed = await checkNetworkSpeed();
      setConnectionSpeed(speed);

      // Only load videos if connection is 10mb or higher
      if (speed >= 10) {
        setShouldLoadVideos(true);
        setIsVideoLoading(false);
      } else {
        setShouldLoadVideos(false);
        setIsVideoLoading(false);
        console.log(
          `Connection speed (${speed.toFixed(
            2
          )} Mbps) is below 10 Mbps. Videos disabled for better performance.`
        );
      }
    };

    initializeNetworkCheck();
  }, []);

  // Cleanup video promises on unmount
  useEffect(() => {
    return () => {
      // Cancel all pending video play promises
      videoPlayPromises.current.forEach((promise, videoElement) => {
        videoElement.pause();
      });
      videoPlayPromises.current.clear();
    };
  }, []);

  const categories = [
    {
      icon: Ship,
      title: "Marin",
      description: "Denizcilik enerji çözümleri",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-900/90 via-cyan-800/90 to-blue-900/90",
      video: "/landing-page-videos-optimized/marin.mp4",
      details:
        "Denizcilik sektörü için özel tasarlanmış LiFePO₄ batarya sistemleri ve solar çözümler.",
      slug: "marin",
    },
    {
      icon: BatteryCharging,
      title: "Enerji Depolama Sistemleri",
      description: "Gelişmiş batarya teknolojileri",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-900/90 via-violet-800/90 to-purple-900/90",
      video: "/landing-page-videos-optimized/enerjidepolamasistemleri.mp4",
      details:
        "Yüksek kapasiteli LiFePO₄ batarya sistemleri ile güvenilir enerji depolama çözümleri.",
      slug: "enerji-depolama",
    },
    {
      icon: SunIcon,
      title: "Telekomünikasyon Baz İstasyonu",
      description: "İletişim altyapısı enerji çözümleri",
      gradient: "from-blue-600 to-cyan-500",
      bgGradient: "from-blue-900/90 via-cyan-800/90 to-blue-900/90",
      video: "/landing-page-videos-optimized/telekomunikasyon.mp4",
      details:
        "Telekomünikasyon baz istasyonları için güvenilir ve sürekli enerji sağlayan sistemler.",
      slug: "telekomunikasyon",
    },
    {
      icon: TruckIcon,
      title: "Askeri Sistem Uygulamaları",
      description: "Savunma sanayi enerji çözümleri",
      gradient: "from-green-600 to-emerald-500",
      bgGradient: "from-green-900/90 via-emerald-800/90 to-green-900/90",
      video: "/landing-page-videos-optimized/askerisistemuygulamalari.mp4",
      details:
        "Savunma sanayii için özel tasarlanmış güvenilir ve dayanıklı enerji sistemleri.",
      slug: "askeri-sistem-uygulamalari",
    },
    {
      icon: Car,
      title: "Car Port",
      description: "Solar otopark sistemleri",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-900/90 via-emerald-800/90 to-green-900/90",
      video: "/landing-page-videos-optimized/carport.mp4",
      details:
        "Otopark alanlarının üzerine kurulu güneş panelleri ile enerji üretimi ve araç koruması.",
      slug: "car-port",
    },
    {
      icon: SunIcon,
      title: "Mobil Solar Panel",
      description: "Taşınabilir güneş enerjisi",
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-900/90 via-orange-800/90 to-yellow-900/90",
      video: "/landing-page-videos-optimized/mobilsolarpanel.mp4",
      details:
        "Mobil ve esnek kullanım için tasarlanmış taşınabilir güneş paneli sistemleri.",
      slug: "mobil-solar",
    },
    {
      icon: SunIcon,
      title: "Konut Çözümleri",
      description: "Ev için güneş enerjisi sistemleri",
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-900/90 via-yellow-800/90 to-amber-900/90",
      video: "/landing-page-videos-optimized/konutcozumleri.mp4",
      details:
        "Evler için özel tasarlanmış güneş paneli sistemleri ve enerji depolama çözümleri.",
      slug: "konut-cozumleri",
    },
    {
      icon: Car,
      title: "Golf Araçları",
      description: "Elektrikli golf araç sistemleri",
      gradient: "from-teal-500 to-green-500",
      bgGradient: "from-teal-900/90 via-green-800/90 to-teal-900/90",
      video: "/landing-page-videos-optimized/golfcar.mp4",
      details:
        "Golf sahalarında kullanım için özel tasarlanmış elektrikli araç enerji sistemleri.",
      slug: "golf-araclari",
    },
    {
      icon: Drone,
      title: "Drone",
      description: "İHA enerji teknolojileri",
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-900/90 via-red-800/90 to-orange-900/90",
      video: "/landing-page-videos-optimized/drone.mp4",
      details:
        "Havacılık sektörü için yüksek performanslı ve hafif enerji depolama çözümleri.",
      slug: "drone",
    },
    {
      icon: TruckIcon,
      title: "Forklift",
      description: "Endüstriyel araç sistemleri",
      gradient: "from-gray-500 to-slate-500",
      bgGradient: "from-gray-900/90 via-slate-800/90 to-gray-900/90",
      video: "/landing-page-videos-optimized/forklift.mp4",
      details:
        "Endüstriyel forklift ve iş makineleri için güçlü ve dayanıklı enerji çözümleri.",
      slug: "forklift",
    },
    {
      icon: Car,
      title: "E-Bus",
      description: "Elektrikli otobüs sistemleri",
      gradient: "from-teal-600 to-cyan-500",
      bgGradient: "from-teal-900/90 via-cyan-800/90 to-teal-900/90",
      video: "/landing-page-videos-optimized/ebus.mp4",
      details:
        "Elektrikli otobüsler için yüksek kapasiteli batarya sistemleri ve şarj altyapısı.",
      slug: "e-bus",
    },
  ];

  // Video optimization hook
  // const videoSources = categories.map((cat) => cat.video);
  // const {
  //   isVideoLoaded,
  //   isVideoLoading: isVideoLoadingOptimized,
  //   hasVideoError,
  //   preloadVideo,
  // } = useVideoOptimization(currentSlide, videoSources, {
  //   preloadNext: true,
  //   preloadPrevious: true,
  //   quality: "medium",
  //   maxConcurrent: 2,
  // });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Slider navigation functions
  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % categories.length;
    changeSlide(newSlide, "next");
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + categories.length) % categories.length;
    changeSlide(newSlide, "prev");
  };

  // Robust video switching function that handles race conditions
  const switchVideoSafely = async (videoElement: HTMLVideoElement) => {
    if (!videoElement || !shouldLoadVideos) return;

    try {
      // Cancel any pending play promise
      const existingPromise = videoPlayPromises.current.get(videoElement);
      if (existingPromise) {
        // Let the existing promise complete or fail naturally
        videoPlayPromises.current.delete(videoElement);
      }

      // Pause the video first
      videoElement.pause();

      // Reset to beginning
      videoElement.currentTime = 0;

      // Create a new play promise and store it
      const playPromise = videoElement.play();
      videoPlayPromises.current.set(videoElement, playPromise);

      // Wait for the play promise to resolve
      await playPromise;

      // Clean up the promise from our map
      videoPlayPromises.current.delete(videoElement);
    } catch (error) {
      // Clean up the promise from our map on error
      videoPlayPromises.current.delete(videoElement);

      // Only log if it's not an AbortError (which is expected during rapid switching)
      if (error instanceof Error && error.name !== "AbortError") {
        console.log("Video play failed:", error);
      }
    }
  };

  const changeSlide = (
    newSlide: number,
    direction: "next" | "prev" = "next"
  ) => {
    const tl = gsap.timeline();

    // Only background fade - card stays visible
    tl.to(backgroundRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    })
      // Change slide content instantly
      .call(() => {
        setCurrentSlide(newSlide);
      })
      // Quick background fade in
      .to(backgroundRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      // Restart videos when slide changes - with race condition handling
      .call(() => {
        const backgroundVideo = backgroundVideoRef.current;
        const cardVideo = cardVideoRef.current;

        // Switch videos safely without race conditions
        if (backgroundVideo) {
          switchVideoSafely(backgroundVideo);
        }
        if (cardVideo) {
          switchVideoSafely(cardVideo);
        }
      });
  };

  // Video event handlers
  useEffect(() => {
    const handleVideoEnd = () => {
      const newSlide = (currentSlide + 1) % categories.length;
      changeSlide(newSlide, "next");
    };

    const backgroundVideo = backgroundVideoRef.current;
    const cardVideo = cardVideoRef.current;

    if (backgroundVideo) {
      backgroundVideo.addEventListener("ended", handleVideoEnd);
    }
    if (cardVideo) {
      cardVideo.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (backgroundVideo) {
        backgroundVideo.removeEventListener("ended", handleVideoEnd);
      }
      if (cardVideo) {
        cardVideo.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [currentSlide, categories.length]);

  // Get fallback image for current category
  const getFallbackImage = (categorySlug: string) => {
    const fallbackImages: { [key: string]: string } = {
      "marin": "marin.jpg",
      "enerji-depolama": "enerjidepolama.jpg",
      "telekomunikasyon": "telekomunikasyonbazistasyonu.jpg",
      "askeri-sistem-uygulamalari": "askerisistemuygulamalari.jpg",
      "car-port": "carport.jpg",
      "mobil-solar": "mobil-solar.jpg",
      "konut-cozumleri": "homesolarsystem.jpg",
      "golf-araclari": "golfcar.jpg",
      "drone": "drone.jpg",
      "forklift": "forklift.jpg",
      "e-bus": "ebus.jpg",
    };
    return fallbackImages[categorySlug] || "marin.jpg";
  };

  const currentCategory = categories[currentSlide];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      ref={heroRef}
    >
      {/* Dynamic Animated Background */}
      <div ref={backgroundRef} className="absolute inset-0">
        {/* Background Video - Full Hero (only if connection is fast enough) */}
        {shouldLoadVideos ? (
          <video
            ref={backgroundVideoRef}
            src={currentCategory.video}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            muted
            playsInline
            preload="metadata"
            // poster={`/landing-page-photos/${currentCategory.slug || "marin"}.jpg`}
            onLoadStart={() => setIsVideoLoading(true)}
            onCanPlay={() => setIsVideoLoading(false)}
          />
        ) : (
          /* Fallback background for slow connections */
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/hizmetlerimiz/${getFallbackImage(currentCategory.slug)})`,
            }}
          />
        )}

        {/* Loading overlay */}
        {isVideoLoading && shouldLoadVideos && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <p className="text-white text-sm">Video yükleniyor...</p>
            </div>
          </div>
        )}

        {/* Connection speed indicator (for debugging) */}
        {connectionSpeed !== null && !shouldLoadVideos && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-xs z-20">
            <div>Connection: {connectionSpeed.toFixed(2)} Mbps</div>
            <div>Videos disabled for performance</div>
          </div>
        )}

        {/* Light overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Dynamic gradient overlay - more subtle */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentCategory.bgGradient} opacity-40 transition-all duration-1000`}
        ></div>

        {/* Animated particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl floating-element"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-xl floating-element"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-8">
          {/* Left Content */}
          <div className="text-center lg:text-left order-1 lg:order-1">
            <div ref={titleRef} className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg leading-tight">
                <span className="block">Geleceğin</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">
                  Enerji Çözümleri
                </span>
                <span className="block">Bugünden Başlar</span>
              </h1>
            </div>

            <div ref={subtitleRef}>
              <p className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 leading-relaxed drop-shadow-md px-2 lg:px-0">
                Modern LiFePO₄ batarya teknolojisi ve yenilikçi güneş enerjisi
                sistemleri ile
                <span className="text-white font-semibold">
                  {" "}
                  güçlü, sürdürülebilir ve güvenilir{" "}
                </span>
                enerji çözümleri sunuyoruz.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center px-4 lg:px-0"
            >
              <button
                onClick={() => scrollToSection("services")}
                className="group bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>Çözümlerimizi Keşfet</span>
              </button>
            </div>
          </div>

          {/* Right Content - Category Slider */}
          <div className="relative order-2 lg:order-2">
            {/* Main Category Card */}
            <div className="relative mx-4 sm:mx-6 lg:mx-8">
              <div
                ref={cardRef}
                className="relative rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 min-h-[300px] sm:min-h-[350px] lg:min-h-[400px] flex flex-col justify-center items-center text-center transition-all duration-500 hover:scale-105 overflow-hidden shadow-xl"
              >
                {/* Background Video - Full Card (only if connection is fast enough) */}
                {shouldLoadVideos ? (
                  <video
                    ref={cardVideoRef}
                    src={currentCategory.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    // poster={`/landing-page-photos/${
                    //   currentCategory.slug || "marin"
                    // }.jpg`}
                  />
                ) : (
                  /* Fallback background for slow connections */
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(/hizmetlerimiz/${getFallbackImage(currentCategory.slug)})`,
                    }}
                  />
                )}

                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Navigation Arrows - Inside the card */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group shadow-lg"
                >
                  <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 z-20 w-8 sm:w-9 h-8 sm:h-9 bg-white/20 backdrop-blur-lg border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-300 group shadow-lg"
                >
                  <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                </button>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center text-center h-full">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 drop-shadow-lg">
                    {currentCategory.title}
                  </h3>
                  <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed drop-shadow-md max-w-md px-2 mb-4 sm:mb-6">
                    {currentCategory.details}
                  </p>

           
                </div>
              </div>
            </div>

            {/* Category Indicators */}
            <div className="flex justify-center space-x-2 px-4">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    changeSlide(index, index > currentSlide ? "next" : "prev");
                  }}
                  className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? `bg-gradient-to-r ${categories[index].gradient} scale-125`
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// empty commit
