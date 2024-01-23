"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";

export default function Questions_Answers() {
  const [questions, setQuestions] = useState([{ id: 1 }]);

  const addQuestion = useCallback(() => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { id: prevQuestions.length + Math.random() + Math.random() },
    ]);
  }, []);

  const removeQuestion = useCallback((idToRemove: number) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== idToRemove),
    );
  }, []);

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex w-full items-center justify-between">
        <h3>Preguntas/Actividades de la entrevista</h3>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="rounded-full text-gray-500 hover:bg-transparent"
          onClick={addQuestion}
        >
          <Plus />
        </Button>
      </div>
      {questions.map((question) => (
        <div key={question.id} className="mb-4 flex w-full flex-col">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`question-${question.id}`} className="text-right">
              Pregunta
            </Label>
            <div className="col-span-3 flex items-center">
              <Input
                id={`question-${question.id}`}
                name={`question-${question.id}`}
                placeholder="¿Cual es tu ultimo proyecto?"
                aria-describedby="questions-error"
              />
              {questions.length !== 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-500 hover:bg-transparent"
                  onClick={() => removeQuestion(question.id)}
                >
                  <Trash2 />
                </Button>
              )}
            </div>
            <Label htmlFor={`answer-${question.id}`} className="text-right">
              Respuesta
            </Label>
            <Textarea
              id={`answer-${question.id}`}
              name={`answer-${question.id}`}
              placeholder="Ingrese la respuesta"
              className="col-span-3 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
