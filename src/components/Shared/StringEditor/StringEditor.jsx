"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./StringEditor.module.css";

export default function WordLikeEditor({ initialValue = "", onSave } = {}) {
  const [value, setValue] = useState(initialValue);
  const selectionRef = useRef({ start: 0, end: 0 });
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [linkData, setLinkData] = useState({ label: "", url: "" });
  const taRef = useRef(null);

  // Track selection in plain text
  useEffect(() => {
    const el = taRef.current;
    if (!el) return;
    const update = () => {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      // Find start/end based on innerText
      const text = el.innerText;
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(el);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;
      const end = start + range.toString().length;
      selectionRef.current = { start, end };
    };
    el.addEventListener("mouseup", update);
    el.addEventListener("keyup", update);
    return () => {
      el.removeEventListener("mouseup", update);
      el.removeEventListener("keyup", update);
    };
  }, []);

  // Only set initial content once
  useEffect(() => {
    if (taRef.current && !taRef.current.innerText) {
      taRef.current.innerText = initialValue;
    }
  }, [initialValue]);

  const getCurrentSelection = () => selectionRef.current;

  const replaceRange = (str, start, end, replacement) =>
    str.slice(0, start) + replacement + str.slice(end);

  const findEnclosingBoldRange = (text, start, end) => {
    // Find the nearest ** before the selection start
    const before = text.lastIndexOf("**", start);
    // Find the nearest ** after the selection end
    const after = text.indexOf("**", end);

    if (before !== -1 && after !== -1 && before < after) {
      const open = before;
      const closeExclusive = after + 2;

      // Ensure selection is inside or touching the bold block
      if (start >= open && end <= closeExclusive) {
        return [open, closeExclusive];
      }
    }
    return null;
  };

  const toggleBold = () => {
    const el = taRef.current;
    if (!el) return;

    let { start, end } = getCurrentSelection();
    if (start === end) return;

    // Detect heading at start of current line
    const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
    let headingOffset = 0;
    console.log(value);

    if (value.startsWith("# ", lineStart)) {
      headingOffset = 2; // skip "# "
      if (start < lineStart + headingOffset) {
        start = lineStart + headingOffset;
      }
    }

    let selectedText = value.slice(start, end);
    const boldRange = findEnclosingBoldRange(value, start, end);

    let newValue;
    if (boldRange) {
      // Remove bold
      const [open, closeExclusive] = boldRange;
      const inner = value.slice(open + 2, closeExclusive - 2);
      newValue = value.slice(0, open) + inner + value.slice(closeExclusive);
    } else {
      // Add bold after heading marker if present
      const wrapped = `**${selectedText}**`;
      newValue = replaceRange(value, start, end, wrapped);
    }

    setValue(newValue);
    el.innerText = newValue;

    // Restore selection
    setTimeout(() => {
      const boldLen = boldRange ? 0 : 2; // adjust for added **
      setSelectionRangeSafe(
        el,
        start + boldLen,
        start + boldLen + selectedText.length
      );
    }, 0);
  };

  // Helper to set selection safely in a contentEditable
  const setSelectionRangeSafe = (el, start, end) => {
    const range = document.createRange();
    const sel = window.getSelection();
    let charIndex = 0;
    let nodeStack = [el];
    let node,
      foundStart = false,
      stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex + node.length;
        if (!foundStart && start >= charIndex && start <= nextCharIndex) {
          range.setStart(node, start - charIndex);
          foundStart = true;
        }
        if (foundStart && end >= charIndex && end <= nextCharIndex) {
          range.setEnd(node, end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    sel.removeAllRanges();
    sel.addRange(range);
  };

  const toggleHeading = () => {
    let { start } = getCurrentSelection();

    // Find start/end of the current line
    const lineStart = value.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
    const lineEnd = value.indexOf("\n", start);
    const fullLine =
      lineEnd === -1 ? value.slice(lineStart) : value.slice(lineStart, lineEnd);

    // Preserve bold markers when toggling heading
    let content = fullLine;
    let hasHeading = false;

    if (content.startsWith("# ")) {
      content = content.slice(2);
      hasHeading = true;
    }

    const newLine = hasHeading ? content : `# ${content}`;
    const newValue =
      value.slice(0, lineStart) +
      newLine +
      (lineEnd === -1 ? "" : value.slice(lineEnd));

    setValue(newValue);
    taRef.current.innerText = newValue;

    // Keep selection in same spot
    setTimeout(() => {
      const newStart = hasHeading ? start - 2 : start + 2;
      setSelectionRangeSafe(taRef.current, newStart, newStart);
    }, 0);
  };

  const openLinkForm = () => {
    const { start, end } = getCurrentSelection();
    const selectedText = value.slice(start, end) || "";
    setLinkData({ label: selectedText, url: "" });
    setShowLinkForm(true);
  };

  const insertLink = (e) => {
    e.preventDefault();
    const { start, end } = getCurrentSelection();
    const label = (linkData.label || "link").trim();
    const url = (linkData.url || "").trim();
    if (!url) return;
    const replacement = `[${label}](${url})`;
    const newValue = replaceRange(value, start, end, replacement);
    setValue(newValue);
    taRef.current.innerText = newValue;
    setShowLinkForm(false);
  };

  const insertNewLine = () => {
    const { start, end } = getCurrentSelection();
    const newValue = replaceRange(value, start, end, "\n");
    setValue(newValue);
    taRef.current.innerText = newValue;
  };

  const handleSave = () => {
    if (typeof onSave === "function") onSave(value);
  };



const handlechange = (e) => {
 setValue(e.currentTarget.innerText)
}

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button onClick={toggleBold} className={styles.button}>
          <strong>B</strong>
        </button>
        <button onClick={toggleHeading} className={styles.button}>
          H
        </button>
        <button onClick={openLinkForm} className={styles.button}>
          Link
        </button>
        <button onClick={insertNewLine} className={styles.button}>
          New Line
        </button>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={handleSave} className={styles.buttonPrimary}>
            Save
          </button>
        </div>
      </div>

      {showLinkForm && (
        <form onSubmit={insertLink} className={styles.linkForm}>
          <input
            placeholder="Label"
            value={linkData.label}
            onChange={(e) =>
              setLinkData((p) => ({ ...p, label: e.target.value }))
            }
          />
          <input
            placeholder="https://example.com"
            value={linkData.url}
            onChange={(e) =>
              setLinkData((p) => ({ ...p, url: e.target.value }))
            }
          />
          <button type="submit">Insert</button>
          <button type="button" onClick={() => setShowLinkForm(false)}>
            Cancel
          </button>
        </form>
      )}

      {/* Editor Area */}
      <div
        ref={taRef}
        className={styles.editorArea}
        contentEditable
        suppressContentEditableWarning
        onInput={handlechange}
        onBlur={handlechange}
      >
        {value}
      </div>

      <div className={styles.codeBox}>
        <h4>DB-ready string</h4>
        <pre>{value}</pre>
      </div>
    </div>
  );
}
