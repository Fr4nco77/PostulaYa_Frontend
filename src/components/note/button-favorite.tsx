"use client";

import { Button } from "../ui/button";
import clsx from "clsx";
import { Loader2, Star } from "lucide-react";
import { useCallback, useState } from "react";
import { addFavorite } from "@/lib/actions/note";
import { useToast } from "../ui/use-toast";

export default function AddFavorite({
  _id,
  token,
  favorite,
}: {
  _id: string;
  token: string;
  favorite: boolean;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = useCallback(async () => {
    setIsLoading(true);

    const { success, data } = await addFavorite({
      _id,
      token,
      favorite: !favorite,
    });
    if (!success) {
      toast({
        variant: "warning",
        title: data?.name,
        description: data?.message,
      });
    }

    setIsLoading(false);
  }, [favorite]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={clsx("h-7 w-7 rounded-full p-1 text-slate-900", {
        "bg-yellow-400 hover:bg-yellow-300": favorite,
        "hover:bg-slate-900 hover:text-yellow-400": !favorite,
      })}
      onClick={handleFavorite}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Star />}
    </Button>
  );
}
