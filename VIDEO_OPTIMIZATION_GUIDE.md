# Video Optimization Guide for Tekin Power Landing Page

## 🎯 Problem

Your landing page videos are loading slowly on Vercel due to large file sizes (2.5MB - 34MB).

## 🚀 Solutions Implemented

### 1. **Video Compression Script**

```bash
npm run compress-videos
```

This script will:

- Compress all videos to 720p resolution
- Reduce file size by 60-80%
- Optimize for web streaming with fast start
- Use H.264 codec for maximum compatibility

### 2. **Smart Preloading System**

- Preloads next and previous videos
- Limits concurrent downloads (max 2)
- Queue system for efficient loading
- Error handling and timeouts

### 3. **Loading States & UX**

- Loading spinners during video load
- Poster images as fallbacks
- Smooth transitions between videos
- Error handling with graceful degradation

### 4. **Next.js Optimizations**

- Cache headers for videos (1 year)
- Proper MIME types
- Compression enabled
- Static optimization

## 📋 Implementation Steps

### Step 1: Compress Videos

```bash
# Install FFmpeg first (if not installed)
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: Download from https://ffmpeg.org/

npm run compress-videos
```

### Step 2: Replace Original Videos

After compression, replace the original videos with optimized ones:

```bash
# Move optimized videos to replace originals
mv public/landing-page-videos-optimized/* public/landing-page-videos/
```

### Step 3: Add Poster Images

Create poster images for each video category:

- `/public/landing-page-photos/marin.jpg`
- `/public/landing-page-photos/car-port.jpg`
- `/public/landing-page-photos/drone.jpg`
- etc.

### Step 4: Test Performance

1. Run `npm run dev`
2. Check Network tab in DevTools
3. Measure video load times
4. Test on different devices/connections

## 🎨 Additional Optimizations

### A. Use WebP/AVIF for Posters

```bash
# Convert poster images to WebP
cwebp poster.jpg -o poster.webp -q 80
```

### B. Implement Progressive Loading

```typescript
// Load low-quality version first, then high-quality
const [videoQuality, setVideoQuality] = useState<"low" | "high">("low");

useEffect(() => {
  // Load high quality after low quality is ready
  if (videoQuality === "low" && isVideoLoaded(currentSlide)) {
    setTimeout(() => setVideoQuality("high"), 1000);
  }
}, [currentSlide, isVideoLoaded]);
```

### C. Use CDN for Videos

Consider using a CDN like Cloudinary or AWS CloudFront:

```typescript
const getVideoUrl = (videoPath: string) => {
  if (process.env.NODE_ENV === "production") {
    return `https://your-cdn.com${videoPath}`;
  }
  return videoPath;
};
```

## 📊 Expected Results

### Before Optimization:

- Video sizes: 2.5MB - 34MB
- Load time: 5-15 seconds
- Poor user experience

### After Optimization:

- Video sizes: 0.5MB - 7MB (70% reduction)
- Load time: 1-3 seconds
- Smooth user experience
- Better SEO scores

## 🔧 Advanced Optimizations

### 1. **Lazy Loading with Intersection Observer**

```typescript
const useIntersectionObserver = (ref: RefObject<Element>) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
};
```

### 2. **Video Quality Selection**

```typescript
const getVideoQuality = () => {
  const connection = (navigator as any).connection;
  if (connection?.effectiveType === "4g") return "high";
  if (connection?.effectiveType === "3g") return "medium";
  return "low";
};
```

### 3. **Service Worker for Caching**

```typescript
// public/sw.js
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/landing-page-videos/")) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
```

## 🚨 Troubleshooting

### Common Issues:

1. **FFmpeg not found**

   ```bash
   # Install FFmpeg
   brew install ffmpeg  # macOS
   sudo apt install ffmpeg  # Ubuntu
   ```

2. **Videos still loading slowly**

   - Check if compression worked
   - Verify cache headers
   - Test with different browsers

3. **Poster images not showing**
   - Ensure poster images exist
   - Check file paths in component

## 📈 Monitoring

### Performance Metrics to Track:

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Video load completion time

### Tools:

- Google PageSpeed Insights
- WebPageTest.org
- Chrome DevTools Performance tab
- Vercel Analytics

## 🎯 Next Steps

1. **Run the compression script**
2. **Test locally and on Vercel**
3. **Monitor performance improvements**
4. **Consider implementing CDN**
5. **Add more advanced optimizations as needed**

---

**Expected Performance Improvement: 60-80% faster video loading! 🚀**
