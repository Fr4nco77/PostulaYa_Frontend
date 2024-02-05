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

export default function CreateApplication({ token }: { token: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-grow bg-yellow-400 hover:bg-slate-900 hover:text-yellow-400"
        >
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-50 max-h-screen overflow-y-auto max-w-md">
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
