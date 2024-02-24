import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form-create";
import { Plus } from "lucide-react";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonCreateProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
}

export default function ButtonCreate({
  className,
  token,
  ...props
}: ButtonCreateProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className={cn(
            "bg-yellow-400 transition duration-300 hover:bg-slate-900 hover:text-yellow-400",
            className,
          )}
          {...props}
        >
          <Plus className="mr-1" />
          <span>Crear Nota</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-4xl font-black text-slate-900">Crear Nota</DialogTitle>
          <DialogDescription>¿Qué no deberías olvidar?</DialogDescription>
        </DialogHeader>
        <Form token={token} />
      </DialogContent>
    </Dialog>
  );
}
