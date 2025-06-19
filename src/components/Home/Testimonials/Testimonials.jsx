"use client";
import { useState } from "react";
import styles from "./Testimonials.module.css";

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
          {testimonials.map((item, index) => (
            <div
              key={item._id}
              className={`${styles.card} ${index === current ? styles.active : styles.inactive}`}
            >
              <p className={styles.quote}>“{item.content}”</p>
              <div className={styles.author}>
                <img
                  src={item.poster?.url}
                  alt={item.author}
                  className={styles.avatar}
                />
                <div>
                  <p className={styles.name}>{item.author}</p>
                  <p className={styles.title}>{item.jobTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
