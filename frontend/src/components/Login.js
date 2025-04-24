// src/components/Login.js
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import DraggableStickman from "./DraggableStickman";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

// Define the left-most limit (negative value) where the stickman is fully dragged.
const DRAG_THRESHOLD = -575;
// 0 is the right edge.
const INITIAL_POSITION = { x: 0, y: 0 };

const Login = () => {
  // Persist the stickman’s final position here.
  const [lastPosition, setLastPosition] = useState(INITIAL_POSITION);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // onDragEnd: update lastPosition based on the final delta.
  const handleDragEnd = ({ delta }) => {
    setLastPosition((prev) => {
      const newX = prev.x + delta.x;
      // Clamp between 0 (right edge) and DRAG_THRESHOLD (left limit)
      const clampedX = Math.min(0, Math.max(newX, DRAG_THRESHOLD));
      // Show the password form if we've reached (or passed) the threshold.
      if (clampedX === DRAG_THRESHOLD) {
        setShowPassword(true);
      } else {
        setShowPassword(false);
      }
      return { x: clampedX, y: prev.y + delta.y };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "Password") {
      navigate("/admin");
    } else {
      alert("Incorrect password. Try again!");
    }
  };

  return (
    <div className={styles.gameLoginContainer}>
      <h2 className={styles.infoText}>
        Drag the stickman to the left to unlock admin
      </h2>
      <div className={styles.track}>
        <DndContext
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
        >
          <DraggableStickman lastPosition={lastPosition} />
        </DndContext>
      </div>
      {showPassword && (
        <form onSubmit={handleSubmit} className={styles.passwordForm}>
          <input
            type="password"
            className={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
