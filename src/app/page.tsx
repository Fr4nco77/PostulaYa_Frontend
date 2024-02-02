import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-x-hidden">
      <Header />
      <main
        id="¿PostulaYa?"
        className="w-full pt-12 sm:pt-20 md:pt-24 lg:pt-32"
      >
        <div className="relative isolate">
          <div className="absolute inset-y-0 -top-52 right-0 -z-10 transform-gpu overflow-hidden md:-top-40 lg:-top-56 lg:block">
            <svg width="233" height="189" fill="none" viewBox="0 0 233 189">
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              ></rect>
            </svg>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="relative text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Registra y analiza tus postulaciones
              </h3>
              <p className="relative mx-auto mt-6 max-w-7xl leading-8">
                PostulaYa te brinda la capacidad de evaluar tu progreso y tomar
                decisiones fundamentadas. Registra cada postulación con
                facilidad, analiza estadísticas clave y organiza meticulosamente
                un historial detallado de todas tus actividades en la búsqueda
                de empleo. Más que datos, PostulaYa te ofrece una guía
                estratégica para avanzar con confianza hacia tu empleo soñado.
                Descubre una nueva perspectiva en tu búsqueda laboral con
                PostulaYa.
              </p>
            </div>
          </div>
          <div className="absolute top-[calc(100%-20rem)] -z-10 hidden transform-gpu overflow-hidden md:block">
            <svg width="144" height="392" fill="none" viewBox="0 0 144 392">
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              ></rect>
            </svg>
          </div>
        </div>
      </main>
      <Features />
      <section className="relative pt-12 sm:pt-20 md:pt-24 lg:pt-32">
        <div className="block">
          <div className="absolute inset-y-0 left-0 mb-12 w-1/2 rounded-r-3xl bg-slate-100"></div>
          <svg
            className="absolute left-1/2 top-8 -ml-3"
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
            data-v-8e1e3ad5=""
          >
            <defs data-v-8e1e3ad5="">
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                data-v-8e1e3ad5=""
              >
                <rect
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  className="text-gray-200"
                  fill="currentColor"
                  data-v-8e1e3ad5=""
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="392"
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
              data-v-8e1e3ad5=""
            ></rect>
          </svg>
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-10 sm:px-12 sm:py-20">
            <div className="relative">
              <div className="mt-6 sm:mt-12 sm:text-center">
                <h2 className="relative text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:mx-auto md:max-w-4xl md:text-5xl md:leading-tight">
                  Potencia Tu Futuro Profesional con PostulaYa
                </h2>
                <p className="relative mx-auto mt-6 max-w-2xl italic text-gray-700 sm:text-lg">
                  Haz que tu búsqueda laboral sea más efectiva hoy mismo con
                  PostulaYa. Regístrate ahora y descubre un camino estratégico
                  hacia tu empleo soñado. Transforma tu carrera con estadísticas
                  claras, organización eficiente y preparación asertiva. ¡No
                  pierdas más tiempo, inicia tu viaje hacia el éxito laboral!
                </p>
              </div>
              <div className="relative mt-6 flex flex-col items-center sm:mx-auto sm:mt-12 sm:max-w-lg">
                <Link
                  href="/sign_up"
                  className={buttonVariants({
                    className:
                      "bg-yellow-400 text-slate-900 hover:bg-slate-900 hover:text-yellow-400",
                  })}
                >
                  Empieza Ahora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
