import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 flex flex-col items-center justify-evenly gap-3 bg-gray-900 px-3 py-3 text-center text-sm text-slate-50 sm:mt-20 md:mt-24 md:flex-row">
      <span>
        Hecho por{" "}
        <Link
          href="https://www.linkedin.com/in/franco-carreras-b7a1a4268/"
          target="_blank"
          className="group relative inline-block cursor-pointer text-yellow-400"
        >
          <span className="relative text-sm font-semibold">
            fr4nco77
            <span className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-x-0 transform bg-yellow-400 transition-transform duration-300 group-hover:scale-x-100"></span>
          </span>
        </Link>
        . © 2024 PostulaYa | Todos los derechos reservados.
      </span>
      <span>
        ¿Consultas? Escríbenos a{" "}
        <span className="text-sm font-semibold text-yellow-400">
          postulaya@outlook.com
        </span>
      </span>
    </footer>
  );
}
