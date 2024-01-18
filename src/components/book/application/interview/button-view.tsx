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
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { HTMLAttributes } from "react";

interface InterviewProps extends HTMLAttributes<HTMLButtonElement> {
  interviewer: string;
  duration: string;
  preparation: string;
  feeling: string;
  questions: string[];
  answers: string[];
  feedback: string;
  observation: string;
  likes: string[];
  created_at: string;
}

export function ViewInterview({
  className,
  interviewer,
  duration,
  preparation,
  feeling,
  questions,
  answers,
  feedback,
  observation,
  likes,
  created_at,
  ...props
}: InterviewProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "rounded-2xl text-slate-900 hover:bg-slate-200",
            className,
          )}
          {...props}
        >
          <Eye />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-h-screen overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Entrevista del {created_at.split("T")[0]}
          </AlertDialogTitle>
          <AlertDialogDescription className="grid grid-cols-2 items-center">
            <span>{`Entrevistador: ${interviewer}`}</span>
            <span>{`Duracion: ${duration}`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex w-full flex-col gap-2">
          <span>{`Sensacion: ${feeling}`}</span>
          <span>Preparacion</span>
          <p>{preparation}</p>
          <h3>Preguntas/Actividades</h3>
          <Accordion type="single" collapsible>
            {questions?.map((question, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answers[index]}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <span>Feedback</span>
          <p>{feedback}</p>
          <span>Observaciones</span>
          <p>{observation}</p>
          <span>{`Agradecimientos: ${likes}`}</span>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
