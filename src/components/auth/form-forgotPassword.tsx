"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { Errors } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import ErrorMessage from "../ui/error-message";
import { sendResetEmail } from "@/lib/actions";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();

  //Estados del formulario
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  //Manejador del submit del formulario
  const handleSubmit = useCallback(async (formData: FormData) => {
    const email = formData.get("email");
    setIsLoading(true);

    //se ejecuta sendResetEmail para validar la informacion y enviar el email de restablecimiento
    const { errors, success, data } = await sendResetEmail(email);
    setErrors(errors);
    setIsLoading(false);

    //Dependiendo del resultado anterior se maneja la ui
    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }
    toast({ description: data.message });
  }, []);
  return (
    <div className={cn(className)} {...props}>
      <form action={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className={errors?.email && "text-red-500"}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.dev"
              aria-describedby="email-error"
              className={errors?.email && "border-red-500"}
              disabled={isLoading}
            />
          </div>
          <ErrorMessage errors={errors?.email} errorKey="email" />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
