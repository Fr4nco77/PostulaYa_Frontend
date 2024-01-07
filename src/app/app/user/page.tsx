import { Avatar, AvatarImage } from "@/components/ui/avatar";
import UpdateUser from "@/components/user/form-edit";
import { fetchUser } from "@/lib/data";
import { cookies } from "next/headers";

export default async function User() {
  const token = cookies().get("authorization")?.value!;
  const { success, data } = await fetchUser({ token });

  if (!success) {
    return (
      <div>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  }
  const { username, email, image, skills } = data.response;
  return (
    <div className="flex h-screen w-full justify-between p-9">
      <div className="flex h-full w-1/2 flex-col items-center justify-center">
        <div className="flex">
          <Avatar>
            <AvatarImage src={image} />
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1>
              <strong>{username}</strong>
            </h1>
            <span>{email}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span>Tienes {skills.length} Habilidades</span>
          <UpdateUser token={token} userSkills={skills} />
        </div>
      </div>
    </div>
  );
}
