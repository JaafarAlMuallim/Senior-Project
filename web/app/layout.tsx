import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/trpc/client";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <TRPCProvider>
          <body className={`${poppins.className} antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              <main className="dark:grainy-dark flex light:grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </body>
        </TRPCProvider>
      </ClerkProvider>
    </html>
  );
}
