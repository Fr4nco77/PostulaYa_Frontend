"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { ChangeEvent, useCallback, useState } from "react";
import Link from "next/link";
import { FormState, UserCredentials } from "@/lib/definitions";
import { loginUser } from "@/lib/actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import ErrorMessage from "./error_messages";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [formState, setFormState] = useState<FormState>({
    errors: {},
    message: null,
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const { errors, message, success, response } =
        await loginUser(credentials);
      setFormState({ errors, message });
      setIsLoading(false);

      if (!success) {
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        });
      }

      localStorage.setItem("authorization", response);
      setCredentials({
        email: "",
        password: "",
      });

      toast({ description: message });
      setTimeout(() => router.push("/"), 2000);
    },
    [credentials],
  );

  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className={formState.errors?.email && "text-red-500"}>Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.dev"
              aria-describedby="email-error"
              className={formState.errors?.email && "border-red-500"}
              value={credentials.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            <ErrorMessage errors={formState.errors?.email} errorKey="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className={formState.errors?.password && "text-red-500"}>Password</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="password"
                name="password"
                placeholder="••••••••••••"
                aria-describedby="password-error"
                type={showPassword ? "text" : "password"}
                className={formState.errors?.password && "border-red-500"}
                value={credentials.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                size="icon"
                variant="outline"
                className="border-slate-600"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <ErrorMessage errors={formState.errors?.password} errorKey="password" />
          </div>
          <div className="flex items-end justify-end">
            <Link href="/auth/forgot_password">
              <strong className="text-sm underline">
                Forgot your Password?
              </strong>
            </Link>
          </div>
          <Button
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
