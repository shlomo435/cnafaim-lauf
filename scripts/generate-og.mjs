import sharp from 'sharp';

await sharp('public/logo.jpg')
  .resize(560, 560, { fit: 'contain', background: { r: 240, g: 250, b: 250, alpha: 1 } })
  .extend({
    top: 35,
    bottom: 35,
    left: 320,
    right: 320,
    background: { r: 240, g: 250, b: 250, alpha: 1 },
  })
  .jpeg({ quality: 90 })
  .toFile('public/og-image.jpg');

console.log('OG image generated: public/og-image.jpg');
