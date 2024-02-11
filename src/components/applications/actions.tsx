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
import Link from "next/link";
import { useCallback, useRef } from "react";
import { useToast } from "../ui/use-toast";
import { createApplication } from "@/lib/actions/application";
import { Application } from "@/lib/definitions";
import { ExternalLink, MoreHorizontal, Zap } from "lucide-react";

export default function Actions({
  token,
  application,
}: {
  token: string;
  application: Application;
}) {
  const { toast } = useToast();
  const dropdownTriggerRef = useRef<any>(null);

  const handleRegister = useCallback(async () => {
    const { skills, ...props } = application;

    const { success, data } = await createApplication({
      rawFormData: props,
      skills: skills.map((skill) => skill._id),
      token,
    });

    if (!success) {
      toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    } else {
      toast({ variant: "warning", title: data.message });
    }
  }, [toast, token, application]);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none" ref={dropdownTriggerRef}>
          <MoreHorizontal />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5}>
          <DropdownMenuItem className="cursor-pointer text-slate-900 transition duration-300 focus:bg-slate-900 focus:text-yellow-400">
            <Link
              href={application.url}
              target="_blank"
              className="flex w-full items-center justify-center"
            >
              <span className="text-sm font-semibold">PostulaYa</span>
              <ExternalLink className="ml-1 max-h-5 w-auto" />
            </Link>
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="flex w-full cursor-pointer items-center justify-center text-slate-900 transition duration-300 focus:bg-emerald-100 focus:text-emerald-500">
              <Zap className="mr-1 max-h-5 w-auto" />
              <span className="text-sm font-semibold">Registrar</span>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent
        className="bg-slate-50"
        onCloseAutoFocus={(event) => {
          // focus dropdown trigger for accessibility so user doesn't lose their place in the document
          dropdownTriggerRef.current.focus();
          event.preventDefault();
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="flex">
            <Zap className="mr-1 h-full max-h-10 w-auto text-emerald-500" />
            <span className="text-4xl font-black text-slate-900">
              Registro Express
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            ¿Ya postulaste? Eleva tu eficiencia y potencia tus oportunidades al
            máximo. Con el Registro Express, cada postulación se integra a tu
            bitácora personal, brindándote un seguimiento detallado y
            simplificando tu camino hacia el éxito laboral.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-emerald-100 text-emerald-500 transition duration-300 hover:bg-emerald-500 hover:text-emerald-100"
            onClick={handleRegister}
          >
            Registrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
