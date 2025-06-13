import "@/config/styles"; // one single import now
import ReactQuery from "@/contexts/reactQuery";
import { AuthProvider } from "@/contexts/AuthProvider";
import { ErrorBoundary } from "@/contexts/ErrorBoundryCTX/ErrorBoundryCTX";
import { NextIntlClientProvider } from "next-intl";
import DevToolsWrapper from "@/_DevTools/DevToolsWrapper";
import defualtMetadata from "@/config/metadata";
import { prepareLayoutContext } from "./helpers";
import { ViewTransitions } from "next-view-transitions";
export const metadata = defualtMetadata.metadata;
export const viewport = defualtMetadata.viewport;

export default async function RootLayout({ children }) {
  const {
    boundary,
    allFonts = "",
    dir,
    locale,
    messages,
    selectedFont,
  } = await prepareLayoutContext();
  return (
    <ReactQuery>
      <ViewTransitions>
        <html lang={locale} dir={dir}>
          <body className={`${allFonts}   ${selectedFont.className}`}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DevToolsWrapper>
                <ErrorBoundary boundary={boundary}>
                  <AuthProvider locale={locale}>{children}</AuthProvider>
                </ErrorBoundary>
              </DevToolsWrapper>
            </NextIntlClientProvider>
          </body>
        </html>
      </ViewTransitions>
    </ReactQuery>
  );
}
