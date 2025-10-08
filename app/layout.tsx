import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/themeProvider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Lancer",
  description: "Professional freelancer's customer management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className="lg:dark:bg-[url('../lib/assets/bg.svg')] lg:bg-[url('../lib/assets/bg-light.svg')] dark:bg-[url('../lib/assets/bg-mobile.svg')] bg-[url('../lib/assets/bg-light-mobile.svg')] text-[#000000c5] dark:text-white bg-cover min-h-[100dvh]">
        <main className="min-h-[100dvh] lg:flex-row flex-col flex">
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
