'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SolarPanelShowcase from '@/components/solar/SolarPanelShowcase';

export default function GunesPaneliPage() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Solar Panel Product Showcase */}
        <SolarPanelShowcase />
      </main>

      <Footer />
    </div>
  );
}
