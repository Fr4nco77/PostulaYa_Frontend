"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Form({ className, ...props }: FormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <div className="flex w-full items-center space-x-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
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
          </div>
          <Button
            disabled={isLoading}
            className="bg-yellow-400 text-black hover:bg-yellow-300"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Restore Password
          </Button>
        </div>
      </form>
    </div>
  );
}
