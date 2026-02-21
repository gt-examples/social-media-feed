import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { GTProvider } from "gt-next";
import { getGT, getLocale } from "gt-next/server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const gt = await getGT();
  const locale = await getLocale();
  return {
    title: gt("Social Feed - General Translation Example"),
    description: gt(
      "A social media feed example application demonstrating internationalization with General Translation."
    ),
    openGraph: {
      title: gt("Social Feed - General Translation Example"),
      description: gt(
        "A social media feed example application demonstrating internationalization with General Translation."
      ),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: gt("Social Feed - General Translation Example"),
      description: gt(
        "A social media feed example application demonstrating internationalization with General Translation."
      ),
    },
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        fr: "/fr",
        ja: "/ja",
        zh: "/zh",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased`}>
        <GTProvider>
          {children}
        </GTProvider>
      </body>
    </html>
  );
}
