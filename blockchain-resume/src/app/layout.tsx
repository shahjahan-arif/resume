import type { Metadata } from "next";
import { Inter, Space_Mono, Orbitron } from "next/font/google";
import { WalletContextProvider } from "@/contexts/WalletContext";
import "./globals.css";
import "./enhanced-styles.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blockchain Resume | Professional Profile",
  description: "A modern blockchain-themed digital resume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceMono.variable} ${orbitron.variable} antialiased`}
      >
        <WalletContextProvider>
          {children}
        </WalletContextProvider>
      </body>
    </html>
  );
}
