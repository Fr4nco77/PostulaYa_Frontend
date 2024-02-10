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
        variant: "destructive",
        title: data?.name,
        description: data?.message,
      });
    }

    setIsLoading(false);
  }, [_id, toast, token, favorite]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className={clsx(
        "h-7 w-7 p-1 transition duration-300 hover:bg-slate-900 hover:text-yellow-400",
        {
          "text-slate-900": favorite,
          "text-yellow-600": !favorite,
        },
      )}
      onClick={handleFavorite}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Star />}
    </Button>
  );
}
