/*
 * 单个 Logo 图片、alt 文本和显示尺寸。
 */

import {
  createSchema,
  type HydrogenComponentProps,
  type WeaverseImage,
} from "@weaverse/hydrogen";

interface LogoListItemProps extends HydrogenComponentProps {
  image?: WeaverseImage;
  altText?: string;
  logoHeight?: number;
  logoMaxWidth?: number;
}

export default function LogoListItem(props: LogoListItemProps) {
  const {
    image,
    altText = "",
    logoHeight = 54,
    logoMaxWidth = 180,
    ...rest
  } = props;

  if (!image) {
    return (
      <div
        {...rest}
        className="flex h-20 w-full items-center justify-center bg-gray-50 text-sm text-gray-500 md:h-24"
      >
        Select logo
      </div>
    );
  }

  const imageUrl = typeof image === "object" ? image.url : image;
  const imageAlt =
    altText || (typeof image === "object" ? image.altText || "" : "");

  return (
    <div
      {...rest}
      className="flex h-20 w-full items-center justify-center px-2 md:h-24 md:px-3"
    >
      {/* biome-ignore lint/performance/noImgElement: Media logos should use their original SVG or transparent image URL without storefront image transformation. */}
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="block h-auto w-auto object-contain"
        style={{
          maxWidth: `${logoMaxWidth}px`,
          maxHeight: `${logoHeight}px`,
        }}
      />
    </div>
  );
}

export const schema = createSchema({
  title: "Logo",
  type: "logo-list-item",
  settings: [
    {
      group: "Logo",
      inputs: [
        {
          type: "image",
          name: "image",
          label: "Logo image",
        },
        {
          type: "text",
          name: "altText",
          label: "Alt text",
          helpText: "Describe the publication or brand logo.",
        },
        {
          type: "range",
          name: "logoHeight",
          label: "Maximum logo height",
          configs: {
            min: 24,
            max: 100,
            step: 2,
            unit: "px",
          },
          defaultValue: 54,
        },
        {
          type: "range",
          name: "logoMaxWidth",
          label: "Maximum logo width",
          configs: {
            min: 80,
            max: 260,
            step: 10,
            unit: "px",
          },
          defaultValue: 180,
        },
      ],
    },
  ],
});
