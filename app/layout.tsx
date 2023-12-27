import { GeistSans } from "geist/font/sans";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { UserContextProvider } from "@/Context/userContext";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/themeProvider";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      // className={cn(
      //   "min-h-screen bg-background font-sans antialiased",
      //   fontSans.variable
      // )}
    >
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex items-center">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserContextProvider>
              <Nav />
              {children}
            </UserContextProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
