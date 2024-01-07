import Form from "@/components/feedback/form";
import { cookies } from "next/headers";

export default function Feedback() {
  const token = cookies().get("authorization")?.value!;
  return (
    <div className=" flex h-screen w-full p-9">
      <Form token={token} />
      <div className="flex h-full w-1/2 items-center justify-center"></div>
    </div>
  );
}
