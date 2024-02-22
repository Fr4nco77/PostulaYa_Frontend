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

export default function CreateApplication({
  token,
  basicStyle,
}: {
  token: string;
  basicStyle: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {basicStyle ? (
          <Button
            variant="outline"
            className="bg-yellow-400 transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
          >
            <Plus />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="flex flex-grow bg-yellow-400 transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
          >
            <Plus className="mr-1" />
            Agregar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-md overflow-y-auto bg-slate-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900">
            Agregar postulación
          </DialogTitle>
          <DialogDescription>
            ¿Qué puedes contarnos acerca de ese trabajo?
          </DialogDescription>
        </DialogHeader>
        <Form token={token} />
      </DialogContent>
    </Dialog>
  );
}
