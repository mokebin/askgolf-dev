import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";
import { Image } from "~/components/image";

interface CategoryGridItemProps extends HydrogenComponentProps {
  title?: string;
  image?: WeaverseImage;
  link?: string;
  imageAlt?: string;
  borderRadius?: number;
}

export default function CategoryGridItem(props: CategoryGridItemProps) {
  const {
    title = "Category",
    image,
    link,
    borderRadius = 0,
    imageAlt = "",
    ...rest
  } = props;

  const imageData =
    typeof image === "object"
      ? {
          ...image,
          altText: imageAlt || image.altText || title,
        }
      : image
        ? {
            url: image,
            altText: imageAlt || title,
          }
        : null;

  const cardClassName =
    "group relative block aspect-[1.75] w-full overflow-hidden bg-gray-100";

  const cardStyle = {
    borderRadius: `${borderRadius}px`,
  };

  const cardContent = (
    <>
      {imageData ? (
        <Image
          loading="lazy"
          data={imageData}
          width={1600}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm text-gray-500">
          Select image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />

      <div className="absolute left-4 top-4 md:left-5 md:top-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-white drop-shadow-md md:text-base">
          {title}
        </h3>
      </div>
    </>
  );

  return (
    <div {...rest}>
      {link ? (
        <a
          href={link}
          className={cardClassName}
          style={cardStyle}
          aria-label={`Shop ${title}`}
        >
          {cardContent}
        </a>
      ) : (
        <div className={cardClassName} style={cardStyle}>
          {cardContent}
        </div>
      )}
    </div>
  );
}

export const schema = createSchema({
  title: "Category",
  type: "category-grid-item",
  settings: [
    {
      group: "Category",
      inputs: [
        {
          type: "text",
          name: "title",
          label: "Title",
          defaultValue: "Category",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
        },
        {
          type: "text",
          name: "imageAlt",
          label: "Image alt text",
        },
        {
          type: "range",
          name: "borderRadius",
          label: "Corner radius",
          configs: {
            min: 0,
            max: 40,
            step: 2,
            unit: "px",
          },
          defaultValue: 0,
        },
        {
          type: "url",
          name: "link",
          label: "Collection link",
        },
      ],
    },
  ],
});
