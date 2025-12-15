import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Relogio from "./components/Relogio";

const data = new Date();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEISI Shop",
  description: "Loja criada com Next.js e Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        {/* HEADER */}
        <header className="bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-xl font-bold">DEISI Shop</h1>

            <nav className="flex flex-wrap gap-4 text-sm">
              <Link className="hover:text-blue-400" href="/">
                Intro
              </Link>
              <Link className="hover:text-blue-400" href="/sobre">
                Sobre
              </Link>
              <Link className="hover:text-blue-400" href="/tecnologias">
                Tecnologias
              </Link>
              <Link className="hover:text-blue-400" href="/projetos">
                Projetos
              </Link>
              <Link className="hover:text-blue-400" href="/caracteristicas">
                Características
              </Link>
              <Link className="hover:text-blue-400" href="/contador">
                Contador
              </Link>
              <Link className="hover:text-blue-400" href="/produtos">
                Produtos
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1 bg-gray-100">
          <div className="max-w-7xl mx-auto p-6">{children}</div>
        </main>

        {/* FOOTER */}
        <footer className="bg-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
            <span>
              DIW {data.getFullYear()} — DEISI Shop
            </span>
            <Relogio />
          </div>
        </footer>
      </body>
    </html>
  );
}
