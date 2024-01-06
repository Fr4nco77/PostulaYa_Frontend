import { fetchTopSkills } from "@/lib/data";

export default async function TopSkills({ token }: { token: string }) {
  const { success, data } = await fetchTopSkills({ token });

  if (!success) {
    return (
      <div>
        <h1>{data.name}</h1>
        <span>{data.message}</span>
      </div>
    );
  }
  const { topRequiredSkills, topMissingSkills } = data.response;

  return (
    <div className="flex">
      <div>
        <h1>Top Habilidades Requridas:</h1>
        <ul>
          {topRequiredSkills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Te seria provechoso aprender estas habilidades:</h1>
        <ul>
          {topMissingSkills.map((skill: string) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
