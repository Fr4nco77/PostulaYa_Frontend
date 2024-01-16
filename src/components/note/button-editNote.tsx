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
          className="h-7 w-7 rounded-full p-1 hover:bg-slate-200"
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Nota</DialogTitle>
        </DialogHeader>
        <Form _id={_id} token={token} title={title} body={body} favorite={favorite}/>
      </DialogContent>
    </Dialog>
  );
}
