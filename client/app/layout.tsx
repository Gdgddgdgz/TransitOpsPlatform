import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { AppQueryProvider } from "@/lib/query-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransitOps — Smart Transport Operations Platform",
  description: "Centralized fleet, driver, dispatch, maintenance and expense management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    signInUrl="/auth/sign-in"
      signUpUrl="/auth/sign-up"
      afterSignOutUrl="/auth/sign-in"
    >
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppQueryProvider>{children}</AppQueryProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
