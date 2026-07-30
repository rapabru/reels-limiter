const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, drawFn) {
  // Raw RGBA pixels
  const buffer = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = drawFn(x, y, width, height);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }
  
  // Format as PNG scanlines with filter byte 0
  const scanlines = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    scanlines[y * (width * 4 + 1)] = 0; // Filter type None
    buffer.copy(scanlines, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  
  const compressedData = zlib.deflateSync(scanlines);
  
  // PNG Chunks
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);
  
  // IDAT
  const idatChunk = makeChunk('IDAT', compressedData);
  
  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeInt32BE(crc, 8 + len);
  return chunk;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) | 0;
}

// Icon Drawing Logic: Dark rounded rectangle background with gradient ring & play symbol
function drawIcon(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Corner rounded square check
  const margin = w * 0.08;
  const cornerRadius = w * 0.25;
  const rx = Math.max(0, Math.abs(x - cx) - (cx - margin - cornerRadius));
  const ry = Math.max(0, Math.abs(y - cy) - (cy - margin - cornerRadius));
  if (rx * rx + ry * ry > cornerRadius * cornerRadius) {
    return [0, 0, 0, 0]; // Transparent outside
  }
  
  // Play triangle check
  const triWidth = w * 0.22;
  const triHeight = h * 0.3;
  const relX = (x - (cx - triWidth * 0.3)) / triWidth;
  const relY = Math.abs(y - cy) / (triHeight / 2);
  
  if (relX >= 0 && relX <= 1 && relY <= (1 - relX * 0.7)) {
    return [255, 255, 255, 255]; // White play icon
  }
  
  // Outer gradient ring
  const outerR = w * 0.42;
  const innerR = w * 0.32;
  if (dist >= innerR && dist <= outerR) {
    const angle = Math.atan2(dy, dx);
    const normAngle = (angle + Math.PI) / (2 * Math.PI); // 0 to 1
    const r = Math.round(237 * (1 - normAngle) + 250 * normAngle);
    const g = Math.round(73 * (1 - normAngle) + 160 * normAngle);
    const b = Math.round(86 * (1 - normAngle) + 0 * normAngle);
    return [r, g, b, 255];
  }
  
  // Dark squircle background
  return [18, 18, 24, 255];
}

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

[16, 48, 128].forEach(size => {
  const png = createPNG(size, size, drawIcon);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), png);
  console.log(`Generated icon${size}.png`);
});
