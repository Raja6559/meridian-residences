import { imageInfo, type ImageName } from '../data/images';
type Props = { name: ImageName; className?: string; eager?: boolean; sizes?: string; decorative?: boolean };
export function Photo({ name, className = '', eager = false, sizes = '(max-width: 700px) 100vw, 60vw', decorative = false }: Props) {
  const image = imageInfo(name);
  return <img className={className} src={`/images/${name}-1280.webp`} srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`} sizes={sizes} width={1280} height={853} alt={decorative ? '' : image.alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}
