import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { Icon } from "~/components/icon";
import Link from "~/components/link";
import { RevealUnderline } from "~/components/reveal-underline";
import { useShopMenu } from "~/hooks/use-shop-menu";
import type { SingleMenuItem } from "~/types/menu";

function MenuLink({
  to,
  title,
  isExternal,
}: {
  to: string;
  title: string;
  isExternal?: boolean;
}) {
  return (
    <Link
      to={to}
      className="group relative flex items-center gap-2 text-sm text-(--color-footer-text) opacity-80 transition-opacity hover:opacity-100"
    >
      <RevealUnderline className="[--underline-color:var(--color-footer-text)]">
        {title}
      </RevealUnderline>

      {isExternal ? <span className="text-sm opacity-70">↗</span> : null}
    </Link>
  );
}

function MenuLinks({ items }: { items: SingleMenuItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <MenuLink
          key={item.id}
          to={item.to}
          title={item.title}
          isExternal={item.isExternal}
        />
      ))}
    </div>
  );
}

export function FooterMenu() {
  const { footerMenu } = useShopMenu();
  const items = footerMenu.items as unknown as SingleMenuItem[];

  return (
    <>
      {/* Mobile accordion */}
      <Accordion.Root
        type="multiple"
        defaultValue={[]}
        className="w-full lg:hidden"
      >
        {items.map(({ id, title, items: childItems }) => (
          <Accordion.Item
            key={id}
            value={id}
            className="border-b border-white/20 last:border-b-0"
          >
            <Accordion.Trigger
              className={clsx(
                "group flex w-full items-center justify-between",
                "py-5 text-left text-base font-medium",
                "text-(--color-footer-text)",
              )}
            >
              <span>{title}</span>

              <Icon
                name="caret-right"
                className={clsx(
                  "h-4 w-4 rotate-90 transition-transform duration-200",
                  "group-data-[state=open]:-rotate-90",
                )}
              />
            </Accordion.Trigger>

            <Accordion.Content
              className={clsx(
                "[--collapse-from:var(--radix-accordion-content-height)]",
                "[--expand-to:var(--radix-accordion-content-height)]",
                "overflow-hidden",
                "data-[state=closed]:animate-collapse",
                "data-[state=open]:animate-expand",
              )}
            >
              <div className="pb-5">
                <MenuLinks items={childItems} />
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>

      {/* Desktop expanded menu */}
      <div className="hidden w-full grid-cols-4 gap-8 lg:grid">
        {items.map(({ id, to, title, items: childItems }) => (
          <div key={id} className="flex flex-col gap-6">
            <h4 className="text-base font-medium text-(--color-footer-text)">
              {["#", "/"].includes(to) ? title : <Link to={to}>{title}</Link>}
            </h4>

            <MenuLinks items={childItems} />
          </div>
        ))}
      </div>
    </>
  );
}
