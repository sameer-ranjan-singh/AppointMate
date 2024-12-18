import type { Metadata } from "next";
import localFont from "next/font/local";
import {Inter} from "next/font/google"
import "./globals.css";
import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { CreateEventDrawer } from "@/components/create-event";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({subsets: ["latin"]})
export const metadata: Metadata = {
  title: "AppointMate",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
     <html lang="en">
      <body className={inter.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Header/>
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
         {children}
        </main>
        <footer className="bg-blue-100 py-12">
          <div className="container mx-auto px-4 text-center text-gray-800">
            <p>Made by Sameer</p>
          </div>
        </footer>
        <CreateEventDrawer/>
      </body>
     </html>
    </ClerkProvider>
  );
}
