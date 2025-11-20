// Simple noise texture generator for glassmorphism overlay
const fs = require('fs');
const path = require('path');

// Generate a simple noise pattern as SVG (scalable and small file size)
const width = 200;
const height = 200;
const noiseIntensity = 0.8;

let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
    <feColorMatrix in="noise" type="saturate" values="0" />
    <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
  </filter>
  <rect width="${width}" height="${height}" fill="white" filter="url(#noise)" opacity="${noiseIntensity}" />
</svg>`;

// Write the SVG file
const outputPath = path.join(__dirname, '../public/textures/noise.svg');
fs.writeFileSync(outputPath, svgContent);

console.log('Noise texture generated at:', outputPath);
