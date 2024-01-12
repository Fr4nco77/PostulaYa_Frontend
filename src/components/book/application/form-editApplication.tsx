"use client";

import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateApplication } from "@/lib/actions/application";
import { useToast } from "@/components/ui/use-toast";
import { Application, Errors } from "@/lib/definitions";
import ErrorMessage from "@/components/ui/error-message";
import { ButtonSubmit } from "@/components/ui/button-submit";

export default function Form({
  token,
  application,
}: {
  token: string;
  application: Application;
}) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleUpdate = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());

    const { errors, success, data } = await updateApplication({
      rawFormData,
      token,
      applicationID: application._id,
    });
    setErrors(errors);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({
      variant: "warning",
      title: data.name,
      description: data.message,
    });
  }, []);

  return (
    <form action={handleUpdate} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="position" className="text-right">
          Posicion
        </Label>
        <Input
          id="position"
          name="position"
          defaultValue={application.position}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Estado
        </Label>
        <div id="status" className="col-span-3">
          <Select defaultValue={application.status} name="status">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Postulado">Postulado</SelectItem>
              <SelectItem value="En Proceso">En Proceso</SelectItem>
              <SelectItem value="Finalizado">Finalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company_name" className="text-right">
          Empresa
        </Label>
        <Input
          id="company_name"
          name="company_name"
          defaultValue={application.company_name}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company_ubication" className="text-right">
          Ubicacion
        </Label>
        <Input
          id="company_ubication"
          name="company_ubication"
          defaultValue={application.company_ubication}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="recluter" className="text-right">
          Reclutador
        </Label>
        <Input
          id="recluter"
          name="recluter"
          defaultValue={application.recluter}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="url" className="text-right">
          Enlace a postulacion
        </Label>
        <Input
          id="url"
          name="url"
          defaultValue={application.url}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="modality" className="text-right">
          Modalidad
        </Label>
        <div id="modality" className="col-span-3">
          <Select defaultValue={application.modality} name="modality">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Presencial">Presencial</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
              <SelectItem value="Hibrido">Hibrido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Tipo
        </Label>
        <div id="type" className="col-span-3">
          <Select defaultValue={application.type} name="type">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-Time">Full-Time</SelectItem>
              <SelectItem value="Part-Time">Part-Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="platform" className="text-right">
          Plataforma de Postulacion
        </Label>
        <div id="platform" className="col-span-3">
          <Select name="platform" defaultValue={application.platform}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Linkedin">Linkedin</SelectItem>
              <SelectItem value="Indeed">Indeed</SelectItem>
              <SelectItem value="Glassdoor">Glassdoor</SelectItem>
              <SelectItem value="Get on Board">Get on Board</SelectItem>
              <SelectItem value="Computrabajo">Computrabajo</SelectItem>
              <SelectItem value="Otra">Otra</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ErrorMessage errors={errors?.url} errorKey="url" />
      <ButtonSubmit>Editar Postulacion</ButtonSubmit>
    </form>
  );
}
