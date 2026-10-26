import Image from "next/image";

/** Project image, full-bleed: it covers the whole preview area edge to edge, with no frame around it. */
export default function ProjectPreview({ image }) {
  return (
    <div className="relative aspect-[16/10] size-full overflow-hidden bg-mist lg:aspect-auto lg:min-h-80">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 560px, 100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
