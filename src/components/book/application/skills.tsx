import { Badge } from "@/components/ui/badge";
import { fetchUser } from "@/lib/data";
import { Skills } from "@/lib/definitions";

export default async function Skills({
  skills,
  token,
}: {
  skills: Skills;
  token: string;
}) {
  const { success, data } = await fetchUser({ token });

  if (!success) {
    return (
      <>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </>
    );
  }

  const displaySkillsAndCountUserSkills = () => {
    const userSkills = data.response.skills;

    const userSkillNames = userSkills.map(
      (skill: { _id: string; name: string }) => skill.name,
    );

    const requiredSkills = skills?.map(
      (skill: { _id: string; name: string }) => skill.name,
    );

    const userSkillsCount = userSkillNames.filter((skill: string) =>
      requiredSkills.includes(skill),
    ).length;

    return (
      <>
        <span>
          Tienes {userSkillsCount} habilidades de las requeridas para esta
          aplicación.
        </span>
        <div className="flex flex-wrap gap-2">
          {skills?.map(({ _id, name }: { _id: string; name: string }) => (
            <Badge
              key={_id}
              className={
                userSkillNames.includes(name) ? "bg-green-500" : "bg-red-600"
              }
            >
              {name}
            </Badge>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 text-lg">Habilidades Requeridas:</h3>
      {displaySkillsAndCountUserSkills()}
    </div>
  );
}
