import styles from './ShinyText.module.css';
import clsx from 'clsx';

const ShinyText = ({ text, disabled = false, speed = 2.5, className = '' }) => {
  const style = !disabled ? { animationDuration: `${speed}s` } : {};

  return (
    <span
      className={clsx(styles.shinyText, disabled && styles.disabled, className)}
      style={style}
    >
      {text}
    </span>
  );
};

export default ShinyText;
