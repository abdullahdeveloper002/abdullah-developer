import Image from "next/image";

/** Project image, full-bleed: it covers the whole preview area edge to edge, anchored to the top so a browser frame stays in view. */
export default function ProjectPreview({ image }) {
  return (
    <div className="relative aspect-[16/10] size-full overflow-hidden bg-mist lg:aspect-auto lg:min-h-80">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
