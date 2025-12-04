import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/userContext";
import { SocketProvider } from "@/contexts/socketContext";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digital Queue Management",
  description: "Webapp for queue management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <UserProvider>
          <Header />
          <main className="flex-1">
            <SocketProvider>{children}</SocketProvider>
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
