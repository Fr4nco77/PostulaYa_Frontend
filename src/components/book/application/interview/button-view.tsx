"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Interview } from "@/lib/definitions";
import { Eye } from "lucide-react";

export function ViewInterview({ interview }: { interview: Interview }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-2xl text-slate-900 hover:bg-slate-200"
        >
          <Eye />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-screen overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Entrevista del {interview.created_at.split("T")[0]}
          </AlertDialogTitle>
          <AlertDialogDescription className="grid grid-cols-2 items-center">
            <span>{`Entrevistador: ${interview.interviewer}`}</span>
            <span>{`Duracion: ${interview.duration}`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex max-h-screen w-full flex-col gap-2 overflow-y-auto">
          <span>
            <strong>Sensación</strong>
            {`: ${interview.feeling}`}
          </span>
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Preparación</h3>
            <Textarea disabled value={interview.preparation} />
          </div>
          <h3 className="text-lg font-bold">Preguntas/Actividades</h3>
          <Accordion type="single" collapsible>
            {interview.questions?.map((question, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>
                    {interview.answers[index]}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Feedback</h3>
            <Textarea disabled value={interview.feedback} />
          </div>
          <div className="flex w-full flex-col">
            <h3 className="text-lg font-bold">Observaciones</h3>
            <Textarea disabled value={interview.observation} />
          </div>
          {/* <span>{`Agradecimientos: ${interview.likes}`}</span> */}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
