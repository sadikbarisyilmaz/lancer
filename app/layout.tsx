import { GeistSans } from "geist/font/sans";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themeProvider";
import type { Metadata } from "next";
// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Lancer",
//   // description: "The fastest way to build apps with Next.js and Supabase",
// };

export const metadata: Metadata = {
  title: "Lancer",
  description: "...",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="md:dark:bg-[url('../lib/assets/bg.svg')] md:bg-[url('../lib/assets/bg-light.svg')] dark:bg-[url('../lib/assets/bg-mobile.svg')] bg-[url('../lib/assets/bg-light-mobile.svg')] text-foreground bg-cover ">
        <main className="min-h-screen md:flex-row flex-col flex">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
