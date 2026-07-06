export interface ExperienceItem {
  id: string;
  kind: "work" | "study";
  role: string;
  org: string;
  period: string;
  detail?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: "nokia",
    kind: "work",
    role: "Software Development Engineer Intern",
    org: "Nokia",
    period: "May 2026 – Present",
  },
  {
    id: "sjsu-research",
    kind: "work",
    role: "Graduate Research Assistant",
    org: "San Jose State University",
    period: "Jan 2026 – Present",
  },
  {
    id: "sjsu-ta",
    kind: "work",
    role: "Teaching Assistant",
    org: "San Jose State University",
    period: "Jan 2026 – Present",
  },
  {
    id: "sjsu-ms",
    kind: "study",
    role: "MS, Software Engineering",
    org: "San Jose State University",
    period: "Jan 2025 – Dec 2026",
    detail: "GPA 3.8/4",
  },
  {
    id: "gendigital-swe",
    kind: "work",
    role: "Software Engineer",
    org: "Gen Digital (NortonLifeLock / Symantec)",
    period: "Jul 2020 – Jun 2023",
  },
  {
    id: "gendigital-ase",
    kind: "work",
    role: "Assistant Software Engineer",
    org: "Gen Digital (NortonLifeLock / Symantec)",
    period: "Jul 2018 – Jun 2020",
  },
  {
    id: "gendigital-intern",
    kind: "work",
    role: "Software Engineer Intern",
    org: "Gen Digital (NortonLifeLock / Symantec)",
    period: "Jan 2018 – Jul 2018",
  },
  {
    id: "manipal",
    kind: "study",
    role: "B.Tech",
    org: "Manipal Institute of Technology",
    period: "Aug 2014 – Jun 2018",
    detail: "GPA 3.9/4",
  },
];

export const involvement: string[] = [
  "Treasurer, Art & Design Society, SJSU",
  "Adobe Student Ambassador",
  "Member, Society of Women Engineers",
];
