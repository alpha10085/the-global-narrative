"use client";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Testimonials.module.css";
import Card from "./Card/Card";
import { ArrowBackIosNewIcon, ArrowForwardIosIcon } from "../icons";

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

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.wrapper}>
        {/* LEFT COLUMN */}
        <div className={`${styles.left} ${inView ? styles.animateLeft : ""}`}>
          <h2>
            {data?.title || "From our"} <strong>community.</strong>
          </h2>
          <p>Here’s what other subscribers had to say about CC Plus.</p>
          <div className={styles.buttons}>
            <button className="flex-c" onClick={() => handleChange("left")}> <ArrowBackIosNewIcon /></button>
            <button className="flex-c" onClick={() => handleChange("right")}><ArrowForwardIosIcon /></button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={`${styles.right} ${inView ? styles.animateRight : ""}`}>
          {testimonials?.map((item, index) => (
            <Card key={item?._id} item={item} isActive={index === current} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
