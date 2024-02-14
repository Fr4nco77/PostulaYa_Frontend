"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Interview } from "@/lib/definitions";
import { Eye } from "lucide-react";

export function ViewInterview({ interview }: { interview: Interview }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-blue-200 text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-slate-50"
        >
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900">
            {interview.created_at.split("T")[0]}
          </DialogTitle>
          <DialogDescription className="grid grid-cols-2 items-center gap-1">
            <span>
              <strong>Entrevistador:</strong> {interview.interviewer}
            </span>
            <span>
              <strong>Duracion</strong> {interview.duration}
            </span>
            <span>
              <strong>Sensación</strong> {interview.feeling}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-2 ">
          <div className="flex w-full flex-col">
            <h3 className="text-xl font-extrabold">Preparación</h3>
            <Textarea
              disabled
              value={interview.preparation}
              className="disabled:cursor-text disabled:border-slate-600"
            />
          </div>
          <h3 className="text-xl font-extrabold">Preguntas/Actividades</h3>
          <Accordion type="single" collapsible>
            {interview.questions?.map((question, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      disabled
                      value={interview.answers[index]}
                      className="disabled:cursor-text disabled:border-slate-600"
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          <div className="flex w-full flex-col">
            <h3 className="text-xl font-extrabold">Feedback</h3>
            <Textarea
              disabled
              value={interview.feedback}
              className="disabled:cursor-text disabled:border-slate-600"
            />
          </div>
          <div className="flex w-full flex-col">
            <h3 className="text-xl font-extrabold">Observaciones</h3>
            <Textarea
              disabled
              value={interview.observation}
              className="disabled:cursor-text disabled:border-slate-600"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
