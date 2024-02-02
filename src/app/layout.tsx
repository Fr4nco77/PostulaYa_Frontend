import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s · PostulaYa",
    default: "PostulaYa",
  },
  description:
    "Optimiza tu búsqueda laboral con PostulaYa: registra postulaciones, analiza estadísticas y organiza tu historial profesional. Una guía estratégica para avanzar hacia tu empleo soñado. ¡Descubre más con PostulaYa!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${inter.className} scroll-smooth bg-slate-50`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
