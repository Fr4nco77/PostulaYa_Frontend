import { Eye } from "lucide-react";
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
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function Interview({ interview }: { interview: any }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full text-slate-900 hover:bg-yellow-400"
        >
          <Eye />
        </Button>
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
        <div className="flex max-h-screen w-full flex-col gap-2 overflow-y-auto">
          <span>
            <strong>Duración</strong>
            {`: ${interview.duration}`}
          </span>
        </div>
        <div className="flex w-full flex-col">
          <h3 className="text-lg font-bold">Preparación</h3>
          <Textarea disabled value={interview.preparation} />
        </div>
        <h3 className="text-lg font-bold">Preguntas/Actividades</h3>
        <Accordion type="single" collapsible>
          {interview.questions?.map((question: string, index: number) => {
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>
                  <Textarea
                    disabled
                    value={interview.answers[index]}
                    className="resize-none border-none "
                  />
                </AccordionContent>
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
