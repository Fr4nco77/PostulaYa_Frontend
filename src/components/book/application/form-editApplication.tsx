"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addSkill } from "@/lib/actions/application";
import { updateApplication } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Application, Errors, Skills } from "@/lib/definitions";
import ErrorMessage from "@/components/ui/error-message";

export default function Form({
  token,
  application,
}: {
  token: string;
  application: Application;
}) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [skills, setSkills] = useState<Skills>(application.skills);

  const addSkills = async () => {
    const inputValue = inputRef.current!.value.trim();

    if (inputValue) {
      const { skill, error } = await addSkill(inputValue);

      if (error) {
        const { title, name } = error;
        toast({
          variant: "destructive",
          title,
          description: name,
        });
      } else {
        const existingSkill = skills.find(
          (obj) => obj._id === skill._id && obj.name === skill.name,
        );

        if (!existingSkill) {
          setSkills((prevState) => [...prevState, skill]);
        }
      }
      inputRef.current!.value = "";
    }
  };

  const removeSkill = useCallback(
    (_id: string) => {
      const skillsFiltered = skills.filter((obj) => obj._id !== _id);
      setSkills(skillsFiltered);
    },
    [skills],
  );

  const handleUpdate = useCallback(
    async (formData: FormData) => {
      const rawFormData = Object.fromEntries(formData.entries());
      const skillsIds = skills?.map((obj) => obj._id);
      setIsLoading(true);

      const { errors, success, data } = await updateApplication({
        rawFormData,
        skills: skillsIds,
        token,
        applicationID: application._id,
      });
      setErrors(errors);
      setIsLoading(false);

      if (!success) {
        return toast({
          variant: "destructive",
          title: data.name,
          description: data.message,
        });
      }

      toast({
        title: data.name,
        description: data.message,
      });
    },
    [skills],
  );

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
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="status" className="text-right">
          Estado
        </Label>
        <div id="status">
          <Select
            defaultValue={application.status}
            name="status"
            disabled={isLoading}
          >
            <SelectTrigger className="w-40">
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
        <Label htmlFor="modality" className="text-right">
          Modalidad
        </Label>
        <div id="modality">
          <Select
            defaultValue={application.modality}
            name="modality"
            disabled={isLoading}
          >
            <SelectTrigger className="w-40">
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
        <div id="type">
          <Select
            defaultValue={application.type}
            disabled={isLoading}
            name="type"
          >
            <SelectTrigger className="w-40">
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
        <Label htmlFor="recluter" className="text-right">
          Reclutador
        </Label>
        <Input
          id="recluter"
          name="recluter"
          defaultValue={application.recluter}
          className="col-span-3"
          disabled={isLoading}
        />
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
          disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="platform" className="text-right">
          Plataforma de Postulacion
        </Label>
        <div id="platform">
          <Select name="platform" defaultValue={application.platform} disabled={isLoading}>
            <SelectTrigger className="w-40">
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
        <Label htmlFor="url" className="text-right">
          Enlace a postulacion
        </Label>
        <Input
          id="url"
          name="url"
          defaultValue={application.url}
          className="col-span-3"
          disabled={isLoading}
        />
      </div>
      <ErrorMessage errors={errors?.url} errorKey="url" />
      <div className="flex items-center gap-4">
        <Label htmlFor="skill" className="text-right">
          Habilidades necesarias
        </Label>
        <Input
          id="skill"
          ref={inputRef}
          placeholder="NextJs"
          disabled={isLoading}
        />
        <Button
          size={"icon"}
          type="button"
          onClick={addSkills}
          disabled={isLoading}
        >
          <Plus />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills?.map(({ _id, name }) => (
          <Badge
            id={_id}
            key={_id}
            onClick={() => removeSkill(_id)}
          >{`${name}`}</Badge>
        ))}
      </div>
      <ErrorMessage errors={errors?.skills} errorKey="skill" />
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Editar postulacion
      </Button>
    </form>
  );
}
