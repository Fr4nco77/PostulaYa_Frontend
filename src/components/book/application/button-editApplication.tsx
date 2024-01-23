import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form-editApplication";
import { Application } from "@/lib/definitions";
import { Pencil } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface EditApplicationProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
  application: Application;
}

export default function EditApplication({
  className,
  token,
  application,
  ...props
}: EditApplicationProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "rounded-2xl text-slate-900 hover:bg-slate-200",
            className,
          )}
          {...props}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Editar Postulacion</DialogTitle>
          <DialogDescription>¿Que ha cambiado?</DialogDescription>
        </DialogHeader>
        <Form token={token} application={application} />
      </DialogContent>
    </Dialog>
  );
}
