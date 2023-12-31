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
import { deleteApplication } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function DeleteApplication({
  token,
  applicationID,
}: {
  token: string;
  applicationID: string;
}) {
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
    toast({ description: data.message });
    router.push("/app/book");
  }, [token, applicationID]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Estas seguro que quieres eliminar esta aplicacion?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no puede ser desecha. Cada applicacion es importante
            para poder llevar un control adecuado de tu progreso.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
