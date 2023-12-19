"use client";

import { ChangeEvent, useCallback, useState } from "react";
import ErrorMessage from "./error_messages";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/actions";
import { UserCredentials, FormState } from "@/lib/definitions";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();

  // Estados del formulario
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: "",
    email: "",
    password: "",
  });
  const [formState, setFormState] = useState<FormState>({
    errors: {},
    message: null,
  });

  // Manejador de cambio en los campos del formulario
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const { errors, message, success } = await createUser(credentials);
      setFormState({ errors, message });
      setIsLoading(false);

      if (!success) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        });
      }

      setCredentials({
        username: "",
        email: "",
        password: "",
      });

      toast({ description: message });
    },
    [credentials],
  );

  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="username"
              className={formState.errors?.username && "text-red-500"}
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="John Doe"
              aria-describedby="username-error"
              className={formState.errors?.username && "border-red-500"}
              value={credentials.username}
              onChange={handleChange}
              disabled={isLoading}
            />
            <ErrorMessage
              errors={formState.errors?.username}
              errorKey="username"
            />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className={formState.errors?.email && "text-red-500"}
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.dev"
              type="email"
              aria-describedby="email-error"
              className={formState.errors?.email && "border-red-500"}
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <ErrorMessage errors={formState.errors?.email} errorKey="email" />
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className={formState.errors?.password && "text-red-500"}
            >
              Password
            </Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="password"
                name="password"
                placeholder="••••••••••••"
                type={showPassword ? "text" : "password"}
                aria-describedby="password-error"
                className={formState.errors?.password && "border-red-500"}
                value={credentials.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="border-slate-600"
                disabled={isLoading}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <ErrorMessage
              errorKey="password"
              errors={formState.errors?.password}
            />
          </div>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-300"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
