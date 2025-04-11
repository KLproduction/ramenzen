import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/react-query/provider";
import { ReduxProvider } from "@/redux/provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { LoginModal } from "@/components/auth/LoginModal";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ramenzen",
  description: "Ramen Zen Bristol",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ReactQueryProvider>
            <ReduxProvider>
              <NuqsAdapter>
                <Toaster />

                <LoginModal />
                {children}
                <Analytics />
              </NuqsAdapter>
            </ReduxProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
