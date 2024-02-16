import Image from "next/image";

export default function Features() {
  return (
    <section
      id="Caracteristicas"
      className="relative pt-12 sm:pt-20 md:pt-24 lg:pt-32"
    >
      <div className="lg:mx-auto lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-6 xl:gap-12 2xl:gap-24">
        <div className="mx-auto max-w-xl space-y-6 px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:px-0 lg:py-28 lg:pr-8 xl:py-32 2xl:mx-0">
          <h3 className="relative text-4xl font-extrabold tracking-tight text-gray-900">
            Gestiona y potencia tu búsqueda
          </h3>
          <p className="relative mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Obtén una visión clara y precisa de tu progreso a través de nuestro
            completo panel de control. Accede a estadísticas esenciales que
            abarcan desde tus postulaciones diarias hasta la frecuencia de
            entrevistas, pasando por el tiempo promedio de respuesta y valiosas
            sugerencias de aprendizaje, entre otros aspectos.
          </p>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
          <div className="pr-4 sm:ml-48 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:flex lg:h-full lg:items-center lg:px-0">
            <Image
              src="/dashboard.png"
              width={1080}
              height={720}
              priority
              className="3xl:max-w-3xl ml-auto max-h-screen w-auto rounded-r-2xl object-contain lg:right-0 2xl:max-h-[44rem] 2xl:max-w-2xl 2xl:rounded-2xl"
              alt="Visualización de Estadísticas Clave de Postulaciones Diarias y Tiempo de Respuesta"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-20 md:mt-24 lg:mx-auto lg:mt-0 lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-6 xl:mt-28 xl:gap-12 2xl:gap-24">
        <div className="mx-auto max-w-xl space-y-6 px-4 sm:px-6 lg:mx-auto lg:max-w-3xl lg:py-28 xl:py-32 xl:pl-12 2xl:mx-0 2xl:justify-self-end 2xl:pl-20">
          <h3 className="relative text-4xl font-extrabold tracking-tight text-gray-900">
            Organiza tus postulaciones
          </h3>
          <p className="relative mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Explora nuestra Bitácora para registrar, buscar y organizar
            eficientemente tus postulaciones. Mantén un seguimiento detallado de
            las empresas a las que has aplicado y lleva un registro organizado
            de tus actividades en la búsqueda laboral. En PostulaYa, la Bitácora
            es tu aliada para mantener el control y avanzar con confianza hacia
            el empleo soñado.
          </p>
        </div>
        <div className="preview-menu-wrapper relative mt-12 sm:mt-16 lg:mt-0">
          <div className="pl-4 sm:-mr-6 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:flex lg:h-full lg:items-center lg:px-0">
            <Image
              src="/book.png"
              width={1080}
              height={720}
              className="3xl:max-w-3xl mr-auto max-h-screen w-auto  rounded-l-2xl object-contain lg:left-0 2xl:max-h-[44rem] 2xl:max-w-2xl 2xl:rounded-2xl"
              alt="Bitácora de Postulaciones: Registra y Organiza Eficientemente tus Postulaciones"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-20 md:mt-24 lg:mx-auto lg:mt-0 lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-6 xl:mt-28 xl:gap-12 2xl:gap-24">
        <div className="mx-auto max-w-xl space-y-6 px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:px-0 lg:py-28 lg:pr-8 xl:py-32 2xl:mx-0">
          <h3 className="relative text-4xl font-extrabold tracking-tight text-gray-900">
            Escribe tu trayectoria
          </h3>
          <p className="relative mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Con la función de creacion de Notas, captura ideas, reflexiones y
            recordatorios clave. Personaliza tu espacio y utiliza tus
            pensamientos para impulsar tu éxito laboral.
          </p>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
          <div className="pr-4 sm:ml-48 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:flex lg:h-full lg:items-center lg:px-0">
            <Image
              src="/notes.png"
              width={1080}
              height={720}
              className="3xl:max-w-3xl ml-auto max-h-screen w-auto rounded-r-2xl object-contain lg:right-0 2xl:max-h-[44rem] 2xl:max-w-2xl 2xl:rounded-2xl"
              alt="Creación de Notas en PostulaYa: Captura Ideas y Reflexiones para Impulsar tu Éxito Laboral"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-20 md:mt-24 lg:mx-auto lg:mt-0 lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-6 xl:mt-28 xl:gap-12 2xl:gap-24">
        <div className="mx-auto max-w-xl space-y-6 px-4 sm:px-6 lg:mx-auto lg:max-w-3xl lg:py-28 xl:py-32 xl:pl-12 2xl:mx-0 2xl:justify-self-end 2xl:pl-20">
          <h3 className="relative text-4xl font-extrabold tracking-tight text-gray-900">
            Encuentra tu próxima oportunidad
          </h3>
          <p className="relative mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Explora oportunidades laborales diariamente. Nuestra sección de
            vacantes te conecta con oportunidades agregadas por la comunidad,
            brindándote acceso a una variedad de opciones que se actualizan
            constantemente.
          </p>
        </div>
        <div className="preview-menu-wrapper relative mt-12 sm:mt-16 lg:mt-0">
          <div className="pl-4 sm:-mr-6 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:flex lg:h-full lg:items-center lg:px-0">
            <Image
              src="/vacancies.png"
              width={1080}
              height={720}
              className="3xl:max-w-3xl mr-auto max-h-screen w-auto  rounded-l-2xl object-contain lg:left-0 2xl:max-h-[44rem] 2xl:max-w-2xl 2xl:rounded-2xl"
              alt="Exploración de Vacantes en PostulaYa: Conéctate con Oportunidades Laborales Constantemente Actualizadas"
            />
          </div>
        </div>
      </div>
      <div className="mt-12 sm:mt-20 md:mt-24 lg:mx-auto lg:mt-0 lg:grid lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-6 xl:mt-28 xl:gap-12 2xl:gap-24">
        <div className="mx-auto max-w-xl space-y-6 px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:px-0 lg:py-28 lg:pr-8 xl:py-32 2xl:mx-0">
          <h3 className="relative text-4xl font-extrabold tracking-tight text-gray-900">
            Preparate estratégicamente
          </h3>
          <p className="relative mt-4 text-lg leading-relaxed text-gray-500 sm:text-xl">
            Prepárate como un profesional. En la sección de entrevistas, accede
            a una lista detallada de entrevistas realizadas por nuestra
            comunidad. Esta funcionalidad única te permite revisar preguntas
            frecuentes hechas por empresas específicas para prepararte de manera
            asertiva.
          </p>
        </div>
        <div className="relative mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
          <div className="pr-4 sm:ml-48 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:flex lg:h-full lg:items-center lg:px-0">
            <Image
              src="/interviews.png"
              width={1080}
              height={720}
              className="3xl:max-w-3xl ml-auto max-h-screen w-auto rounded-r-2xl object-contain lg:right-0 2xl:max-h-[44rem] 2xl:max-w-2xl 2xl:rounded-2xl"
              alt="Sección de Entrevistas en PostulaYa: Revisa Preguntas Frecuentes para una Preparación Asertiva"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
