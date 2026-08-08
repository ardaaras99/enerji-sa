import { useEffect, useRef, useState } from "react";

interface VideoOptimizationOptions {
  preloadNext?: boolean;
  preloadPrevious?: boolean;
  quality?: "low" | "medium" | "high";
  maxConcurrent?: number;
}

export const useVideoOptimization = (
  currentIndex: number,
  videoSources: string[],
  options: VideoOptimizationOptions = {}
) => {
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const [loadingVideos, setLoadingVideos] = useState<Set<number>>(new Set());
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());

  const preloadQueue = useRef<number[]>([]);
  const maxConcurrent = options.maxConcurrent || 2;
  const currentlyLoading = useRef(0);

  // Generate optimized video source based on quality
  const getOptimizedSource = (source: string, quality: string = "medium") => {
    // For now, return original source
    // In production, you might have different quality versions
    return source;
  };

  // Preload a specific video
  const preloadVideo = (index: number) => {
    if (
      loadedVideos.has(index) ||
      loadingVideos.has(index) ||
      videoErrors.has(index)
    ) {
      return;
    }

    if (currentlyLoading.current >= maxConcurrent) {
      preloadQueue.current.push(index);
      return;
    }

    setLoadingVideos((prev) => new Set([...prev, index]));
    currentlyLoading.current++;

    const video = document.createElement("video");
    const source = getOptimizedSource(videoSources[index], options.quality);

    video.src = source;
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const handleLoad = () => {
      setLoadedVideos((prev) => new Set([...prev, index]));
      setLoadingVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      currentlyLoading.current--;

      // Process next in queue
      if (preloadQueue.current.length > 0) {
        const nextIndex = preloadQueue.current.shift();
        if (nextIndex !== undefined) {
          preloadVideo(nextIndex);
        }
      }
    };

    const handleError = () => {
      setVideoErrors((prev) => new Set([...prev, index]));
      setLoadingVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
      currentlyLoading.current--;

      // Process next in queue
      if (preloadQueue.current.length > 0) {
        const nextIndex = preloadQueue.current.shift();
        if (nextIndex !== undefined) {
          preloadVideo(nextIndex);
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoad);
    video.addEventListener("error", handleError);

    // Timeout fallback
    setTimeout(() => {
      if (loadingVideos.has(index)) {
        handleError();
      }
    }, 10000); // 10 second timeout
  };

  // Preload adjacent videos
  useEffect(() => {
    if (options.preloadNext) {
      const nextIndex = (currentIndex + 1) % videoSources.length;
      preloadVideo(nextIndex);
    }

    if (options.preloadPrevious) {
      const prevIndex =
        (currentIndex - 1 + videoSources.length) % videoSources.length;
      preloadVideo(prevIndex);
    }
  }, [
    currentIndex,
    videoSources.length,
    options.preloadNext,
    options.preloadPrevious,
  ]);

  // Preload current video
  useEffect(() => {
    preloadVideo(currentIndex);
  }, [currentIndex]);

  // Cleanup function
  const cleanup = () => {
    setLoadedVideos(new Set());
    setLoadingVideos(new Set());
    setVideoErrors(new Set());
    preloadQueue.current = [];
    currentlyLoading.current = 0;
  };

  return {
    loadedVideos,
    loadingVideos,
    videoErrors,
    isVideoLoaded: (index: number) => loadedVideos.has(index),
    isVideoLoading: (index: number) => loadingVideos.has(index),
    hasVideoError: (index: number) => videoErrors.has(index),
    preloadVideo,
    cleanup,
  };
};
