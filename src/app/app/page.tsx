import Applications from "@/components/metrics/application";
import ApplicationsByTime from "@/components/metrics/applicationsByTime";
import Modality from "@/components/metrics/modality";
import Platforms from "@/components/metrics/platform";
import Skills from "@/components/metrics/skill";
import Status from "@/components/metrics/status";
import TopSkills from "@/components/metrics/topSkills";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get("authorization")?.value!;

  return (
    <div className="flex h-screen w-full flex-wrap">
      <Status token={token} />
      <ApplicationsByTime token={token} />
      <Skills token={token} />
      <TopSkills token={token} />
      <Platforms token={token}/>
      <Modality token={token} />
      <Applications token={token} />
    </div>
  );
}
