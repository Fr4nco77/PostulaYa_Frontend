import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React, { ReactNode } from "react";

export default function Card({
  icon,
  title,
  data,
  displayTooltip,
  dataTooltip,
}: {
  icon: ReactNode;
  title: string;
  data: string;
  displayTooltip: boolean;
  dataTooltip?: string;
}) {
  return (
    <article className="relative flex rounded-lg bg-slate-50  px-5 py-4 text-slate-900 shadow-md">
      <div className="my-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-900">
        {icon}
      </div>
      <div className="my-auto ml-4 flex grow flex-col text-sm font-bold ">
        <span>{title}</span>
        <span className="text-3xl font-black">{data}</span>
      </div>
      {displayTooltip && (
        <div className="absolute right-1 top-1 z-11">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 text-gray-400 transition duration-300 hover:text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="w-36 bg-slate-900 text-xs text-yellow-400">
                {dataTooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </article>
  );
}
