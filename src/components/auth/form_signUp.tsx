"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { createUser } from "@/lib/actions";
import { UserCredentials, FormState } from "@/lib/definitions";
import { revalidatePath } from "next/cache";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();
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
    success: false,
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const currentFormState = await createUser(credentials);
      setFormState(currentFormState);

      if (!formState.success) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: formState.message,
        });
      }

      revalidatePath("/auth/sign_up");
      toast({
        description: formState.message,
      });
    },
    [credentials],
  );

  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="John Doe"
              aria-describedby="username-error"
              onChange={handleChange}
              disabled={isLoading}
            />
            <div id="username-error" aria-live="polite" aria-atomic="true">
              {formState.errors?.username &&
                formState.errors.username.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="john@example.dev"
              type="email"
              aria-describedby="email-error"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={handleChange}
              disabled={isLoading}
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {formState.errors?.email &&
                formState.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="password"
                name="password"
                placeholder="••••••••••••"
                type={showPassword ? "text" : "password"}
                aria-describedby="password-error"
                onChange={handleChange}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                variant="outline"
                className="border-slate-600"
                disabled={isLoading}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {formState?.errors?.password &&
                formState?.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <Button
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
