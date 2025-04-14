// src/components/DraggableStickman.js
import React, { useEffect, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import styles from "./Login.module.css";

// DRAG_DISTANCE: Maximum distance (in pixels) the stickman can be dragged to the left.
const DRAG_DISTANCE = 575;

const DraggableStickman = ({ lastPosition, onDrag }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable-stickman",
  });

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

  // Notify parent of the current effective position (using the clamped x).
  useEffect(() => {
    if (onDrag) {
      onDrag({ ...effectiveTransform, x: clampedX });
    }
  }, [effectiveTransform, clampedX, onDrag]);

  // Compute animation: progress goes from 0 (no drag) to 1 (full drag left).
  const computeAnimation = (x) => {
    const progress = Math.min(-x / DRAG_DISTANCE, 1); // (x is negative when dragged left)
    const angle = progress * 45; // Rotate up to 45 degrees.
    const offsetY = -progress * 20; // Move upward up to 20 pixels.
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
    </div>
  );
};

export default DraggableStickman;
