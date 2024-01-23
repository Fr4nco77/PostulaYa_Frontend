"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonSubmit } from "@/components/ui/button-submit";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { addSkill, updateSkills } from "@/lib/actions/application";
import { Errors, Skills } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Loader2, Plus, X } from "lucide-react";
import React, { HTMLAttributes, useRef, useState } from "react";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  token: string;
  applicationID: string;
  currentSkills: Skills;
}

export default function Form({
  className,
  token,
  applicationID,
  currentSkills,
  ...props
}: FormProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [skills, setSkills] = useState<Skills>(currentSkills);
  const [errors, setErrors] = useState<Errors>({});

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

  const removeSkill = (_id: string) => {
    const skillsFiltered = skills.filter((obj) => obj._id !== _id);
    setSkills(skillsFiltered);
  };

  const handleSubmit = async () => {
    const skillsIds = skills?.map((skill) => skill._id);
    const { errors, success, data } = await updateSkills({
      token,
      applicationID,
      skills: skillsIds,
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
  };

  return (
    <form
      action={handleSubmit}
      className={cn("grid gap-4 py-4", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        <div id="skill" className="flex w-full items-center gap-2">
          <Label htmlFor="skill" hidden>
            Habilidad
          </Label>
          <Input
            name="skill"
            ref={inputRef}
            placeholder="React"
            aria-describedby="skill-error"
          />
          <Button
            size="icon"
            type="button"
            disabled={isLoading}
            onClick={addSkills}
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
      <ButtonSubmit>
        Guardar cambios
      </ButtonSubmit>
    </form>
  );
}
