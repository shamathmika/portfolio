"use client";

import { useState } from "react";
import Link from "next/link";

export function LeftPane() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sticky top-0 z-30 h-screen shrink-0 self-start">
          <div className="relative h-full">
            <aside
                className={`relative z-20 h-screen shrink-0 border-r border-foreground/10 bg-background transition-[width] duration-300 ease-in-out overflow-hidden ${isOpen ? "w-56" : "w-0"
                    }`}
            >
                <nav className="p-8">
                    <ul className="flex flex-col gap-4 font-heading text-sm uppercase tracking-wide">
                        <li><Link href="/#home" className="hover:text-accent">Home</Link></li>
                        <li><Link href="/#projects" className="hover:text-accent">Projects</Link></li>
                        <li><Link href="/#experience" className="hover:text-accent">Experience</Link></li>
                        <li><Link href="/#skills" className="hover:text-accent">Skills</Link></li>
                        <li><Link href="/#blog" className="hover:text-accent">Blog</Link></li>
                        <li><Link href="/#contact" className="hover:text-accent">Contact</Link></li>
                    </ul>
                </nav>
            </aside>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Collapse navigation" : "Expand navigation"}
                className={`absolute z-30 top-8 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-background text-sm transition-[left,background-color,border-color] duration-300 ease-in-out ${isOpen ? "left-[13.5rem]" : "left-2"
                    }`}
            >
                <span className="relative h-4 w-4">
                    <span
                        className={`absolute left-0 top-[2px] h-0.5 w-4 rounded-full bg-foreground transition-[rotate,translate,opacity] duration-300 ease-in-out ${isOpen ? "translate-y-[5px] rotate-45" : "translate-y-0 rotate-[0deg]"
                            }`}
                    />
                    <span
                        className={`absolute left-0 top-[7px] h-0.5 w-4 rounded-full bg-foreground transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`absolute left-0 top-[12px] h-0.5 w-4 rounded-full bg-foreground transition-[rotate,translate,opacity] duration-300 ease-in-out ${isOpen ? "-translate-y-[5px] -rotate-45" : "translate-y-0 rotate-[0deg]"
                            }`}
                    />
                </span>
            </button>
          </div>
        </div>
    );
}
