"use client"
import React, { memo } from "react";
import "./SkeletonArticle.css";
const Skeleton = ({
  style = {},
  className = "",
  theme = "light", // New prop for theme
}) => {
  const getColorScheme = () => {
    switch (theme) {
      case "dark":
        return {
          baseColor: "#202020",
          highlightColor: "#303030",
        };
      default: // Light theme (default)
        return {
          baseColor: "#f0f0f0",
          highlightColor: "#e0e0e0",
        };
    }
  };

  const { baseColor, highlightColor } = getColorScheme();

  const baseStyle = {
    backgroundColor: baseColor,
    backgroundImage: `linear-gradient(to right, ${highlightColor} 0%, ${baseColor} 50%, ${highlightColor} 100%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite ease-in-out",
    ...style,
  };

  return <div style={baseStyle} className={`bord-r5 ${className}`} />;
};

export default memo(Skeleton);
