"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteNote } from "@/lib/actions/note";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { HTMLAttributes } from "react";

interface DeleteNoteProps extends HTMLAttributes<HTMLButtonElement> {
  _id: string;
}

export default function DeleteNote({
  className,
  _id,
  ...props
}: DeleteNoteProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const { success, data } = await deleteNote({ _id });

    if (!success) {
      return toast({
        variant: "destructive",
        title: data.name,
        description: data.message,
      });
    }

    toast({ variant: "warning", description: data.message });
  };
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
