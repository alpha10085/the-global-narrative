"use client";
import { useState } from "react";
import styles from "./Testimonials.module.css";
import Card from "./Card/Card";

const Testimonials = ({ data = {} }) => {
  const [current, setCurrent] = useState(0);
  const testimonials = data?.testimonials || [];

  const handleChange = (dir) => {
    setCurrent((prev) =>
      dir === "left"
        ? (prev - 1 + testimonials.length) % testimonials.length
        : (prev + 1) % testimonials.length
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* LEFT COLUMN */}
        <div className={styles.left}>
          <h2>
            {data?.title || "From our"} <strong>community.</strong>
          </h2>
          <p>Here’s what other subscribers had to say about CC Plus.</p>
          <div className={styles.buttons}>
            <button onClick={() => handleChange("left")}>←</button>
            <button onClick={() => handleChange("right")}>→</button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.right}>
          {testimonials?.map((item, index) => (
            <Card key={item?._id} item={item} isActive={index === current} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
