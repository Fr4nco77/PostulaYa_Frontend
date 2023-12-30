"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Eye, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { useToast } from "../ui/use-toast";
import { deleteApplication } from "@/lib/actions";

export default function Actions({
  token,
  applicationID,
}: {
  token: string;
  applicationID: string;
}) {
  const { toast } = useToast();
  const dropdownTriggerRef = useRef(null);

  const handlerDelete = useCallback(async () => {
    const { data, success } = await deleteApplication({ token, applicationID });
    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }
    toast({
      description: data.message,
    });
  }, []);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none" ref={dropdownTriggerRef}>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem>
            <Link
              href={`/app/${applicationID}`}
              className="flex items-start justify-start"
            >
              <Eye className="mr-2 h-5 w-5" />
              <span>Ver</span>
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-5 w-5" /> Eliminar
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent
        onCloseAutoFocus={(event) => {
          // focus dropdown trigger for accessibility so user doesn't lose their place in the document
          dropdownTriggerRef.current.focus();
          event.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Quieres eliminar esta postulacion?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta accion no puede ser desecha. Cada postulacion es imporatante
            para medir tu progreso y fortalecerlo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handlerDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
