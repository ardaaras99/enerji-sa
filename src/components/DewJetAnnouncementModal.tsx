'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';

const DewJetAnnouncementModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the announcement
    const hasSeenAnnouncement = localStorage.getItem('dewjet-announcement-seen');
    
    // Show modal after a short delay (1.5 seconds) if not seen before
    const timer = setTimeout(() => {
      if (!hasSeenAnnouncement) {
        setIsOpen(true);
        // Animate modal entrance
        gsap.fromTo('.modal-content',
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        );
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    // Animate modal exit
    gsap.to('.modal-content', {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsOpen(false);
        // Don't mark as seen - will show again next visit
      }
    });
  };

  const handleDontShowAgain = () => {
    // Mark as seen permanently
    localStorage.setItem('dewjet-announcement-seen', 'true');
    handleClose();
  };

  const handleLearnMore = () => {
    // Don't mark as seen - just close temporarily
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="modal-content bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto pointer-events-auto relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="sticky top-4 left-full z-10 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg group float-right mr-4 -mb-14"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-red-500 transition-colors duration-300" />
          </button>

          {/* Content */}
          <div className="relative">
            {/* New Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg animate-pulse">
                YENİ İŞBİRLİĞİ
              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full h-[180px] sm:h-[320px] lg:h-[420px]">
              <Image
                src="/dewjet/collab.jpeg"
                alt="Tekin Power & DewJet İşbirliği"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Text Content */}
            <div className="p-4 sm:p-8 lg:p-10">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Tekin Power & DewJet İşbirliği
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-4 sm:mb-6"></div>
              </div>

              <p className="text-sm sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 text-center max-w-2xl mx-auto">
                Denizcilik sektöründe çığır açan bu işbirliği ile <span className="font-semibold text-blue-600">%100 elektrikli marin motor çözümleri</span> sunuyoruz.
                Sürdürülebilir denizcilik için <span className="font-semibold text-green-600">sıfır emisyon</span> hedefine bir adım daha yaklaştık!
              </p>

              {/* Features */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-5 sm:mb-8">
                <div className="text-center p-2 sm:p-4 bg-blue-50 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-0.5 sm:mb-1">0</div>
                  <div className="text-xs text-gray-600">Emisyon</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-green-50 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-green-600 mb-0.5 sm:mb-1">100%</div>
                  <div className="text-xs text-gray-600">Elektrikli</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-purple-50 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-purple-600 mb-0.5 sm:mb-1">Sessiz</div>
                  <div className="text-xs text-gray-600">Çalışma</div>
                </div>
                <div className="text-center p-2 sm:p-4 bg-orange-50 rounded-xl">
                  <div className="text-lg sm:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">Uzun</div>
                  <div className="text-xs text-gray-600">Ömürlü</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/dewjet"
                  onClick={handleLearnMore}
                  className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Detaylı Bilgi</span>
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <div className="flex flex-row gap-2 sm:gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-300 hover:scale-105"
                  >
                    Daha Sonra
                  </button>

                  <button
                    onClick={handleDontShowAgain}
                    className="flex-1 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-base transition-all duration-300 hover:scale-105"
                  >
                    Bir daha gösterme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DewJetAnnouncementModal;
