import BatterySection from '@/components/BatterySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import JsonLdSchema from '@/components/JsonLdSchema';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSectionHomepage';
import SolarSection from '@/components/SolarSection';
import DewJetAnnouncementModal from '@/components/DewJetAnnouncementModal';

export default function Home() {
  return (
    <div className="relative">
      {/* Navigation */}
      <Navbar />
      
      {/* DewJet Announcement Modal */}
      <DewJetAnnouncementModal />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Battery Technology Section */}
        <BatterySection />
        
        {/* Solar Panel Section */}
        <SolarSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />

      {/* SEO - JSON-LD Schema */}
      <JsonLdSchema 
        type="Organization"
        data={{
          name: "Tekin Power Energy",
          url: "https://tekinpower.com.tr",
          logo: "https://tekinpower.com.tr/tekinpowerlogos/tekinpower-02.png",
          sameAs: [
            "https://www.facebook.com/tekinpower",
            "https://www.instagram.com/tekinpower",
            "https://www.linkedin.com/company/tekinpower"
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+902125550123",
            contactType: "customer service",
            areaServed: "TR",
            availableLanguage: ["Turkish", "English"]
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Teknokent İstanbul",
            addressLocality: "Kurtköy",
            addressRegion: "İstanbul",
            postalCode: "34000",
            addressCountry: "TR"
          },
          description: "Tekin Power, marin, solar enerji sistemleri, ebus, drone, golf araçları, forklift, carport ve solar pole alanlarında yenilikçi enerji çözümleri sunar. LiFePO4 bataryalar ile sürdürülebilir bir gelecek inşa ediyoruz."
        }}
      />
    </div>
  );
}
