#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const inputDir = path.join(__dirname, "../public/landing-page-videos");
const outputDir = path.join(
  __dirname,
  "../public/landing-page-videos-optimized"
);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all MP4 files
const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".mp4"));

console.log("🎬 Starting video compression...\n");

files.forEach((file, index) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  console.log(`📹 Processing ${file} (${index + 1}/${files.length})`);

  try {
    // FFmpeg command for optimization
    // -crf 28: Constant Rate Factor (lower = better quality, higher = smaller file)
    // -preset fast: Encoding speed vs compression efficiency
    // -vf scale=1280:720: Scale down to 720p for web
    // -movflags +faststart: Enable fast start for web streaming
    // -c:v libx264: Use H.264 codec
    // -c:a aac: Use AAC audio codec
    const command = `ffmpeg -i "${inputPath}" -c:v libx264 -crf 28 -preset fast -vf scale=1280:720 -c:a aac -b:a 128k -movflags +faststart -y "${outputPath}"`;

    execSync(command, { stdio: "inherit" });

    // Get file sizes
    const originalSize = fs.statSync(inputPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = (
      ((originalSize - compressedSize) / originalSize) *
      100
    ).toFixed(1);

    console.log(
      `✅ ${file}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(
        compressedSize /
        1024 /
        1024
      ).toFixed(1)}MB (${reduction}% reduction)\n`
    );
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message);
  }
});

console.log("🎉 Video compression completed!");
console.log(`📁 Optimized videos saved to: ${outputDir}`);
console.log("\n📋 Next steps:");
console.log("1. Replace the original videos with optimized ones");
console.log("2. Update your video paths in the component");
console.log("3. Test the performance improvement");
