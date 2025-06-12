import NextAuthSessionProviders from "@/providers/NextAuthSessionProviders";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Provider as ReactBalancerProvider } from "react-wrap-balancer";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventz",
  description: "Eventz brings together clubs and events LPU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn("h-dvh w-full overflow-hidden")}>
        <NextAuthSessionProviders>
          <ThemeProvider defaultTheme="light">
            <ReactBalancerProvider>
              {children}
              <Toaster />
            </ReactBalancerProvider>
          </ThemeProvider>
        </NextAuthSessionProviders>
      </body>
    </html>
  );
}
