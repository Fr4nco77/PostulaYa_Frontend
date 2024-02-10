import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import Form from "./form-editNote";
import { Note } from "@/lib/definitions";

interface EditProps extends Note {
  token: string;
}

export function EditNote({ _id, token, title, body, favorite }: EditProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 p-1 transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-4xl font-black text-slate-900">
            Editar Nota
          </DialogTitle>
        </DialogHeader>
        <Form
          _id={_id}
          token={token}
          title={title}
          body={body}
          favorite={favorite}
        />
      </DialogContent>
    </Dialog>
  );
}
