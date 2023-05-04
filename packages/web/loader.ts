const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality: number }) {
  return src.includes("/uploads") ? `${imageUrl}${src}` : src;
}
