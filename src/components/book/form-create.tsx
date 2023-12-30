"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { addSkill, createApplication } from "@/lib/actions";
import { useToast } from "../ui/use-toast";
import { Errors, Skills } from "@/lib/definitions";
import ErrorMessage from "../ui/error-message";

export default function Form({ token }: { token: string }) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [skills, setSkills] = useState<Skills>([]);

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
          (obj) => obj.id === skill.id && obj.name === skill.name,
        );

        if (!existingSkill) {
          setSkills((prevState) => [...prevState, skill]);
        }
      }
      inputRef.current!.value = "";
    }
  };

  const removeSkill = useCallback(
    (id: string) => {
      const skillsFiltered = skills.filter((obj) => obj.id !== id);
      setSkills(skillsFiltered);
    },
    [skills],
  );

  const handleSubmit = useCallback(async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    const skillsIds = skills?.map((obj) => obj.id);
    setIsLoading(true);
    
    const { errors, success, data } = await createApplication({
      rawFormData,
      skills: skillsIds,
      token,
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
  }, []);

  return (
    <form action={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="position" className="text-right">
          Posicion
        </Label>
        <Input
          id="position"
          name="position"
          placeholder="Full-Stack Developer"
          className="col-span-3"
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="modality" className="text-right">
          Modalidad
        </Label>
        <div id="modality">
          <Select name="modality" disabled={isLoading}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Presencial">Presencial</SelectItem>
              <SelectItem value="Remoto">Remoto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type" className="text-right">
          Tipo
        </Label>
        <div id="type">
          <Select disabled={isLoading} name="type">
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
          {"Reclutador (opcional)"}
        </Label>
        <Input
          id="recluter"
          name="recluter"
          placeholder="Pedro Duarte"
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
          placeholder="Dream Company S.A"
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
          placeholder="Francia"
          className="col-span-3"
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="url" className="text-right">
          {"Enlace a postulacion (opcional)"}
        </Label>
        <Input
          id="url"
          name="url"
          placeholder="https://listofJobs/jobs/13192898319"
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
        {skills?.map(({ id, name }) => (
          <Badge
            id={id}
            key={id}
            onClick={() => removeSkill(id)}
          >{`${name}`}</Badge>
        ))}
      </div>
      <ErrorMessage errors={errors?.skills} errorKey="skill" />
      <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Agregar
        postulacion
      </Button>
    </form>
  );
}
