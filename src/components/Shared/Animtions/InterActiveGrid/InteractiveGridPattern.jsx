"use client";

import { useState, useEffect, useMemo } from "react";
import styles from "./InteractiveGridPattern.module.css";
import { delay } from "@/utils/time";

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = "",
  squaresClassName = "",
  ...props
}) {
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [initialHovered, setInitialHovered] = useState(new Set()); // Store initially hovered squares

  const [horizontal, vertical] = squares;
  const totalSquares = horizontal * vertical;

  // Allowed random positions
  const allowedIndices = [22, 82, 89, 66, 44];

  // Pick 3 random squares from allowedIndices after a 1s delay
  useEffect(() => {
    const selectRandomSquares = async () => {
      await delay(1500);

      const randomSquares = new Set();
      while (randomSquares.size < 3) {
        const randomIndex = Math.floor(Math.random() * allowedIndices.length);
        randomSquares.add(allowedIndices[randomIndex]);
      }

      setInitialHovered(randomSquares);
    };

    selectRandomSquares();
  }, []);

  // Memoized grid squares for performance
  const gridSquares = useMemo(() => {
    return Array.from({ length: totalSquares }).map((_, index) => {
      const x = (index % horizontal) * width;
      const y = Math.floor(index / horizontal) * height;
      const isHovered = hoveredSquare === index || initialHovered.has(index);

      return (
        <rect
          key={index}
          x={x}
          y={y}
          width={width}
          height={height}
          className={`${styles.square} ${isHovered ? styles.hovered : ""} ${squaresClassName}`}
          onMouseEnter={() => setHoveredSquare(index)}
          onMouseLeave={() => setHoveredSquare(null)}
        />
      );
    });
  }, [horizontal, vertical, width, height, hoveredSquare, squaresClassName, initialHovered]);

  return (
    <svg 
      width={width * horizontal}
      height={height * vertical}
      className={`${styles.grid} ${className} showSmooth`}
      {...props}
    >
      {gridSquares}
    </svg>
  );
}
