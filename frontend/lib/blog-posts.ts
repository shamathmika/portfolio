export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  sections: { heading?: string; body: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-a-physical-pull-cord-switch",
    title: "Building a dark-mode switch that actually feels like a pull-cord",
    date: "2026-07-04",
    excerpt:
      "What it took to make a dangling string of beads feel physical: a CSS cascade bug that silently killed every animation on the site, a spring-chain that diverged and flew off-screen, and the difference between a rope and a chain of springs.",
    sections: [
      {
        body: [
          "The pitch was simple: instead of a settings icon, the dark/light toggle on this site is a pull-cord, a string of beads hanging from a fixed point, with a heavier knob at the end. Drag it, let go, it swings and settles, and somewhere in that motion the theme flips. It sounded like an afternoon's work. It was not.",
        ],
      },
      {
        heading: "The bug that made every animation disappear",
        body: [
          "Partway through, the entire site's animations stopped working. The sidebar's collapse, the hamburger icon's morph, all of it snapping instantly instead of transitioning. The CSS looked right. The classes were all there. Nothing in the component code had changed.",
          "The actual cause was a single line in globals.css: a global rule meant to make theme-color changes fade smoothly everywhere, written as a plain, unlayered CSS rule. Tailwind wraps all of its own utilities inside `@layer utilities`. Per the CSS spec, an unlayered rule always beats a layered one, regardless of specificity. A universal `*` selector outside any layer will out-rank a `.transition-[width]` class inside one. That one rule was silently overriding every element's transition-property to just color/background/border, site-wide. The fix was one word: wrap it in `@layer base` so it plays by the same cascade rules as everything else. This is the kind of bug that's invisible in a code review and only shows up when you actually watch the thing run.",
        ],
      },
      {
        heading: "Rotation isn't the same as a pull",
        body: [
          "The first real drag implementation used a rotation-only model: grab the cord, rotate it around its anchor, like a compass needle. It worked for sideways swings. It did nothing when dragged straight down.",
          "The reason is basic geometry, not a bug. Rotating something around a fixed point changes its angle, and dragging along the exact same axis as that pivot doesn't change the angle at all. A rotation model is structurally incapable of representing a downward pull, no matter how it's tuned. The fix wasn't a parameter, it was recognizing the interaction needed two different degrees of freedom (swing and stretch), not one.",
        ],
      },
      {
        heading: "A chain of springs can blow up",
        body: [
          "To get individual beads bending independently instead of moving in lockstep, each bead's target became relative to its neighbor's actual position, rather than a fixed fraction of the overall drag. That fixed the \"everything moves together\" problem, and then, on a fast flick, the whole cord shot off across the entire screen.",
          "A single damped spring (one mass, one target) can't diverge; it's a well-behaved, bounded system. Chain several of them together, each one's target depending on a neighbor that is itself oscillating, and the errors can compound frame over frame instead of cancelling out. It's a feedback loop, and feedback loops don't forgive bad tuning. The fix was to drop velocity from the beads entirely and use pure exponential easing instead, mathematically guaranteed to converge, since each step is just a weighted average toward a bounded target. Only one thing in the whole system was allowed to have real momentum: the knob at the very end, the one point actually meant to behave like a weight on a string.",
        ],
      },
      {
        heading: "Held vs. released aren't the same physics",
        body: [
          "Even after that, dragging still felt wrong. The string seemed to ripple from the anchor outward instead of following the hand holding it. The model was applying the same eased, laggy update whether the cord was being actively held or left to settle. But a string gripped by your hand doesn't drift toward your hand's position over several frames, it's exactly where your hand is, instantly. The lag, the swing, the momentum, that only makes sense once you let go.",
          "Splitting it into two explicit modes fixed it: while dragging, the knob snaps directly to the pointer position every frame, no easing at all. Only on release does it switch into a spring that can overshoot and oscillate before settling. Physically obvious in hindsight, invisible until it was pointed out.",
        ],
      },
      {
        heading: "A chain of fixed-length links doesn't have to reach where you want it to",
        body: [
          "The beads were originally modeled as a rope: each one locked to a fixed distance from the last. The knob, meanwhile, was positioned independently, following the pointer directly. Those two things don't automatically agree. A chain of 22 links, each rigidly 6.5px long, only spans exactly 143px. The knob could easily be some other distance away, and the result was a visible gap between the last bead and the knob whenever the cord was pulled sideways, measured at one point jumping from 6.5px to 30px with nothing in between.",
          "The fix was to stop modeling it as a chain of rigid links at all. Instead, every bead's position is now a point sampled along a bezier curve running from the fixed anchor to wherever the knob currently is. By construction, the two ends of that curve are always exactly the anchor and the knob, there's no length to overshoot or fall short of. The curve bows outward when pulled sideways (matching how a slack string sags) and stays straight when pulled down (matching how it doesn't sag along its own taut length). Fewer moving parts, and the bug class it replaced isn't possible anymore.",
        ],
      },
      {
        heading: "Not everything needs equal effort",
        body: [
          "One more piece of physical intuition took a few rounds to get right: swinging a hanging string sideways takes almost no force, but stretching it down against its own hang takes real effort, different resistance in different directions. The first pass treated every direction identically, which made sideways drags feel stiff and unresponsive compared to what a real cord does. Amplifying the sideways component of the drag before computing the swing, while leaving the downward component alone, made the sideways motion forgiving and the downward pull appropriately firm, matching the two different physical resistances instead of pretending they're the same thing.",
        ],
      },
      {
        heading: "The middle of a string shouldn't out-swing the weight at the end",
        body: [
          "One more round after the bezier fix: the middle of the cord was visibly shaking more than the knob at the bottom. That's backwards. In a real hanging string, the free end carries the most energy and the most motion; the middle is just along for the ride, always moving less than whatever is driving it, never more.",
          "The cause was that the curve's midpoint (its \"belly\") had its own independent spring, with its own stiffness and damping, chasing the knob's position. Once the knob started oscillating on release, the belly's spring reacted to that moving target with its own separate rhythm, and the two rhythms didn't line up. A part of the string ended up with more energy than the part actually swinging it.",
          "The fix was to only let the belly have independent spring behavior while it's being actively shaken by hand, where a bit of extra ripple reads as flexibility. The moment the cord is released, the belly stops having any physics of its own and just passively eases toward wherever the knob currently is, a fraction of the way there each frame, with no velocity, no momentum, no chance to exceed it. It can lag behind the knob. It can never outpace it.",
        ],
      },
      {
        heading: "The actual lesson",
        body: [
          "Almost none of these bugs were visible by reading the code. The cascade-layer issue looked identical to a dozen correctly-working transitions right next to it. The spring divergence only showed up on a fast flick, not a slow drag. The bead-knob gap only appeared sideways, not downward. The middle out-swinging the knob only showed up after release, not during a drag. Every one of them needed the thing actually running, watched, and in several cases measured with real numbers (sampling positions frame by frame) before the cause was obvious. Code review catches typos. It doesn't catch a CSS cascade rule silently winning over everything else on the page, or two independently-reasonable pieces of physics quietly disagreeing about which part of a string is allowed to move the most.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
