import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import FormCreateInterview from "./form-create";

export default function CreateInterview({
  token,
  application,
  position,
  company,
}: {
  token: string;
  application: string;
  position: string;
  company: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-yellow-400 hover:bg-yellow-300">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Registrar Entrevista</DialogTitle>
          <DialogDescription>
            Por favor tomate este tiempo para registrar todo lo que paso, esta
            informacion te sera de gran utilidad, no te guardes ningun detalle.
          </DialogDescription>
        </DialogHeader>
        <FormCreateInterview
          token={token}
          application={application}
          position={position}
          company={company}
        />
      </DialogContent>
    </Dialog>
  );
}
