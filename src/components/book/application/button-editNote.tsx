"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ErrorMessage from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateNote } from "@/lib/actions";
import { Errors } from "@/lib/definitions";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function EditNote({
  _id,
  title,
  body,
}: {
  _id: string;
  title: string;
  body: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleEdit = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries());
    setIsLoading(true);

    const { errors, success, data } = await updateNote({ _id, rawFormData });
    setErrors(errors);
    setIsLoading(true);

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ description: data.message });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Nota</DialogTitle>
        </DialogHeader>
        <form action={handleEdit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Titulo
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={title}
              className="col-span-3"
              disabled={isLoading}
            />
          </div>
          <ErrorMessage errors={errors.title} errorKey="title" />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="body" className="text-right">
              Nota
            </Label>
            <Textarea
              id="body"
              name="body"
              defaultValue={body}
              className="col-span-3"
              disabled={isLoading}
            />
          </div>
          <ErrorMessage errors={errors.body} errorKey="body" />
          <Button disabled={isLoading} type="submit">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
