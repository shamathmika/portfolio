import { PullCord } from "@/components/PullCord";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-start justify-center px-16">
      <PullCord />
      <h1 className="font-display text-[clamp(2.75rem,6.5vw,7rem)] tracking-widest">
        Shamathmika
      </h1>
      <p className="mt-6 max-w-md font-subtitle text-lg opacity-70">
        Software Developer.
      </p>
    </section>
  );
}
