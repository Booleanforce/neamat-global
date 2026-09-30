import type { TargetAndTransition, Transition } from "framer-motion";

/**
 * Motion presets from the design's interaction rules:
 * gold buttons lift subtly, dark buttons shift slightly, cards elevate 2–4px.
 * Nothing stronger — no entrance animations, parallax or springs with overshoot.
 */
export const hoverTransition: Transition = { duration: 0.18, ease: "easeOut" };

export const goldButtonHover: TargetAndTransition = { y: -2 };
export const darkButtonHover: TargetAndTransition = { x: 2, filter: "brightness(1.12)" };
export const cardHover: TargetAndTransition = { y: -3 };
export const pressTap: TargetAndTransition = { y: 0, scale: 0.99 };
