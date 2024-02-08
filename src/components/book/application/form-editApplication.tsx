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
      title: data.message,
    });
  }, []);

  return (
    <form action={handleUpdate} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="position"
          className={`text-right ${errors?.position && "text-red-500"}`}
        >
          Posicion
        </Label>
        <Input
          id="position"
          name="position"
          defaultValue={application.position}
          className={`col-span-3 ${errors?.position && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="status"
          className={`text-right ${errors?.status && "text-red-500"}`}
        >
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
        <Label
          htmlFor="company"
          className={`text-right ${errors?.company && "text-red-500"}`}
        >
          Empresa
        </Label>
        <Input
          id="company"
          name="company"
          defaultValue={application.company}
          className={`col-span-3 ${errors?.company && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="location"
          className={`text-right ${errors?.location && "text-red-500"}`}
        >
          Ubicación
        </Label>
        <Input
          id="location"
          name="location"
          defaultValue={application.location}
          className={`col-span-3 ${errors?.location && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="recluter"
          className={`text-right ${errors?.recluter && "text-red-500"}`}
        >
          Reclutador
        </Label>
        <Input
          id="recluter"
          name="recluter"
          defaultValue={application.recluter}
          className={`col-span-3 ${errors?.recluter && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="category"
          className={`text-right ${errors?.category && "text-red-500"}`}
        >
          Rubro
        </Label>
        <div id="category" className="col-span-3">
          <Select defaultValue={application.category} name="category">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tecnología e Informática">
                Tecnología e Informática
              </SelectItem>
              <SelectItem value="Salud y Ciencias Médicas">
                Salud y Ciencias Médicas
              </SelectItem>
              <SelectItem value="Marketing y Publicidad">
                Marketing y Publicidad
              </SelectItem>
              <SelectItem value="Educación">Educación</SelectItem>
              <SelectItem value="Finanzas y Contabilidad">
                Finanzas y Contabilidad
              </SelectItem>
              <SelectItem value="Ingeniería y Construcción">
                Ingeniería y Construcción
              </SelectItem>
              <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
              <SelectItem value="Servicios al Cliente">
                Atención al Cliente
              </SelectItem>
              <SelectItem value="Gastronomía y Hospitalidad">
                Gastronomía y Hostelería
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="modality"
          className={`text-right ${errors?.modality && "text-red-500"}`}
        >
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
        <Label
          htmlFor="type"
          className={`text-right ${errors?.type && "text-red-500"}`}
        >
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
        <Label
          htmlFor="platform"
          className={`text-right ${errors?.platform && "text-red-500"}`}
        >
          Plataforma de Postulación
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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="url"
          className={`text-right ${errors?.url && "text-red-500"}`}
        >
          Enlace a postulación
        </Label>
        <Input
          id="url"
          name="url"
          defaultValue={application.url}
          className={`col-span-3 ${errors?.url && "border-red-500"}`}
        />
      </div>
      <ErrorMessage
        errors={errors?.position || errors?.url}
        errorKey="position"
      />
      <ButtonSubmit>Editar Postulación</ButtonSubmit>
    </form>
  );
}
