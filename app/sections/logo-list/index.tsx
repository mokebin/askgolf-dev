/*
 * 标题、Swiper、每屏数量、箭头和间距。
 */

import { createSchema, type HydrogenComponentProps } from "@weaverse/hydrogen";
import clsx from "clsx";
import { type CSSProperties, useId } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SectionProps } from "~/components/section";
import { layoutInputs, Section } from "~/components/section";

export interface LogoListProps extends SectionProps, HydrogenComponentProps {
  heading?: string;
  headingAlignment?: "left" | "center" | "right";
  headingSpacing?: number;
  gap?: number;
  mobileItems?: number;
  tabletItems?: number;
  desktopItems?: number;
  showArrows?: boolean;
  loop?: boolean;
}

export default function LogoList(props: LogoListProps) {
  const {
    heading = "As Seen In",
    headingAlignment = "center",
    headingSpacing = 32,
    gap = 32,
    mobileItems = 2,
    tabletItems = 4,
    desktopItems = 6,
    showArrows = true,
    loop = false,
    children = [],
    ...rest
  } = props;

  const id = useId().replace(/:/g, "");
  const previousButtonClass = `logo-list-prev-${id}`;
  const nextButtonClass = `logo-list-next-${id}`;

  const canLoop = loop && children.length > desktopItems;

  const swiperStyle = {
    "--logo-list-mobile-width": `calc((100% - ${
      gap * (mobileItems - 1)
    }px) / ${mobileItems})`,
    "--logo-list-tablet-width": `calc((100% - ${
      gap * (tabletItems - 1)
    }px) / ${tabletItems})`,
    "--logo-list-desktop-width": `calc((100% - ${
      gap * (desktopItems - 1)
    }px) / ${desktopItems})`,
  } as CSSProperties;

  const headingAlignmentClasses = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  return (
    <Section {...rest}>
      <div className="w-full">
        <div
          className={clsx(
            "relative flex min-h-10 items-center",
            headingAlignmentClasses[headingAlignment],
          )}
          style={{
            marginBottom: heading ? `${headingSpacing}px` : 0,
          }}
        >
          {heading ? (
            <h2 className="text-2xl font-medium tracking-normal text-black md:text-3xl">
              {heading}
            </h2>
          ) : null}

          {showArrows ? (
            <div className="absolute right-0 hidden items-center gap-2 lg:flex">
              <button
                type="button"
                className={clsx(
                  previousButtonClass,
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "border border-gray-200 bg-white text-black",
                  "transition-colors hover:bg-gray-100",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                )}
                aria-label="Previous logos"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="m15 18-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className={clsx(
                  nextButtonClass,
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "border border-gray-200 bg-white text-black",
                  "transition-colors hover:bg-gray-100",
                  "disabled:cursor-not-allowed disabled:opacity-30",
                )}
                aria-label="Next logos"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="m9 18 6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <style>{`
          .logo-list-swiper .swiper-wrapper {
            display: flex;
          }

          .logo-list-swiper .swiper-slide {
            flex-shrink: 0;
            width: var(--logo-list-mobile-width);
          }

          @media (min-width: 768px) {
            .logo-list-swiper .swiper-slide {
              width: var(--logo-list-tablet-width);
            }
          }

          @media (min-width: 1024px) {
            .logo-list-swiper .swiper-slide {
              width: var(--logo-list-desktop-width);
            }
          }
        `}</style>

        <Swiper
          className="logo-list-swiper"
          style={swiperStyle}
          modules={showArrows ? [Navigation] : []}
          slidesPerView="auto"
          spaceBetween={gap}
          loop={canLoop}
          watchOverflow
          grabCursor
          observer
          observeParents
          navigation={
            showArrows
              ? {
                  prevEl: `.${previousButtonClass}`,
                  nextEl: `.${nextButtonClass}`,
                }
              : false
          }
        >
          {children.map((child, index) => (
            <SwiperSlide key={index} className="h-auto">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Logo list",
  type: "logo-list",
  childTypes: ["logo-list-item"],
  settings: [
    {
      group: "Logo list",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "As Seen In",
        },
        {
          type: "select",
          name: "headingAlignment",
          label: "Heading alignment",
          configs: {
            options: [
              {
                label: "Left",
                value: "left",
              },
              {
                label: "Center",
                value: "center",
              },
              {
                label: "Right",
                value: "right",
              },
            ],
          },
          defaultValue: "center",
        },
        {
          type: "range",
          name: "headingSpacing",
          label: "Space below heading",
          configs: {
            min: 0,
            max: 100,
            step: 4,
            unit: "px",
          },
          defaultValue: 32,
        },
        {
          type: "range",
          name: "gap",
          label: "Gap",
          configs: {
            min: 8,
            max: 80,
            step: 4,
            unit: "px",
          },
          defaultValue: 32,
        },
        {
          type: "range",
          name: "mobileItems",
          label: "Logos per view on mobile",
          configs: {
            min: 1,
            max: 3,
            step: 1,
          },
          defaultValue: 2,
        },
        {
          type: "range",
          name: "tabletItems",
          label: "Logos per view on tablet",
          configs: {
            min: 2,
            max: 5,
            step: 1,
          },
          defaultValue: 4,
        },
        {
          type: "range",
          name: "desktopItems",
          label: "Logos per view on desktop",
          configs: {
            min: 3,
            max: 8,
            step: 1,
          },
          defaultValue: 6,
        },
        {
          type: "switch",
          name: "showArrows",
          label: "Show desktop arrows",
          defaultValue: true,
        },
        {
          type: "switch",
          name: "loop",
          label: "Loop",
          defaultValue: false,
        },
      ],
    },
    {
      group: "Layout",
      inputs: layoutInputs,
    },
  ],
  presets: {
    heading: "As Seen In",
    headingAlignment: "center",
    headingSpacing: 32,
    gap: 32,
    mobileItems: 2,
    tabletItems: 4,
    desktopItems: 6,
    showArrows: true,
    loop: false,
    children: [
      {
        type: "logo-list-item",
      },
      {
        type: "logo-list-item",
      },
      {
        type: "logo-list-item",
      },
      {
        type: "logo-list-item",
      },
      {
        type: "logo-list-item",
      },
      {
        type: "logo-list-item",
      },
    ],
  },
});
