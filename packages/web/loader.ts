export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality: number }) {
  return src.startsWith("/uploads") ? `http://localhost:1337${src}` : src;
}
