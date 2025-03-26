import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Calenda",
  description: "Event Planning Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="bg-white shadow-md p-4">

            <nav className="container mx-auto flex justify-between items-center">

              <Link href="/" className="text-xl font-bold text-blue-600">Calenda</Link>
              
              <div className="space-x-4">
                <Link href="/collection" className="hover:underline">Events</Link>
                <Link href="/admin" className="hover:underline">Admin</Link>
              </div>

            </nav>
          </header>

          <main className="container mx-auto p-6">{children}</main>

          <footer className="bg-white border-t mt-12 p-4 text-center text-sm text-gray-500">

            &copy; {new Date().getFullYear()} Calenda. All rights reserved.
          </footer>
        </body>
    </html>
  );
}