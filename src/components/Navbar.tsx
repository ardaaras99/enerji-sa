'use client';

import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Navbar animasyonu
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item: { label: string; href: string; type: string }) => {
    if (item.type === 'scroll') {
      scrollToSection(item.href);
    }
    // For navigation type, Link component will handle the routing
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Ana Sayfa', href: '/', type: 'navigate' },
    { label: 'Hakkımızda', href: '/hakkimizda', type: 'navigate' },
    { label: 'Hizmetlerimiz', href: '/hizmetlerimiz', type: 'navigate' },
    { label: 'LiFePO4', href: '/lifepo4', type: 'navigate' },
    { label: 'Güneş Paneli', href: '/gunespaneli', type: 'navigate' },
    { label: 'DewJet', href: '/dewjet', type: 'navigate' },
    { label: 'İletişim', href: 'contact', type: 'scroll' }
  ];

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 overflow-x-hidden ${
      isScrolled 
        ? 'bg-white/50 backdrop-blur-lg shadow-lg ' 
        : ' '
    }`}>
       <div className="max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-6 xl:px-8 w-full">
         <div className="flex items-center justify-between h-28 sm:h-28 lg:h-32 gap-2 lg:gap-4">
          {/* Logo */}
           <Link 
             href="/"
             className="flex items-center justify-center lg:justify-start cursor-pointer flex-1 lg:flex-none min-w-0 overflow-hidden"
           >
             <div className="relative w-[90vw] sm:w-96 md:w-[28rem] lg:w-[26rem] xl:w-[28rem] h-24 sm:h-24 md:h-28 lg:h-28 xl:h-32 max-w-full">
              <Image
                src="/tekinpowerlogos/tekinpower-02.png"
                alt="Tekin Power Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-shrink-0">
            {navItems.map((item) => {
              const baseClasses = `relative text-sm xl:text-base font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white/90 hover:text-white'
              } group`;

              if (item.type === 'navigate') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={baseClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className={baseClasses}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              );
            })}
            

          </div>

           {/* Mobile Menu Button */}
           <div className="lg:hidden flex-shrink-0">
             <button
               onClick={toggleMenu}
               className={`p-1 sm:p-1.5 rounded-lg transition-colors duration-300 ${
                 isScrolled 
                   ? 'text-gray-700 hover:bg-gray-100' 
                   : 'text-white hover:bg-white/10'
               }`}
             >
              {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className=" m-5 py-2 space-y-2 bg-white/95 backdrop-blur-lg rounded-lg mt-4 shadow-lg border border-blue-100 mx-4 sm:mx-8 md:mx-12">
            {navItems.map((item) => {
              const baseClasses = "block w-full text-left px-4 sm:px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium text-base";
              
              if (item.type === 'navigate') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={baseClasses}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className={baseClasses}
                >
                  {item.label}
                </button>
              );
            })}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
