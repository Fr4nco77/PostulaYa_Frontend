import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { ReactNode } from "react";

export default function Card({
  icon,
  title,
  color,
  data,
  displayTooltip,
  dataTooltip,
}: {
  icon: ReactNode;
  title: string;
  color: string;
  data: string[];
  displayTooltip: boolean;
  dataTooltip?: string;
}) {
  return (
    <article className="relative flex flex-col rounded-lg bg-slate-50 p-3 shadow-md">
      <div className="flex w-full items-center">
        <div
          className={`my-auto flex h-14 w-14 items-center justify-center rounded-full ${color}`}
        >
          {icon}
        </div>
        <h3 className="my-auto ml-4 flex grow flex-col text-sm font-bold text-slate-900">
          {title}
        </h3>
      </div>
      <Separator className="my-2 text-gray-400" />
      <ol className="ml-5 flex flex-col gap-2">
        {!data.length
          ? Array.from({ length: 5 }, (_, index) => (
              <li
                key={index}
                className="text-2xl font-extrabold text-slate-800"
              >
                -
              </li>
            ))
          : data.map((skill: string, index: number) => (
              <li key={skill} className="flex items-center gap-1">
                <span className="text-2xl font-extrabold text-slate-800">
                  {`${index + 1}.`}
                </span>
                <Badge
                  className={`truncate ${color} transition duration-300 hover:bg-slate-900 hover:text-yellow-400`}
                >
                  {skill}
                </Badge>
              </li>
            ))}
      </ol>
      {displayTooltip && (
        <div className="z-11 absolute right-1 top-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 text-gray-400 transition duration-300 hover:text-gray-500" />
              </TooltipTrigger>
              <TooltipContent className="w-36 border-slate-600 bg-slate-50 text-xs font-medium text-slate-900">
                {dataTooltip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </article>
  );
}
