import { createSchema } from "@weaverse/hydrogen";
import type { ReactNode } from "react";
import type { SectionProps } from "~/components/section";
import { layoutInputs, Section } from "~/components/section";

interface CategoryGridProps extends SectionProps {
  heading?: string;
  gap?: number;
}

export default function CategoryGrid(props: CategoryGridProps) {
  const {
    heading = "Shop by Categories",
    gap = 4,
    children = [],
    ...rest
  } = props;

  const categoryChildren = (
    Array.isArray(children) ? children : children ? [children] : []
  ) as ReactNode[];
  return (
    <Section {...rest}>
      <div className="w-full">
        {heading ? (
          <h2 className="mb-6 text-center text-2xl font-medium tracking-tight text-black md:mb-8 md:text-3xl">
            {heading}
          </h2>
        ) : null}

        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gap: `${gap}px`,
          }}
        >
          {categoryChildren.map((child, index) => (
            <div key={index} className="min-w-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export const schema = createSchema({
  title: "Category grid",
  type: "category-grid",
  childTypes: ["category-grid-item"],
  settings: [
    {
      group: "Category grid",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Shop by Categories",
        },
        {
          type: "range",
          name: "gap",
          label: "Gap between cards",
          configs: {
            min: 0,
            max: 24,
            step: 2,
            unit: "px",
          },
          defaultValue: 4,
        },
      ],
    },
    {
      group: "Layout",
      inputs: layoutInputs,
    },
  ],
  presets: {
    heading: "Shop by Categories",
    gap: 4,
    children: [
      {
        type: "category-grid-item",
        title: "Golf Balls",
      },
      {
        type: "category-grid-item",
        title: "Golf Clubs",
      },
      {
        type: "category-grid-item",
        title: "Apparel",
      },
      {
        type: "category-grid-item",
        title: "Gear",
      },
    ],
  },
});
