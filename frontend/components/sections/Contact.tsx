import { ParallaxSection } from "@/components/layout/ParallaxSection";

export function Contact() {
  return (
    <ParallaxSection id="contact" className="min-h-screen px-6 pt-48 pb-32 sm:px-16">
      <h2 className="font-heading text-3xl uppercase tracking-wide">Contact</h2>
      <form className="mt-8 flex max-w-md flex-col gap-4 font-body">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border-b border-foreground/20 bg-transparent py-2 outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-b border-foreground/20 bg-transparent py-2 outline-none"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={4}
          className="border-b border-foreground/20 bg-transparent py-2 outline-none"
        />
        <button
          type="submit"
          className="mt-2 w-fit rounded-full border border-foreground/40 px-6 py-2 text-sm uppercase tracking-wide hover:bg-foreground/10"
        >
          Send
        </button>
      </form>
      <div className="mt-8 flex gap-6 font-body text-sm">
        <a
          href="https://github.com/shamathmika"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 underline underline-offset-4 hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18.92-.26 1.9-.38 2.88-.39.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/shamathmika/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 underline underline-offset-4 hover:text-accent"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </ParallaxSection>
  );
}
