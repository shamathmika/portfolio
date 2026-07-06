import { ParallaxSection } from "@/components/layout/ParallaxSection";

export function Projects() {
  return (
    <ParallaxSection id="projects" className="min-h-screen px-6 pt-48 pb-32 sm:px-16">
      <h2 className="font-heading text-3xl uppercase tracking-wide">Projects</h2>
      <p className="mt-4 max-w-lg font-body text-base opacity-70">
        Pulled from GitHub, coming soon. This section will list real repositories with
        write-ups for the flagship few.
      </p>
    </ParallaxSection>
  );
}
