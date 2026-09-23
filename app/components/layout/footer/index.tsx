import { useThemeSettings } from "@weaverse/hydrogen";
import { cva } from "class-variance-authority";
import { useLegacyThemeText } from "~/hooks/use-legacy-theme-text";
import type { ThemeSettings } from "~/types/weaverse";
import { cn } from "~/utils/cn";
import { FooterCountrySelector } from "../country-selector/footer-country-selector";
import { FooterMenu } from "../menu/footer-menu";
import { PaymentMethods } from "./payment-methods";
import { SocialLinks } from "./social-links";

const footerVariants = cva("", {
  variants: {
    width: {
      full: "",
      stretch: "",
      fixed: "mx-auto max-w-(--page-width)",
    },
    padding: {
      full: "",
      stretch: "px-3 md:px-10 lg:px-16",
      fixed: "mx-auto px-3 md:px-4 lg:px-6",
    },
  },
});

export function Footer() {
  const themeText = useLegacyThemeText();

  const {
    footerWidth,
    socialFacebook,
    socialInstagram,
    socialLinkedIn,
    socialX,
    showPaymentMethods,
    showAmazonPay,
    showPayPal,
    showKlarna,
    showGooglePay,
    showApplePay,
    showJCB,
    showAmericanExpress,
    showVisa,
    showMastercard,
    showDiners,
    showDiscover,
    showAlipay,
    footerShippingTitle,
    footerShippingProvider,
  } = useThemeSettings<ThemeSettings>();

  const copyright =
    themeText("footer.copyright") ||
    `${new Date().getFullYear()} ASK ECHO GOLF. All Rights Reserved.`;

  const shippingTitle = footerShippingTitle || "Safe & Fast Shipping";

  const shippingProvider = footerShippingProvider || "Fast delivery";

  return (
    <footer
      className={cn(
        "w-full bg-(--color-footer-bg) pt-8 text-(--color-footer-text)",
        "lg:pt-10",
        footerVariants({ padding: footerWidth }),
      )}
    >
      <div className={cn("w-full", footerVariants({ width: footerWidth }))}>
        <div
          className={cn(
            "grid w-full gap-8 border-b border-line-subtle pb-8",
            "lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10 lg:pb-10",
          )}
        >
          <FooterMenu />

          <aside className="flex flex-col gap-6">
            <div>
              <h3 className="mb-4 text-sm font-medium">Follow Us</h3>

              <SocialLinks
                socialInstagram={socialInstagram}
                socialX={socialX}
                socialLinkedIn={socialLinkedIn}
                socialFacebook={socialFacebook}
              />
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium">100% Safe Payment</h3>

              <PaymentMethods
                showPaymentMethods={showPaymentMethods}
                showAmazonPay={showAmazonPay}
                showPayPal={showPayPal}
                showKlarna={showKlarna}
                showGooglePay={showGooglePay}
                showApplePay={showApplePay}
                showJCB={showJCB}
                showAmericanExpress={showAmericanExpress}
                showVisa={showVisa}
                showMastercard={showMastercard}
                showDiners={showDiners}
                showDiscover={showDiscover}
                showAlipay={showAlipay}
              />
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">{shippingTitle}</h3>
              <p className="text-xs opacity-80">{shippingProvider}</p>
            </div>
          </aside>
        </div>

        <div
          className={cn(
            "flex flex-col gap-5 py-6 text-sm",
            "lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center",
          )}
        >
          <div className="order-1 lg:order-3 lg:justify-self-end">
            <FooterCountrySelector />
          </div>

          <p className="order-2 text-xs opacity-80 lg:order-2 lg:text-center">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
