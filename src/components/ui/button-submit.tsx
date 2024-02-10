import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonSubmit({ children, className, ...props }: buttonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={cn(
        "bg-yellow-400 text-black transition duration-300 hover:bg-slate-900 hover:text-yellow-400",
        className,
      )}
      disabled={pending}
      {...props}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
