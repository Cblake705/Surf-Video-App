// src/components/DraggableStickman.js
import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";
import styles from "./Login.module.css";

// DRAG_DISTANCE: Maximum distance (in pixels) the stickman can be dragged to the left.
const DRAG_DISTANCE = 575;

const DraggableStickman = ({ lastPosition, onDrag }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-stickman",
  });

  const [showSplash, setShowSplash] = useState(false);
  const prevProgressRef = useRef(0);
  // The live drag delta; if not dragging, default to { x: 0, y: 0 }.
  const currentDelta = transform || { x: 0, y: 0 };

  // Use useMemo to compute the effective transform (lastPosition + currentDelta)
  const effectiveTransform = useMemo(() => {
    return {
      x: lastPosition.x + currentDelta.x,
      y: lastPosition.y + currentDelta.y,
    };
  }, [lastPosition, currentDelta.x, currentDelta.y]);

  // Clamp effective x between 0 (right edge) and -DRAG_DISTANCE (left limit).
  const clampedX = Math.min(0, Math.max(effectiveTransform.x, -DRAG_DISTANCE));
  const progress = Math.min(-clampedX / DRAG_DISTANCE, 1);
  useEffect(() => {
    if (prevProgressRef.current < 0.7 && progress >= 0.7) {
      setShowSplash(true);
      setTimeout(() => setShowSplash(false), 500);
    }
    prevProgressRef.current = progress;
  }, [progress]);
  // Notify parent of the current effective position (using the clamped x).
  useEffect(() => {
    if (onDrag) {
      onDrag({ ...effectiveTransform, x: clampedX });
    }
  }, [effectiveTransform, clampedX, onDrag]);

  // Compute animation: progress goes from 0 (no drag) to 1 (full drag left).
  const computeAnimation = (x) => {
    const progress = Math.min(-x / DRAG_DISTANCE, 1); // (x is negative when dragged left)
    let angle;
    let offsetY;
    if (progress <= 0.3) {
      angle = 0; // Rotate up to 45 degrees.
      offsetY = 0;
    } else if (progress <= 0.46) {
      const t = (progress - 0.3) / 0.1; // t goes from 0 to 1
      // CREAT ABS in which he surfs.
      angle = -Math.sin(t * 2) * 5 * Math.PI; // peaks at 10 degrees
      offsetY = Math.sin(t) * 5 * Math.PI;
    } else if (progress <= 1) {
      const t = (progress - 0.46) / 0.39; // t goes from 0 to 1
      angle = Math.sin(t * 4.1) * 20 * Math.PI; // peaks at 10 degrees
      offsetY = -Math.sin(t * 2.1) * 30 * Math.PI + 15;
    }
    return { angle, offsetY };
  };

  const { angle, offsetY } = computeAnimation(clampedX);

  const style = {
    transform: `translate3d(${clampedX}px, ${offsetY}px, 0) rotate(${angle}deg)`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={styles.draggableStickman}
    >
      {/* Replace the emoji with your stickman image.
          The alt text is now empty since screen readers already announce images.
          (You can also put a short description if the image conveys important information.) */}
      <img src="StickmanSurfing.png" alt="" className={styles.stickmanImage} />
      {/* Splash overlay */}
      {showSplash && <img src="wave2.png" alt="" className={styles.splash} />}
    </div>
  );
};

export default DraggableStickman;
