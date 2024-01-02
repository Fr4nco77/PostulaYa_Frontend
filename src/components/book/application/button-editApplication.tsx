import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form-editApplication";
import { Application } from "@/lib/definitions";

export default function EditApplication({
  token,
  application,
}: {
  token: string;
  application: Application;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar Postulacion</DialogTitle>
          <DialogDescription>¿Que ha cambiado?</DialogDescription>
        </DialogHeader>
        <Form token={token} application={application} />
      </DialogContent>
    </Dialog>
  );
}
