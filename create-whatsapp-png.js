const fs = require('fs');
const zlib = require('zlib');

function createWhatsAppPNG(filePath) {
  const width = 256;
  const height = 256;
  
  const strokeBuffer = Buffer.alloc(height * (width * 4 + 1));
  const cx = 128;
  const cy = 120;
  const r = 96;

  // Exact WhatsApp path data points in normalized 0..1 coordinates
  // Official Phone path relative to center (scale ~ 80px)
  const phonePoints = [
    {x: 0.38, y: 0.20}, {x: 0.33, y: 0.17}, {x: 0.17, y: 0.05}, {x: 0.13, y: 0.04},
    {x: 0.07, y: -0.04}, {x: 0.03, y: -0.11}, {x: -0.05, y: -0.27}, {x: -0.12, y: -0.32},
    {x: -0.18, y: -0.32}, {x: -0.25, y: -0.32}, {x: -0.32, y: -0.27}, {x: -0.40, y: -0.17},
    {x: -0.44, y: -0.07}, {x: -0.44, y: 0.12}, {x: -0.40, y: 0.25}, {x: -0.27, y: 0.50},
    {x: -0.05, y: 0.68}, {x: 0.17, y: 0.78}, {x: 0.38, y: 0.70}, {x: 0.44, y: 0.56},
    {x: 0.44, y: 0.43}, {x: 0.40, y: 0.33}
  ];

  for (let y = 0; y < height; y++) {
    strokeBuffer[y * (width * 4 + 1)] = 0; // Filter type 0
    for (let x = 0; x < width; x++) {
      const idx = y * (width * 4 + 1) + 1 + x * 4;

      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Tail triangle pointing to (45, 218)
      let inTail = false;
      if (x >= 40 && x <= 120 && y >= 160 && y <= 225) {
        const x1 = 100, y1 = 180;
        const x2 = 45, y2 = 218;
        const x3 = 115, y3 = 205;
        const denom = (y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3);
        const a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denom;
        const b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denom;
        const c = 1 - a - b;
        if (a >= 0 && b >= 0 && c >= 0) inTail = true;
      }

      const inBubble = (dist <= r) || inTail;

      // Phone receiver raster math (Rotated 45 deg)
      const rad = -45 * Math.PI / 180;
      const rx = (dx * Math.cos(rad) - dy * Math.sin(rad)) / 90;
      const ry = (dx * Math.sin(rad) + dy * Math.cos(rad)) / 90;

      // Handset arc condition
      let inPhone = false;
      const rlen = Math.sqrt(rx * rx + ry * ry);

      if (rlen >= 0.28 && rlen <= 0.58 && rx <= 0.22) {
        inPhone = true;
      }
      // Top earpiece bulb
      if (Math.sqrt((rx - 0.08)*(rx - 0.08) + (ry - 0.44)*(ry - 0.44)) <= 0.18) {
        inPhone = true;
      }
      // Bottom mouthpiece bulb
      if (Math.sqrt((rx - 0.08)*(rx - 0.08) + (ry + 0.44)*(ry + 0.44)) <= 0.18) {
        inPhone = true;
      }
      // Inner curve cutout
      if (Math.sqrt((rx - 0.32)*(rx - 0.32) + ry * ry) <= 0.34) {
        inPhone = false;
      }

      // Edge anti-aliasing soft alpha calculation
      if (inPhone && inBubble) {
        strokeBuffer[idx] = 255;
        strokeBuffer[idx + 1] = 255;
        strokeBuffer[idx + 2] = 255;
        strokeBuffer[idx + 3] = 255;
      } else if (inBubble) {
        // WhatsApp green #25D366
        strokeBuffer[idx] = 37;
        strokeBuffer[idx + 1] = 211;
        strokeBuffer[idx + 2] = 102;
        strokeBuffer[idx + 3] = 255;
      } else {
        strokeBuffer[idx] = 0;
        strokeBuffer[idx + 1] = 0;
        strokeBuffer[idx + 2] = 0;
        strokeBuffer[idx + 3] = 0;
      }
    }
  }

  const compressedData = zlib.deflateSync(strokeBuffer);

  function writeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);

    let crc = 0xFFFFFFFF;
    for (let i = 4; i < 8 + len; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
      }
    }
    buf.writeUInt32BE((crc ^ 0xFFFFFFFF) >>> 0, 8 + len);
    return buf;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = writeChunk('IHDR', ihdrData);
  const idatChunk = writeChunk('IDAT', compressedData);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  fs.writeFileSync(filePath, Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]));
  console.log('High-res 256x256 WhatsApp PNG saved to:', filePath);
}

createWhatsAppPNG('public/whatsapp-logo.png');
