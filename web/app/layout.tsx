import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { TRPCProvider } from "@/trpc/client";
import StreamClientProvider from "@/components/StreamProvider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "EduLink",
  description:
    "EduLink | Your one-stop solution for all your educational needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // @ts-ignore
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <TRPCProvider>
          <body className={`${poppins.className} antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {/*@ts-ignore*/}
              <main className="dark:grainy-dark flex light:grainy-light flex-col min-h-[calc(100vh)]">
                {children}
              </main>
              <Toaster />
            </ThemeProvider>
          </body>
        </TRPCProvider>
      </html>
    </ClerkProvider>
  );
}
