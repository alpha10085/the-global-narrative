"use client";
import React, { useRef, useEffect } from "react";
const WaveLines = ({
  lineCount = 3,
  pointCount = 7,
  amplitude = 70,
  frequency = 0.02,
  speed = 0.9,
  colors = ["#ffffff", "#00eaff", "#ff00d4"],
  height = 300,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Set high-resolution canvas size
    canvas.width = window.innerWidth * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let width = canvas.width / dpr;
    const centerY = height / 2;

    // Setup waves
    const waves = Array.from({ length: lineCount }, (_, i) => ({
      color: colors[i % colors.length],
      offset: i * 1000,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now();

      waves.forEach((wave) => {
        const points = [];

        for (let i = 0; i < pointCount; i++) {
          const x = (i / (pointCount - 1)) * width;
          const y =
            centerY +
            Math.sin(
              time * (speed / 1000) + wave.offset + x * frequency * Math.PI
            ) *
              amplitude;
          points.push({ x, y });
        }

        // Draw smooth wave
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      width = canvas.width / dpr;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lineCount, pointCount, amplitude, frequency, speed, colors, height]);

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          overflow: "hidden",
          height: `${height}px`,
          display: "block",
        }}
      />
    </div>
  );
};

export default () => null;
