import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tekinpower.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Görüntü optimizasyonu için
    formats: ["image/avif", "image/webp"],
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Performans optimizasyonları
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  // Statik optimizasyon
  output: "standalone",
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  // Headers for video optimization
  async headers() {
    return [
      {
        source: "/landing-page-videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "video/mp4",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
