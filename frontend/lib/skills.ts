export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Java", "Python", "SQL"],
  },
  {
    label: "AI",
    skills: ["PyTorch", "LLM integration"],
  },
  {
    label: "Cloud & Tools",
    skills: ["AWS", "Docker", "Git"],
  },
];
