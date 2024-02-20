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
import {
  categoryNames,
  categoryValues,
  modalitysNames,
  modalitysValues,
  platformValues,
  statusNames,
  statusValues,
  workdaysNames,
  workdaysValues,
} from "@/lib/dataComponents";

export default function Form({
  token,
  application,
}: {
  token: string;
  application: Application;
}) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Errors>({});

  const handleUpdate = useCallback(
    async (formData: FormData) => {
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
        variant: "success",
        title: data.message,
      });
    },
    [application._id, toast, token],
  );

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
              {statusNames.map((status, index) => {
                if (!index) return;

                return (
                  <SelectItem key={status} value={statusValues[index]}>
                    {status}
                  </SelectItem>
                );
              })}
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
              {categoryNames.map((category, index) => {
                if (!index) return;
                return (
                  <SelectItem key={category} value={categoryValues[index]}>
                    {category}
                  </SelectItem>
                );
              })}
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
              {modalitysNames.map((modality, index) => {
                if (!index) return;
                return (
                  <SelectItem key={modality} value={modalitysValues[index]}>
                    {modality}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="workday"
          className={`text-right ${errors?.workday && "text-red-500"}`}
        >
          Jornada
        </Label>
        <div id="workday" className="col-span-3">
          <Select defaultValue={application.workday} name="workday">
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {workdaysNames.map((workday, index) => {
                if (!index) return;
                return (
                  <SelectItem key={workday} value={workdaysValues[index]}>
                    {workday}
                  </SelectItem>
                );
              })}
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
              {platformValues.map((platform, index) => {
                return (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                );
              })}
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
