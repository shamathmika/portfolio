"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BIG_SIZE_REM = 6;
const SMALL_SIZE_REM = 0.95;
const BIG_LEFT_PX = 24;
const SMALL_LEFT_PX = 56;
const SMALL_TOP_PX = 40;

export function ScrollingBrand() {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const isHome = pathname === "/";

    function onScroll() {
      const el = ref.current;
      if (!el) return;

      const progress = isHome
        ? Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)))
        : 1;
      const bigTop = window.innerHeight * 0.45;

      el.style.fontSize = `${BIG_SIZE_REM + (SMALL_SIZE_REM - BIG_SIZE_REM) * progress}rem`;
      el.style.top = `${bigTop + (SMALL_TOP_PX - bigTop) * progress}px`;
      el.style.left = `${BIG_LEFT_PX + (SMALL_LEFT_PX - BIG_LEFT_PX) * progress}px`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <Link
      ref={ref}
      href="/#home"
      className="fixed z-20 font-display tracking-widest hover:text-accent"
    >
      Shamathmika
    </Link>
  );
}
