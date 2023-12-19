"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ChangeEvent, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { FormState } from "@/lib/definitions";
import { useToast } from "../ui/use-toast";
import ErrorMessage from "./error_messages";
import { sendResetEmail } from "@/lib/actions";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [formState, setFormState] = useState<FormState>({
    errors: {},
    message: null
  })

  const handleSubmit = useCallback(
    async(e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      const {errors, success, data} = await sendResetEmail(email);

    },[email])
  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className={formState.errors?.email && "text-red-500"}>Email</Label>
            <Input
              id="email"
              value={email}
              placeholder="john@example.dev"
              aria-aria-describedby="email-error"
              className={formState.errors?.email && "border-red-500"}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <ErrorMessage errors={formState.errors?.email} errorKey="email" />
          <Button
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send
            email
          </Button>
        </div>
      </form>
    </div>
  );
}
