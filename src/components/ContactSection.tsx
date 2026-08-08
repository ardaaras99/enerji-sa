'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// GSAP ScrollTrigger plugin'ini kaydet
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animasyonu
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Form animasyonu
      gsap.fromTo(formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Contact info animasyonu
      gsap.fromTo(contactInfoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      // Gerçek uygulamada burası API çağrısı olacak
      console.log('Form data:', formData);
      setFormStatus('success');
      
      // 3 saniye sonra formu sıfırla
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      info: '+90 (532) 327 62 93',
      subInfo: '+90 (505) 685 33 93'
    },
    {
      icon: Mail,
      title: 'E-posta',
      info: 'info@tekinpower.com',
      subInfo: 'Teklifler ve bilgi için'
    },
    {
      icon: MapPin,
      title: 'Adres - Satış',
      info: 'Koza Cad. No:66/64',
      subInfo: 'Çankaya/Ankara'
    },
    {
      icon: MapPin,
      title: 'Adres - Depo',
      info: 'Perpa Ticaret Merkezi A Blok Kat:8',
      subInfo: 'No:823-825 Şişli/İstanbul'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      info: 'Pazartesi - Cuma',
      subInfo: '09:00 - 18:00'
    }
  ];

  const services = [
    'LiFePO₄ Batarya Sistemleri',
    'Güneş Enerjisi Sistemleri',
    'Hibrit Enerji Çözümleri',
    'Marin Enerji Sistemleri',
    'Askeri Uygulamalar',
    'Endüstriyel Çözümler',
    'Telekomünikasyon',
    'Diğer'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              İletişim
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enerji çözümleriniz için bizimle iletişime geçin. 
            Uzman ekibimiz size en uygun çözümü sunmaya hazır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Teklif Talep Formu
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              {/* Phone and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    placeholder="+90 (5xx) xxx xx xx"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-800 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                    placeholder="Şirket adı"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  İlgilendiğiniz Hizmet *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Hizmet seçiniz</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesajınız *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-800 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical placeholder:text-gray-400"
                  placeholder="Projeniz hakkında detaylar, güç ihtiyacınız, beklentileriniz..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Gönderiliyor...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Gönderildi!</span>
                  </>
                ) : formStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span>Hata Oluştu</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Teklif Talep Et</span>
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="text-green-600 text-center p-4 bg-green-50 rounded-xl">
                  Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div ref={contactInfoRef} className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 flex-shrink-0">
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                          {info.title}
                        </h4>
                        <p className="text-gray-700 font-medium">
                          {info.info}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {info.subInfo}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Hızlı İletişim
              </h3>
              <p className="text-blue-100 mb-6">
                Acil durumlar için 7/24 teknik destek hattımızı arayabilirsiniz.
              </p>
              <div className="space-y-3">
                <a 
                  href="tel:+905323276293"
                  className="w-full bg-white/20 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Hemen Ara</span>
                </a>
                <a 
                  href="mailto:info@tekinpower.com?subject=Tekin Power İletişim&body=Merhaba, bilgi almak istiyorum."
                  className="w-full bg-white/20 backdrop-blur-lg border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>E-posta Gönder</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
