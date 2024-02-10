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
import {
  categoryNames,
  categoryValues,
  modalitysNames,
  modalitysValues,
  platformValues,
  workdaysNames,
  workdaysValues,
} from "@/lib/dataComponents";

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
        title: data.message,
      });
    },
    [toast, token, skills],
  );

  return (
    <form action={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="position"
          className={`text-right ${errors?.position && "text-red-500"}`}
        >
          Posición
        </Label>
        <Input
          id="position"
          name="position"
          placeholder="Full-Stack Developer"
          className={`col-span-3 ${errors?.position && "border-red-500"}`}
        />
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
          placeholder="Dream Company S.A"
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
          placeholder="Francia"
          className={`col-span-3 ${errors?.location && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="recluter"
          className={`text-right ${errors?.recluter && "text-red-500"}`}
        >
          {"Reclutador (opcional)"}
        </Label>
        <Input
          id="recluter"
          name="recluter"
          placeholder="Gabriela Rodríguez"
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
          <Select name="category">
            <SelectTrigger>
              <SelectValue placeholder="¿Cual es el sector?" />
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
          <Select name="modality">
            <SelectTrigger>
              <SelectValue placeholder="¿Cómo se llevará a cabo?" />
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
          className={`text-right ${errors?.type && "text-red-500"}`}
        >
          Jornada
        </Label>
        <div id="workday" className="col-span-3">
          <Select name="workday">
            <SelectTrigger>
              <SelectValue placeholder="¿Cuanto tiempo te exige?" />
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
          Plataforma de Postulacion
        </Label>
        <div id="platform" className="col-span-3">
          <Select name="platform">
            <SelectTrigger>
              <SelectValue placeholder="¿Cual usaste?" />
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
          Enlace a postulacion
        </Label>
        <Input
          id="url"
          name="url"
          placeholder="https://www.empleo.com/postulacion"
          className={`col-span-3 ${errors?.url && "border-red-500"}`}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label
          htmlFor="skill"
          className={`text-right ${errors?.skills && "text-red-500"}`}
        >
          Habilidades necesarias
        </Label>
        <div className="col-span-3 flex gap-2">
          <Input
            id="skill"
            ref={inputRef}
            placeholder="React"
            aria-describedby="skill-error"
            className={errors?.skills && "border-red-500"}
          />
          <Button
            size={"icon"}
            type="button"
            onClick={addSkills}
            disabled={isLoading}
            className="transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Plus />}
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {skills?.map(({ _id, name }) => (
          <Badge
            id={_id}
            key={_id}
            onClick={() => removeSkill(_id)}
            className="cursor-pointer transition duration-300 hover:bg-slate-900 hover:text-yellow-400"
          >
            {`${name}`}
            <X width={17} height={17} />
          </Badge>
        ))}
      </div>
      <ErrorMessage
        errors={errors?.position || errors?.skills}
        errorKey="skill"
      />
      <ButtonSubmit>Agregar</ButtonSubmit>
    </form>
  );
}
