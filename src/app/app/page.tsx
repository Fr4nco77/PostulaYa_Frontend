import ApplicationsByTime from "@/components/metrics/applicationsByTime";
import Feelings from "@/components/metrics/feelings";
import Modality from "@/components/metrics/modality";
import Platforms from "@/components/metrics/platform";
import Status from "@/components/metrics/status";
import TopSkills from "@/components/metrics/topSkills/topSkills";
import Workdays from "@/components/metrics/workdays";
import { Metadata } from "next";
import { cookies } from "next/headers";
import User from "@/components/metrics/user/user";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  const token = cookies().get("authorization")?.value!;

  return (
    <main className="flex h-full w-full flex-col overflow-y-auto">
      <User token={token} className="mb-5 w-full" />
      <div className="mb-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
        <TopSkills token={token} />
        <section className="grid grid-cols-1 gap-5 md:col-span-2 md:max-lg:grid-cols-2 xl:grid-cols-2">
          <ApplicationsByTime token={token} />
          <Feelings token={token} />
          <div className="col-span-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:hidden">
            <Status token={token} />
            <Platforms token={token} />
            <Modality token={token} />
            <Workdays token={token} />
          </div>
        </section>
        <section className="col-span-full h-[217px] hidden grid-cols-3 gap-5 lg:grid xl:grid-cols-4">
          <Status token={token} />
          <Platforms token={token} />
          <Modality token={token} />
          <Workdays token={token} className="hidden xl:block" />
        </section>
      </div>
    </main>
  );
}
