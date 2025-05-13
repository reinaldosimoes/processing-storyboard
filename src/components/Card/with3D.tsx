import type { ComponentType } from "react";
import React, { useState } from "react";
import { motion } from "motion/react";

/**
 * Higher Order Component that adds a 3D tilt effect to any component
 * The effect is triggered by mouse movement over the component
 *
 * @param Component - The component to be wrapped with 3D effect
 * @returns A new component with 3D tilt capabilities
 */
export function with3D<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return (props: P) => {
    // State to track the current rotation values for X and Y axes
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    /**
     * Calculates rotation based on mouse position relative to the element's center
     * Creates a natural 3D tilt effect that follows the cursor
     */
    const handleMouseMove = (event: React.MouseEvent) => {
      // Get the element's position and dimensions
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      // Calculate cursor position relative to the element
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Find the center point of the element
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles based on cursor distance from center
      // The multiplier (10) controls the intensity of the tilt effect
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((centerX - x) / centerX) * 10;

      setRotation({ x: rotateX, y: rotateY });
    };

    /**
     * Resets the rotation when mouse leaves the element
     */
    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    return (
      // Outer container with perspective for 3D effect
      <motion.div
        style={{
          perspective: "1000px", // Controls the depth of the 3D effect
          width: "100%",
          height: "100%",
        }}
      >
        {/* Inner container that handles the actual rotation */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX: rotation.x,
            rotateY: rotation.y,
          }}
          transition={{
            type: "spring", // Uses spring physics for smooth animation
            stiffness: 300, // Controls how rigid the spring is
            damping: 20, // Controls how quickly the spring settles
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* Render the wrapped component with all its props */}
          <Component {...props} />
        </motion.div>
      </motion.div>
    );
  };
}
