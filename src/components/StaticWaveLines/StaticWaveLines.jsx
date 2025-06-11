"use client";
import styles from './StaticWaveLines.module.css';

const Waves = () => {
  return (
    <div className={styles.container}>
      <svg
        viewBox="0 0 1800 600"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
      >
        {[...Array(15)].map((_, i) => (
          <path
            key={i}
            d={generateWavePath(i)}
            className={styles.wave}
          />
        ))}
      </svg>
    </div>
  );
};

function generateWavePath(i) {
  const spacing = 12;
  const offset = i * spacing;

  return `
    M 0 ${300 + offset}
    C 450 ${100 + offset}, 650 ${500 - offset}, 900 ${300 + offset}
    S 1350 ${100 + offset}, 1800 ${300 + offset}
  `;
}

export default Waves;
