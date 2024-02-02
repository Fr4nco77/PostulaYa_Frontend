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
  }, [interview, application]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "rounded-2xl text-slate-900 hover:bg-red-600",
            className,
          )}
          {...props}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Quieres eliminar esta entrevista?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ten en cuenta que las entrevistas son fundamentales para medir tu
            progreso y son de gran utilidad para la comunidad
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600" onClick={handleDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
