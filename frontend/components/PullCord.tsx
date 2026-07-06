"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const DOT_COUNT = 24;
const SEGMENT = 6.5;
const MAX_REACH = 70;
const SIDE_AMPLIFY = 2.5;
const SAG_FACTOR = 0.35;
const KNOB_STIFFNESS = 0.1;
const KNOB_DAMPING = 0.93;
const CONTROL_STIFFNESS = 0.4;
const CONTROL_DAMPING = 0.72;
const CONTROL_SETTLE_RATE = 0.5;

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
  const controlRef = useRef({
    x: ANCHOR_X,
    y: ANCHOR_Y + REST_LENGTH / 2,
    vx: 0,
    vy: 0,
  });

  const draggingRef = useRef(false);
  const dragRef = useRef({ x: 0, y: 0 });
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const handledByPointerRef = useRef(false);

  useEffect(() => {
    let frame: number;

    function tick() {
      const knob = knobRef.current;

      if (draggingRef.current) {
        knob.x = ANCHOR_X + dragRef.current.x;
        knob.y = ANCHOR_Y + REST_LENGTH + dragRef.current.y;
        knob.vx = 0;
        knob.vy = 0;
      } else {
        const restX = ANCHOR_X;
        const restY = ANCHOR_Y + REST_LENGTH;
        knob.vx = (knob.vx + (restX - knob.x) * KNOB_STIFFNESS) * KNOB_DAMPING;
        knob.vy = (knob.vy + (restY - knob.y) * KNOB_STIFFNESS) * KNOB_DAMPING;
        knob.x += knob.vx;
        knob.y += knob.vy;
      }

      const sideways = knob.x - ANCHOR_X;
      const idealControlX = (ANCHOR_X + knob.x) / 2;
      const idealControlY = (ANCHOR_Y + knob.y) / 2 + Math.abs(sideways) * SAG_FACTOR;

      const control = controlRef.current;
      if (draggingRef.current) {
        control.vx = (control.vx + (idealControlX - control.x) * CONTROL_STIFFNESS) * CONTROL_DAMPING;
        control.vy = (control.vy + (idealControlY - control.y) * CONTROL_STIFFNESS) * CONTROL_DAMPING;
        control.x += control.vx;
        control.y += control.vy;
      } else {
        control.vx = 0;
        control.vy = 0;
        control.x += (idealControlX - control.x) * CONTROL_SETTLE_RATE;
        control.y += (idealControlY - control.y) * CONTROL_SETTLE_RATE;
      }

      const points: { x: number; y: number }[] = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        const t = i / (DOT_COUNT - 1);
        const mt = 1 - t;
        points.push({
          x: mt * mt * ANCHOR_X + 2 * mt * t * control.x + t * t * knob.x,
          y: mt * mt * ANCHOR_Y + 2 * mt * t * control.y + t * t * knob.y,
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
      className={`fixed right-8 top-[-28px] z-30 touch-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
    >
      <svg width={SVG_WIDTH} height={SVG_HEIGHT} aria-hidden="true" className="overflow-visible">
        {Array.from({ length: DOT_COUNT }, (_, i) => i * SEGMENT + ANCHOR_Y).map((y, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            cx={ANCHOR_X}
            cy={y}
            r={i === DOT_COUNT - 1 ? 13 : 2.25}
            fill={i === DOT_COUNT - 1 ? "var(--accent)" : "var(--foreground)"}
            fillOpacity={i === DOT_COUNT - 1 ? 1 : 0.55}
          />
        ))}
        <polyline
          ref={polylineRef}
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity={0.45}
          strokeWidth={1.25}
        />
      </svg>
    </button>
  );
}
