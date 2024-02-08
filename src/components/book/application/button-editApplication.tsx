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
            "text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-yellow-400",
            className,
          )}
          {...props}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-md overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900">
            Editar Postulación
          </DialogTitle>
          <DialogDescription>¿Que ha cambiado?</DialogDescription>
        </DialogHeader>
        <Form token={token} application={application} />
      </DialogContent>
    </Dialog>
  );
}
