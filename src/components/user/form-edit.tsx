"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addSkill } from "@/lib/actions/application";
import { updateUser } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Errors, Skills } from "@/lib/definitions";
import ErrorMessage from "@/components/ui/error-message";

export default function UpdateUser({
  token,
  userSkills,
}: {
  token: string;
  userSkills: { _id: string; name: string }[];
}) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [skills, setSkills] = useState<Skills>(userSkills);

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

  const handleUpdate = useCallback(async () => {
    const skillsIds = skills?.map((obj) => obj._id);
    const userData = { skills: skillsIds };
    setIsLoading(true);

    const { success, data, errors } = await updateUser({ token, userData });
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
  }, [skills]);

  return (
    <div className="grid gap-4 py-4">
      <div className="flex flex-wrap gap-1">
        {skills?.map(({ _id, name }) => (
          <Badge
            id={_id}
            key={_id}
            onClick={() => removeSkill(_id)}
          >{`${name}`}</Badge>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Label htmlFor="skill" className="text-right">
          Agregar Habilidades
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
      <ErrorMessage errors={errors?.skills} errorKey="skill" />
      <Button type="button" onClick={handleUpdate} disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Guarrdar Cambios
      </Button>
    </div>
  );
}
