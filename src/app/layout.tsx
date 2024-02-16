import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s · PostulaYa",
    default: "PostulaYa",
  },
  description:
    "Optimiza tu búsqueda laboral con PostulaYa: registra postulaciones, analiza estadísticas y organiza tu historial profesional. Descubre una guía estratégica para avanzar hacia tu empleo soñado. ¡Inicia tu viaje hacia el éxito laboral con PostulaYa hoy mismo!",
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
        <SpeedInsights />
      </body>
    </html>
  );
}
