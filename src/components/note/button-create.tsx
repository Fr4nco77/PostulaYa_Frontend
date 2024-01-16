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
          className={cn("bg-yellow-400 hover:bg-yellow-300", className)}
          {...props}
        >
          <Plus className="mr-1"/>
          <span>Crear Nota</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Crear Nota</DialogTitle>
          <DialogDescription>¿Que no deberias olvidar?</DialogDescription>
        </DialogHeader>
        <Form token={token} />
      </DialogContent>
    </Dialog>
  );
}
