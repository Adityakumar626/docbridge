import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "DocBridge",
  description: "Intelligent document analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen">
          <ThemeProvider>
            <SmoothCursor />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
