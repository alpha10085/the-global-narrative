"use client";
import styles from "./footer.module.css";

const Footer = ({ data = {} }) => {
  const dateNow = new Date().getFullYear();
  return (
    <footer id="footer-container" className={styles.footer}>
    </footer>
  );
};

export default Footer;
