import Applications from "@/components/metrics/application";
import ApplicationsByTime from "@/components/metrics/applicationsByTime";
import Feelings from "@/components/metrics/feelings";
import Modality from "@/components/metrics/modality";
import Platforms from "@/components/metrics/platform";
import Skills from "@/components/metrics/skill";
import Status from "@/components/metrics/status";
import TopSkills from "@/components/metrics/topSkills";
import Types from "@/components/metrics/types";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("authorization")?.value!;

  return (
    <div className="flex w-full items-center lg:h-full">
      {/* Version Mobile */}
      <div className="flex w-full flex-col flex-wrap items-center gap-5 md:hidden">
        <Applications token={token} className="w-full" />
        <Status token={token} className="w-full" />
        <ApplicationsByTime token={token} className="w-full" />
        <Platforms token={token} className="w-full" />
        <Skills token={token} className="w-full" />
        <TopSkills token={token} className="w-full" />
        <Types token={token} className="w-full" />
        <Modality token={token} className="w-full" />
        <Feelings token={token} className="w-full" />
      </div>

      {/* Version Tablet */}
      <div className="hidden max-h-screen w-full max-w-full flex-col items-center gap-5 overflow-y-auto md:flex lg:hidden">
        <div className="flex w-full items-start gap-5">
          <ApplicationsByTime token={token} className="w-2/3 " />
          <Applications token={token} className="w-1/3 " />
        </div>
        <div className="flex w-full items-center justify-evenly gap-5">
          <Types token={token} className="w-1/4" />
          <Status token={token} className="w-1/3" />
          <Modality token={token} className="w-1/4" />
        </div>
        <div className="flex w-full items-center justify-evenly gap-5">
          <Skills token={token} className="w-2/6" />
          <TopSkills token={token} className="w-2/4 grow" />
        </div>
        <div className="flex w-full items-center justify-evenly gap-5">
          <Feelings token={token} className="w-2/4 grow" />
          <Platforms token={token} className="w-1/3" />
        </div>
      </div>

      {/* Version Desktop > 1280px */}
      <div className="hidden h-full max-h-full w-full flex-col items-center gap-5 overflow-y-auto lg:flex">
        <div className="flex h-2/3 w-full items-center justify-evenly gap-5">
          <ApplicationsByTime token={token} className="h-full w-1/3 grow" />
          <Status token={token} className="h-full w-1/5" />
          <Feelings token={token} className="h-full w-1/3" />
        </div>
        <div className="flex h-1/3 w-full items-start justify-evenly gap-5">
          <Applications token={token} className="h-full w-1/4" />
          <Skills token={token} className="h-full w-1/5" />
          <TopSkills token={token} className="h-full w-3/5 grow" />
        </div>
        <div className="flex h-1/3 w-full items-center justify-evenly gap-5">
          <Types token={token} className="h-full w-1/5" />
          <Modality token={token} className="h-full w-1/5" />
          <Platforms token={token} className="h-full w-1/5" />
        </div>
      </div>
    </div>
  );
}
