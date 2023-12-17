"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  return (
    <div className={cn(className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john@example.dev"
              disabled={isLoading}
            />
          </div>
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
