"use client";

import Interview from "./interview";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";
import { Interview as interview } from "@/lib/definitions";
import { Button } from "../ui/button";
import { FileInput } from "lucide-react";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import clsx from "clsx";
import { Separator } from "../ui/separator";

export default function Interviews({ data }: { data: any }) {
  const [selectedInterview, setSelectedInterview] = useState<interview | null>(
    null,
  );

  const handleInterviewClick = (interviewData: interview | null) => {
    setSelectedInterview(interviewData);
  };

  const { interviews } = data.response;
  return (
    <main className="flex h-full w-full justify-center md:justify-between lg:max-h-[500px] xl:max-h-[515px]">
      <div className="flex w-full lg:w-1/2">
        {!data.response.interviews.length ? (
          <div className="flex w-full max-w-7xl grow flex-col items-center justify-center rounded-lg bg-slate-100 p-3 shadow-xl">
            <h1 className="text-2xl font-bold">
              No se encontraron coincidencias
            </h1>
            <span>
              ¡De momento no hay nada por aquí, pero pronto algo aparecera!
            </span>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  colSpan={5}
                  className="cursor-default rounded-tl-lg rounded-tr-lg bg-slate-100 py-4 text-3xl font-black text-slate-900 md:text-4xl"
                >
                  Entrevistas
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews?.map((interview: any) => {
                return (
                  <TableRow key={interview._id}>
                    <TableCell className="max-w-[115px] truncate">
                      {interview.position}
                    </TableCell>
                    <TableCell className="max-w-[115px] truncate">
                      {interview.company}
                    </TableCell>
                    <TableCell className="text-center lg:hidden">
                      <Interview interview={interview} />
                    </TableCell>
                    <TableCell className="hidden text-center lg:block">
                      <Button
                        size="icon"
                        className="bg-yellow-400 text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
                        onClick={() => handleInterviewClick(interview)}
                      >
                        <FileInput />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <div
        className={clsx(
          "hidden w-5/12 flex-col gap-3 overflow-y-auto rounded-lg border border-slate-400 p-5 lg:flex ",
          {
            "items-center justify-center border-dashed": !selectedInterview,
            "border-solid bg-slate-100 shadow-xl": selectedInterview,
          },
        )}
      >
        {selectedInterview ? (
          <>
            <h4 className="text-3xl font-black text-slate-900">
              {selectedInterview.position}
            </h4>
            <Separator className="bg-slate-400" />
            <span>
              <strong>Empresa:</strong>
              {` ${selectedInterview.company}`}
            </span>
            <span>
              <strong>Entrevistador:</strong>
              {` ${selectedInterview.interviewer}`}
            </span>
            <div className="grid grid-cols-2 items-center">
              <span>
                <strong>Fecha:</strong>
                {` ${selectedInterview.created_at.split("T")[0]}`}
              </span>
              <span>
                <strong>Duración:</strong>
                {` ${selectedInterview.duration}`}
              </span>
            </div>
            <div className="flex w-full flex-col">
              <strong>Preparación:</strong>
              <Textarea
                disabled
                value={selectedInterview.preparation}
                className="disabled:cursor-text disabled:border-slate-600"
              />
            </div>
            <strong>Preguntas/Actividades</strong>
            <div>
              <Accordion type="single" collapsible>
                {selectedInterview.questions.map(
                  (question: string, index: number) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{question}</AccordionTrigger>
                      <AccordionContent>
                        <Textarea
                          disabled
                          value={selectedInterview.answers[index]}
                          className="disabled:cursor-text disabled:border-slate-600"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ),
                )}
              </Accordion>
            </div>
            <span className="text-xs font-bold">
              <span className="text-red-600">*</span>La información presentada
              es de carácter referencial y puede estar sujeta a cambios.
            </span>
          </>
        ) : (
          <Image
            src="/Logo.svg"
            alt="Logo de PostulaYa"
            priority
            width={250}
            height={76.13}
          />
        )}
      </div>
    </main>
  );
}
