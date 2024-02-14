"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteInterview } from "@/lib/actions/interview";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";

interface DeleteInterviewProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
  interview: string;
  application: string;
}

export function DeleteInterview({
  className,
  token,
  interview,
  application,
  ...props
}: DeleteInterviewProps) {
  const { toast } = useToast();

  const handleDelete = useCallback(async () => {
    const { success, data } = await deleteInterview({
      token,
      interview,
      application,
    });

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ variant: "warning", title: data.message });
  }, [interview, application, toast, token]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className={cn(
            "bg-red-200 text-red-600 transition duration-300 hover:bg-red-500 hover:text-slate-50",
            className,
          )}
          {...props}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-black text-slate-900">
            ¿Quieres eliminar esta entrevista?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Considera que las entrevistas desempeñan un papel fundamental en la
            evaluación y fortalecimiento de tu búsqueda laboral, y son de gran
            utilidad tanto para tu desarrollo profesional como para la comunidad
            en general.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-200 text-red-600 transition duration-300 hover:bg-red-500 hover:text-slate-50"
            onClick={handleDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
