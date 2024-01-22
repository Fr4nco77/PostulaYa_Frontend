"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
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
import { addSkill, createApplication } from "@/lib/actions/application";
import { useToast } from "../ui/use-toast";
import { Errors, Skills } from "@/lib/definitions";
import ErrorMessage from "../ui/error-message";
import { ButtonSubmit } from "../ui/button-submit";

export default function Form({ token }: { token: string }) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [skills, setSkills] = useState<Skills>([]);

  const addSkills = async () => {
    const inputValue = inputRef.current!.value.trim();
    setIsLoading(true);

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
    setIsLoading(false);
  };

  const removeSkill = useCallback(
    (_id: string) => {
      const skillsFiltered = skills.filter((obj) => obj._id !== _id);
      setSkills(skillsFiltered);
    },
    [skills],
  );

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const rawFormData = Object.fromEntries(formData.entries());
      const skillsIds = skills?.map((obj) => obj._id);

      const { errors, success, data } = await createApplication({
        rawFormData,
        skills: skillsIds,
        token,
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
    },
    [skills],
  );

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
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="company" className="text-right">
          Empresa
        </Label>
        <Input
          id="company"
          name="company"
          placeholder="Dream Company S.A"
          className="col-span-3"
        />
      </div>
      <input type="hidden" name="category" value="IT" />
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="location" className="text-right">
          Ubicacion
        </Label>
        <Input
          id="location"
          name="location"
          placeholder="Francia"
          className="col-span-3"
        />
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
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="url" className="text-right">
          Enlace a postulacion
        </Label>
        <Input
          id="url"
          name="url"
          placeholder="https://listofJobs/jobs/13192898319"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="modality" className="text-right">
          Modalidad
        </Label>
        <div id="modality" className="col-span-3">
          <Select name="modality">
            <SelectTrigger>
              <SelectValue placeholder="¿Cómo se llevará a cabo?" />
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
          <Select name="type">
            <SelectTrigger>
              <SelectValue placeholder="¿Cuanto tiempo te exige?" />
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
          <Select name="platform">
            <SelectTrigger>
              <SelectValue placeholder="¿Cual usaste?" />
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
        <Label htmlFor="skill" className="text-right">
          Habilidades necesarias
        </Label>
        <div className="col-span-3 flex gap-2">
          <Input
            id="skill"
            ref={inputRef}
            placeholder="NextJs"
            aria-describedby="skill-error"
          />
          <Button
            size={"icon"}
            type="button"
            onClick={addSkills}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills?.map(({ _id, name }) => (
          <Badge id={_id} key={_id} onClick={() => removeSkill(_id)}>
            {`${name}`}
            <X width={17} height={17} />
          </Badge>
        ))}
      </div>
      <ErrorMessage errors={errors?.skills} errorKey="skill" />
      <ButtonSubmit>Agregar</ButtonSubmit>
    </form>
  );
}
