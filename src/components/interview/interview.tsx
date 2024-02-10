import { FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

export default function Interview({ interview }: { interview: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="bg-yellow-400 text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
        >
          <FileText />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900">
            {interview.position}
          </DialogTitle>
          <Separator className="bg-slate-400" />
          <DialogDescription className="flex flex-col items-start gap-1 text-slate-900">
            <span>
              <strong>Empresa:</strong>
              {` ${interview.company}`}
            </span>
            <span>
              <strong>Entrevistador:</strong>
              {` ${interview.interviewer}`}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 items-center">
          <span>
            <strong>Fecha:</strong>
            {` ${interview.created_at.split("T")[0]}`}
          </span>
          <span>
            <strong>Duración:</strong>
            {` ${interview.duration}`}
          </span>
        </div>
        <div className="flex w-full flex-col">
          <strong>Preparación:</strong>
          <Textarea
            disabled
            value={interview.preparation}
            className="disabled:cursor-text disabled:border-slate-600"
          />
        </div>
        <strong>Preguntas/Actividades</strong>
        <Accordion type="single" collapsible>
          {interview.questions?.map((question: string, index: number) => {
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
        <DialogFooter>
          <span className="text-xs font-bold">
            <span className="text-red-600">*</span>La información presentada es
            de carácter referencial y puede estar sujeta a cambios.
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
