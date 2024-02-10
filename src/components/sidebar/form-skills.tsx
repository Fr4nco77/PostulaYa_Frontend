"use client";

import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Errors, Skill, Skills } from "@/lib/definitions";
import { addSkill } from "@/lib/actions/application";
import { Badge } from "../ui/badge";
import { ButtonSubmit } from "../ui/button-submit";
import { updateUser } from "@/lib/actions/user";

export default function Form({
  token,
  currentSkills,
}: {
  token: string;
  currentSkills: Skills;
}) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [skills, setSkills] = useState<Skills>(currentSkills);

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
    const skillsIds = skills.map((skill: Skill) => skill._id);

    const { errors, success, data } = await updateUser({
      token,
      userData: { skills: skillsIds },
    });
    setErrors(errors);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ variant: "warning", title: data.message });
  };

  return (
    <form action={handleSubmit} className="flex w-full flex-col gap-4 py-4">
      <div className="flex w-full items-center gap-4">
        <Label htmlFor="skill" hidden>
          Habilidad
        </Label>
        <div className="flex w-full gap-2">
          <Input
            id="skill"
            ref={inputRef}
            placeholder="React"
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
      <div className="flex max-h-96 flex-wrap gap-1 overflow-y-auto">
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
      <ButtonSubmit disabled={skills.length === currentSkills.length}>
        Guardar Cambios
      </ButtonSubmit>
    </form>
  );
}
