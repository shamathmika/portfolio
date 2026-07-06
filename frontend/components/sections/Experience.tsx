import { ParallaxSection } from "@/components/layout/ParallaxSection";
import { experience, involvement } from "@/lib/experience";

function WorkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function StudyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 9 12 4 2 9l10 5 10-5z" />
      <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
    </svg>
  );
}

export function Experience() {
  return (
    <ParallaxSection id="experience" className="min-h-screen px-6 pt-48 pb-32 sm:px-16">
      <h2 className="font-heading text-3xl uppercase tracking-wide">Experience</h2>
      <ol className="relative mt-12 flex max-w-2xl flex-col gap-10">
        <span aria-hidden="true" className="absolute bottom-1 left-[8.75rem] top-1 w-px bg-foreground/20" />
        {experience.map((item) => (
          <li key={item.id} className="grid grid-cols-[7.5rem_2.5rem_1fr] items-start">
            <p className="pt-0.5 text-right font-body text-xs opacity-60">{item.period}</p>
            <span className="flex justify-center">
              <span className="z-[1] rounded-full bg-background p-1 text-accent">
                {item.kind === "work" ? <WorkIcon /> : <StudyIcon />}
              </span>
            </span>
            <div>
              <p className="font-body text-sm font-bold uppercase tracking-wide">{item.role}</p>
              <p className="mt-1 text-sm opacity-70">{item.org}</p>
              {item.detail && <p className="mt-1 text-xs opacity-50">{item.detail}</p>}
            </div>
          </li>
        ))}
      </ol>
      <h3 className="mt-20 font-heading text-xl uppercase tracking-wide">Involvement</h3>
      <ul className="mt-6 flex max-w-2xl flex-col gap-3">
        {involvement.map((entry) => (
          <li key={entry} className="font-body text-sm opacity-80">
            {entry}
          </li>
        ))}
      </ul>
    </ParallaxSection>
  );
}
