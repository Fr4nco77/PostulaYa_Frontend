import NavBar from "./navBar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex w-full flex-col">
      <NavBar className="w-full" />
      <section className="overflow-hidden pt-8 sm:pt-20 md:pt-24 lg:relative lg:pt-32">
        <div className="relative z-10 mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="relative z-[1]">
            <div>
              <div className="mt-6 sm:max-w-xl">
                <h1 className="relative text-4xl font-black tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
                  Transforma tu búsqueda laboral con PostulaYa
                </h1>
                <h2 className="relative mt-6 text-lg text-gray-500 sm:text-xl">
                  Descubre la plataforma que te brinda estadísticas claras,
                  organización eficiente y preparación estratégica para alcanzar
                  tu empleo soñado.
                </h2>
              </div>
              <Link
                href="/sign_up"
                className={buttonVariants({
                  className:
                    "mt-10 space-y-4 bg-yellow-400 text-slate-900 hover:bg-slate-900 hover:text-yellow-400",
                })}
              >
                Pruebalo 100% Gratis
              </Link>
            </div>
          </div>
        </div>
        <div className="sm:pl-6">
          <div className="z-20 pt-12 sm:relative sm:mt-12 sm:pt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-slate-100 lg:left-80 lg:right-0 lg:w-full"></div>
              <svg
                className="absolute right-1/2 top-8 -mr-3 lg:left-0 lg:m-0"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
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
            <div className="relative ml-auto pl-4 sm:max-w-4xl sm:px-0 lg:flex lg:h-full lg:max-w-none lg:items-center xl:pl-12">
              <Image
                className="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none 2xl:rounded-3xl"
                src="/landing_header.jpg"
                alt="PostulaYa"
                priority={true}
                width={1080}
                height={720}
              />
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
