const imageUrl = process.env.IMAGE_URL;

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality: number }) {
  return src.startsWith("/uploads") ? `${imageUrl}${src}` : src;
}
