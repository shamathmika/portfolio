"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const DOT_COUNT = 24; // index 0 = fixed anchor, index (DOT_COUNT - 1) = knob
const SEGMENT = 6.5; // px, resting spacing between dots
const MAX_REACH = 70; // px, max distance the knob can travel from rest, any direction
const SIDE_AMPLIFY = 2.5; // sideways swinging takes little force; only the downward "stretch" resists
const SAG_FACTOR = 0.35; // how much the string bows out when pulled sideways
const KNOB_STIFFNESS = 0.2; // the knob is the only real mass/spring in the system
const KNOB_DAMPING = 0.86; // underdamped on purpose — it should swing past rest before settling

const REST_LENGTH = (DOT_COUNT - 1) * SEGMENT;
const SVG_WIDTH = 2 * MAX_REACH + 20;
const SVG_HEIGHT = REST_LENGTH + MAX_REACH + 20;
const ANCHOR_X = SVG_WIDTH / 2;
const ANCHOR_Y = 10;

export function PullCord() {
  const { isDark, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const polylineRef = useRef<SVGPolylineElement | null>(null);
  const knobRef = useRef({ x: ANCHOR_X, y: ANCHOR_Y + REST_LENGTH, vx: 0, vy: 0 });

  const draggingRef = useRef(false);
  const dragRef = useRef({ x: 0, y: 0 });
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const handledByPointerRef = useRef(false);

  useEffect(() => {
    let frame: number;

    function tick() {
      const knob = knobRef.current;

      if (draggingRef.current) {
        // Held taut: the knob is exactly where the pointer is, no lag at all — a real
        // string in your hand doesn't drift toward that position over several frames.
        knob.x = ANCHOR_X + dragRef.current.x;
        knob.y = ANCHOR_Y + REST_LENGTH + dragRef.current.y;
        knob.vx = 0;
        knob.vy = 0;
      } else {
        // Let go: only now does the knob behave like a weight on a string, swinging
        // back toward rest and overshooting before it settles.
        const restX = ANCHOR_X;
        const restY = ANCHOR_Y + REST_LENGTH;
        knob.vx = (knob.vx + (restX - knob.x) * KNOB_STIFFNESS) * KNOB_DAMPING;
        knob.vy = (knob.vy + (restY - knob.y) * KNOB_STIFFNESS) * KNOB_DAMPING;
        knob.x += knob.vx;
        knob.y += knob.vy;
      }

      // The rest of the string is a curve from the fixed anchor to wherever the knob
      // currently is — this always connects exactly, no chain-length mismatch possible.
      // It bows out sideways (real slack/gravity look) but stays straight when pulled
      // straight down.
      const sideways = knob.x - ANCHOR_X;
      const controlX = (ANCHOR_X + knob.x) / 2;
      const controlY = (ANCHOR_Y + knob.y) / 2 + Math.abs(sideways) * SAG_FACTOR;

      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        const t = i / (DOT_COUNT - 1);
        const mt = 1 - t;
        points.push({
          x: mt * mt * ANCHOR_X + 2 * mt * t * controlX + t * t * knob.x,
          y: mt * mt * ANCHOR_Y + 2 * mt * t * controlY + t * t * knob.y,
        });
      }

      for (let i = 1; i < DOT_COUNT; i++) {
        const circle = dotRefs.current[i];
        if (circle) {
          circle.setAttribute("cx", String(points[i].x));
          circle.setAttribute("cy", String(points[i].y));
        }
      }

      if (polylineRef.current) {
        polylineRef.current.setAttribute("points", points.map((p) => `${p.x},${p.y}`).join(" "));
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  function handlePointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY };
    dragRef.current = { x: 0, y: 0 };
    draggingRef.current = true;
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!startRef.current) return;
    const dx = (e.clientX - startRef.current.x) * SIDE_AMPLIFY;
    const dy = e.clientY - startRef.current.y;
    const distance = Math.hypot(dx, dy);
    const clamped = Math.min(MAX_REACH, distance);
    const scale = distance === 0 ? 0 : clamped / distance;
    dragRef.current = { x: dx * scale, y: dy * scale };
  }

  function endDrag() {
    if (!startRef.current) return;
    startRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);
    handledByPointerRef.current = true;
    toggleTheme();
  }

  function handlePointerCancel() {
    startRef.current = null;
    draggingRef.current = false;
    setIsDragging(false);
  }

  function handleClick() {
    if (handledByPointerRef.current) {
      handledByPointerRef.current = false;
      return;
    }
    toggleTheme();
  }

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={handlePointerCancel}
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`absolute right-8 top-[-28px] touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
    >
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} aria-hidden="true" className="overflow-visible">
        <polyline
          ref={polylineRef}
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity={0.45}
          strokeWidth={1.25}
        />
        {Array.from({ length: DOT_COUNT }, (_, i) => i * SEGMENT + ANCHOR_Y).map((y, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            cx={ANCHOR_X}
            cy={y}
            r={i === DOT_COUNT - 1 ? 10 : 2.25}
            fill={i === DOT_COUNT - 1 ? "var(--accent)" : "var(--foreground)"}
            fillOpacity={i === DOT_COUNT - 1 ? 1 : 0.55}
          />
        ))}
      </svg>
    </button>
  );
}
