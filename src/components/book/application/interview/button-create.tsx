import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormCreateInterview from "./form-create";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CreateProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
  application: string;
  position: string;
  company: string;
}

export default function CreateInterview({
  className,
  token,
  application,
  position,
  company,
  ...props
}: CreateProps) {
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
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Registrar Entrevista</DialogTitle>
          <DialogDescription>
            Por favor tomate este tiempo para registrar todo lo que paso, esta
            informacion te sera de gran utilidad.
          </DialogDescription>
        </DialogHeader>
        <FormCreateInterview
          token={token}
          application={application}
          position={position}
          company={company}
        />
      </DialogContent>
    </Dialog>
  );
}
