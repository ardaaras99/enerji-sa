#!/bin/bash

echo "🎬 Tekin Power Video Optimization Setup"
echo "======================================"
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu: sudo apt install ffmpeg"
    echo "   Windows: Download from https://ffmpeg.org/"
    echo ""
    exit 1
fi

echo "✅ FFmpeg is installed"
echo ""

# Create backup of original videos
echo "📁 Creating backup of original videos..."
if [ ! -d "public/landing-page-videos-backup" ]; then
    cp -r public/landing-page-videos public/landing-page-videos-backup
    echo "✅ Backup created at public/landing-page-videos-backup"
else
    echo "ℹ️  Backup already exists"
fi
echo ""

# Run video compression
echo "🎥 Starting video compression..."
echo "This may take several minutes depending on video sizes..."
echo ""

npm run compress-videos

echo ""
echo "🎉 Video optimization setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Check the compressed videos in public/landing-page-videos-optimized/"
echo "2. Replace original videos: mv public/landing-page-videos-optimized/* public/landing-page-videos/"
echo "3. Create poster images for each video category"
echo "4. Test the performance improvement"
echo ""
echo "📊 Expected results:"
echo "- 60-80% smaller file sizes"
echo "- 3-5x faster loading times"
echo "- Better user experience"
echo ""
echo "🚀 Run 'npm run dev' to test the improvements!"
