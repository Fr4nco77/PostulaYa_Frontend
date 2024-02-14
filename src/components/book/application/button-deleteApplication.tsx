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
import { deleteApplication } from "@/lib/actions/application";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useCallback } from "react";

interface DeleteApplicationProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
  applicationID: string;
}

export function DeleteApplication({
  className,
  token,
  applicationID,
  ...props
}: DeleteApplicationProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    const { success, data } = await deleteApplication({ token, applicationID });

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }
    router.push("/app/book");
  }, [router, toast, token, applicationID]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "text-slate-900 transition duration-300 hover:bg-red-600",
            className,
          )}
          {...props}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-black text-slate-900">
            ¿Seguro que quieres eliminar esta postulación?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tus postulaciones son valiosas y contribuyen a evaluar y potenciar
            tu progreso profesional. Ten en cuenta que eliminar esta postulación
            podría afectar tu historial y estadísticas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-500"
            onClick={handleDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
