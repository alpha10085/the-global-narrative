export const layoutbody = `import { NextIntlClientProvider } from "next-intl";
import { ValidateLocale } from "@/i18n/request";
import config from "@/i18n/config";

export async function generateMetadata({ params }) {
  const { locale } = await params; 
  return {
    title: process.env.NEXT_PUBLIC_project_name,
    description: \`Welcome to \${process.env.NEXT_PUBLIC_project_name}\`,
    alternates: {
      canonical: \`\${process.env.NEXT_PUBLIC_client}/\${locale}\`,
      languages: config.locales?.reduce((acc, lang) => {
        acc[lang] = \`\${process.env.NEXT_PUBLIC_client}/\${lang}\`;
        return acc;
      }, {}),
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = (
    await import(\`../../i18n/locales/\${ValidateLocale(locale, true)}.json\`)
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
`;

export const pageBody = `import { redirect } from "next/navigation";
import config from "@/i18n/config";

export default function RootPage() {
  redirect(\`/\${config.defaultLocale}\`);
}
`;
