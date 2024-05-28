import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavBar } from "@/components/shared/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wordscapes Weekly",
  description: "Track weekly wordscapes tournament progress!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main
              className={cn(
                "flex flex-col justify-start items-center h-svh w-svw p-6 overflow-hidden"
              )}
            >
              <PageHeader />
              <NavBar />
              <ScrollArea className="w-full">{children}</ScrollArea>
            </main>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
