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
        <Button variant="outline" className="bg-yellow-400 hover:bg-yellow-300">
          Agregar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Agregar Postulacion</DialogTitle>
          <DialogDescription>
            ¿Que puedes contarnos acerca de ese trebajo?
          </DialogDescription>
        </DialogHeader>
        <Form token={token} />
      </DialogContent>
    </Dialog>
  );
}
