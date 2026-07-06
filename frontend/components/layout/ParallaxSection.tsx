"use client";

import { useEffect, useRef } from "react";

export function ParallaxSection({
  children,
  speed = 0.35,
  className,
  id,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const rect = outer.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const maxOffset = 60;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, (viewportCenter - sectionCenter) * speed));
      inner.style.transform = `translateY(${offset}px)`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={outerRef} id={id} className={`overflow-x-hidden ${className ?? ""}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
