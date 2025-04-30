"use client";
import SyncIcon from "@mui/icons-material/Sync";
import styles from "./ErrorBoundary.module.css";
import Spinner from "../Spinner/Spinner";

const ErrorBoundaryPage = ({ isLoading = false }) => {
  return (
    <section className={`${styles.container} showSmooth`}>
      {isLoading ? (
        <Spinner color="black" />
      ) : (
        <div className={`${styles.content} showSmooth`}>
          <div className={styles.iconContainer}>
            <SyncIcon className={styles.icon} />{" "}
            {/* Rotating icon for visual effect */}
          </div>
          <h1 className={styles.heading}>Attention</h1>
          <p className={styles.message}>
            Our server is currently undergoing maintenance to bring you exciting
            updates and improvements! We apologize for any inconvenience caused
            during this period. Please check back in 8 hours to experience the
            latest enhancements. Thank you for your patience and understanding.
          </p>
        </div>
      )}
    </section>
  );
};

export default ErrorBoundaryPage;
