"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteNote } from "@/lib/actions";
import { Trash2 } from "lucide-react";

export default function DeleteNote({ _id }: { _id: string }) {
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

    toast({ description: data.message });
  };
  return (
    <Button size="icon" onClick={handleDelete}>
      <Trash2 />
    </Button>
  );
}
