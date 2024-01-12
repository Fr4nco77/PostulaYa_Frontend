import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eraser } from "lucide-react";
import Form from "./form-editNote";
import { Note } from "@/lib/definitions";

export function EditNote({ _id, title, body }: Note) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-200 h-7 w-7 p-1"
        >
          <Eraser />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Nota</DialogTitle>
        </DialogHeader>
        <Form _id={_id} title={title} body={body} />
      </DialogContent>
    </Dialog>
  );
}
