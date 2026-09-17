"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  repeat?: number;
  repeatDelay?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  delay = 0,
  duration = 5,
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) => {
  const id = useId();

  const [pathD, setPathD] = useState("");
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;

    if (!container || !from || !to) return;

    let frame = 0;

    const updatePath = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const fromRect = from.getBoundingClientRect();
        const toRect = to.getBoundingClientRect();

        const width = containerRect.width;
        const height = containerRect.height;

        if (!width || !height) return;

        // Coordinates relative to the beam container.
        const startX =
          fromRect.left -
          containerRect.left +
          fromRect.width / 2 +
          startXOffset;

        const startY =
          fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;

        const endX =
          toRect.left - containerRect.left + toRect.width / 2 + endXOffset;

        const endY =
          toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;

        // Curvature perpendicular to the line.
        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;

        const normalX = -dy / length;
        const normalY = dx / length;

        const controlX = midX + normalX * curvature;
        const controlY = midY + normalY * curvature;

        setDimensions({
          width,
          height,
        });

        setPathD(
          `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
        );
      });
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);

    resizeObserver.observe(container);
    resizeObserver.observe(from);
    resizeObserver.observe(to);

    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath, true);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();

      window.removeEventListener("resize", updatePath);
      window.removeEventListener("scroll", updatePath, true);
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!pathD || !dimensions.width || !dimensions.height) {
    return null;
  }

  const gradientId = `animated-beam-${id.replace(/:/g, "")}`;

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible",
        className,
      )}
    >
      {/* Static beam */}
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* Animated beam */}
      <path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          initial={{
            x1: reverse ? dimensions.width : 0,
            x2: reverse ? 0 : dimensions.width,
            y1: 0,
            y2: 0,
          }}
          animate={{
            x1: reverse ? 0 : dimensions.width,
            x2: reverse ? dimensions.width : 0,
            y1: 0,
            y2: 0,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat,
            repeatDelay,
          }}
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />

          <stop offset="35%" stopColor={gradientStartColor} />

          <stop offset="65%" stopColor={gradientStopColor} />

          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
