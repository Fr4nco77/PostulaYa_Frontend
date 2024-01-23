import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skills } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { HTMLAttributes } from "react";
import Form from "./form-editSkills";

interface EditSkillsProps extends HTMLAttributes<HTMLButtonElement> {
  token: string;
  skills: Skills;
  applicationID: string;
}

export default function EditSkills({
  className,
  token,
  skills,
  applicationID,
  ...props
}: EditSkillsProps) {
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
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar Habilidades</DialogTitle>
          <DialogDescription>¿Algo ha cambiado?</DialogDescription>
        </DialogHeader>
        <Form
          token={token}
          applicationID={applicationID}
          currentSkills={skills}
        />
      </DialogContent>
    </Dialog>
  );
}
