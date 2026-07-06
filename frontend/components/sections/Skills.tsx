import { ParallaxSection } from "@/components/layout/ParallaxSection";
import { skillGroups } from "@/lib/skills";

export function Skills() {
  return (
    <ParallaxSection id="skills" className="min-h-screen px-6 pt-48 pb-32 sm:px-16">
      <h2 className="font-heading text-3xl uppercase tracking-wide">Skills</h2>
      <div className="mt-12 flex max-w-2xl flex-col gap-10">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3 className="font-body text-sm font-bold uppercase tracking-wide opacity-70">
              {group.label}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-foreground/20 px-4 py-1.5 font-body text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ParallaxSection>
  );
}
