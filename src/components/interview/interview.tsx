import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function Interview({ interview }: { interview: any }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex w-full cursor-pointer items-center justify-between hover:bg-slate-200">
          <div className="flex gap-3">
            <span>{interview.company}</span>
            <span>{interview.position}</span>
          </div>
          <span>{interview.created_at.split("T")[0]}</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-screen overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {`${interview.position} (${interview.company})`}
          </AlertDialogTitle>
          <AlertDialogDescription className="grid grid-cols-2 items-center">
            <span>{`Entrevistador: ${interview.interviewer}`}</span>
            <span>{`Entrevistado: ${interview.user.username}`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <span>{`Duracion: ${interview.duration}`}</span>
        <div className="flex w-full flex-col">
          <span>Preparacion</span>
          <p>{interview.preparation}</p>
        </div>
        <span>Preguntas/Actividades</span>
        <Accordion type="single" collapsible>
          {interview.questions?.map((question: string, index: number) => {
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{interview.answers[index]}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-900 text-slate-100">
            Cerrar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
