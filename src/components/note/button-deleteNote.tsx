"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteNote } from "@/lib/actions/note";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { HTMLAttributes, useCallback } from "react";

interface DeleteNoteProps extends HTMLAttributes<HTMLButtonElement> {
  _id: string;
  token: string;
}

export default function DeleteNote({
  className,
  _id,
  token,
  ...props
}: DeleteNoteProps) {
  const { toast } = useToast();

  const handleDelete = useCallback(async () => {
    const { success, data } = await deleteNote({ _id, token });

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ variant: "warning", title: data.message });
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleDelete}
      className={cn("rounded-full text-slate-900 hover:bg-red-600", className)}
      {...props}
    >
      <Trash2 />
    </Button>
  );
}
