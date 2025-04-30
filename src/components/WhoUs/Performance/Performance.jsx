"use client"
import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./Performance.module.css";
import Counter from "@/components/Home/InSightsSection/Counter/Counter";

const metrics = [
  { label: "Page Load Time", value: "0.9", unit: "s", score: 98 },
  { label: "Time to Interactive", value: "1.8", unit: "s", score: 95 },
  { label: "Server Response Time", value: "90", unit: "ms", score: 99 },
  { label: "Total Blocking Time", value: "75", unit: "ms", score: 94 },
];

const Performance = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  return (
    <div ref={ref} className={`${styles.container} ${inView ? styles.inView : ""}`}>
      <h2 className={styles.title}>
        Lightning-fast performance, seamless experience, and code that just
        flows.{" "}
      </h2>

      <div className={styles.main}>
        {/* Circular Score using Counter */}
        <div className={styles.scoreCard}>
          {inView && <Counter percentage={96.5} size={120} label="Real Experience Score" />}
          <p className={styles.scoreDesc}>
            The combined score of your Web Vitals experienced by your visitors.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.top}>
                <p className={styles.metricLabel}>{metric.label}</p>
                <div className="flex just-sb al-i-c gap10">
                  <p className={styles.metricValue}>
                    {metric.value}
                    <span className={styles.unit}>{metric.unit}</span>
                  </p>
                  {inView && <Counter percentage={metric.score} size={50} className={styles.percentage} />}
                </div>
              </div>

              <div className={styles.bottom}>
                <p className={styles.metricLabel}>
                  {metric.label} performance score
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
