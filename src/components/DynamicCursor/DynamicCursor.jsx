"use client";
import React, { useEffect, useRef } from "react";
import styles from "./DynamicCursor.module.css";
import useDynamicState from "@/hooks/useDynamicState";
import { delay } from "@/utils/delay";

const DynamicCursor = () => {
  const wrapperRef = useRef(null);
  const targetPos = useRef({ x: -100, y: 0 });
  const currentPos = useRef({ x: -100, y: 0 });
  const animationRef = useRef(null);

  const [cursorData, setCursorData] = useDynamicState({
    visible: false,
    label: "",
    color: "#000",
    isDetected: false,
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!cursorData.isDetected) {
        console.log("runned isDetected");
        
        delay(150).then(() => setCursorData({ isDetected: true }));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorData.isDetected]);

  // Animate cursor position
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(
        currentPos.current.x,
        targetPos.current.x,
        0.15
      );
      currentPos.current.y = lerp(
        currentPos.current.y,
        targetPos.current.y,
        0.15
      );

      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${currentPos.current.x}px`;
        wrapperRef.current.style.top = `${currentPos.current.y}px`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Handle hover and visibility logic
  useEffect(() => {
    const handleClick = () => {
      setCursorData({ visible: false, label: "", isDetected: false });
    };

    const handleEnter = (e) => {
      const el = e.target.closest("[data-cursor-label]");
      if (el) {
        const label = el.getAttribute("data-cursor-label");
        const color = el.getAttribute("data-cursor-color") || "#84e6ff";
        setCursorData({ visible: true, label, color });

        if (!el.__hasClickHandler) {
          el.addEventListener("click", handleClick);
          el.__hasClickHandler = true;
        }
      }
    };

    const handleLeave = (e) => {
      const el = e.target.closest("[data-cursor-label]");
      if (el && el.__hasClickHandler) {
        el.removeEventListener("click", handleClick);
        delete el.__hasClickHandler;
      }
      setCursorData({ visible: false });
    };

    const addListeners = (el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseup", handleEnter);
      el.addEventListener("mousedown", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    };

    const removeListeners = (el) => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseup", handleEnter);
      el.removeEventListener("mousedown", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      if (el.__hasClickHandler) {
        el.removeEventListener("click", handleClick);
        delete el.__hasClickHandler;
      }
    };

    const bindListeners = () => {
      const targets = document.querySelectorAll("[data-cursor-label]");
      targets.forEach(addListeners);
    };

    bindListeners();

    // Trigger hover detection if user is already hovering
    requestAnimationFrame(() => {
      const hovered = document.elementFromPoint(
        targetPos.current.x,
        targetPos.current.y
      );
      if (hovered) {
        const el = hovered.closest("[data-cursor-label]");
        if (el) {
          const label = el.getAttribute("data-cursor-label");
          const color = el.getAttribute("data-cursor-color") || "#84e6ff";
          setCursorData({ visible: true, label, color });

          if (!el.__hasClickHandler) {
            el.addEventListener("click", handleClick);
            el.__hasClickHandler = true;
          }
        }
      }
    });

    // Optional: retry after hydration
    setTimeout(() => {
      const hovered = document.elementFromPoint(
        targetPos.current.x,
        targetPos.current.y
      );
      if (hovered) {
        const el = hovered.closest("[data-cursor-label]");
        if (el) {
          const label = el.getAttribute("data-cursor-label");
          const color = el.getAttribute("data-cursor-color") || "#84e6ff";
          setCursorData({ visible: true, label, color });
        }
      }
    }, 500);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches?.("[data-cursor-label]")) addListeners(node);
            node
              .querySelectorAll?.("[data-cursor-label]")
              .forEach(addListeners);
          }
        });
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.matches?.("[data-cursor-label]")) removeListeners(node);
            node
              .querySelectorAll?.("[data-cursor-label]")
              .forEach(removeListeners);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.querySelectorAll("[data-cursor-label]").forEach(removeListeners);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`${styles.wrappercursor} flex-c`}>
      <div
        className={`${styles.cursor} ${
          cursorData?.visible && cursorData?.isDetected
            ? styles.visible
            : styles.unVisible
        } flex-c`}
        style={{ backgroundColor: cursorData?.color }}
      >
        {cursorData?.label}
      </div>
    </div>
  );
};

export default DynamicCursor;
