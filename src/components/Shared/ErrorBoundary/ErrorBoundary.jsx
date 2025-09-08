"use client";
import { useEffect } from "react";
import SyncIcon from "@mui/icons-material/Sync";
import styles from "./ErrorBoundary.module.css";
import Spinner from "../Spinner/Spinner";

const ErrorBoundaryPage = ({ isLoading = false,handleCheckServer }) => {
  // useEffect(() => {
  //   let interval;

  //   const pollServer = async () => {
  //     try {
  //       const isLive = await handleCheckServer();
  //       if (isLive) {
  //         clearInterval(interval);
          
  //       }
  //     } catch {
  //       // still down → do nothing
  //     }
  //   };

  //   interval = setInterval(pollServer, 5000); // check every 2s
  //   pollServer(); // run immediately on mount

  //   return () => clearInterval(interval);
  // }, [handleCheckServer]);

  return (
    <section className={`${styles.container} showSmooth`}>
      {isLoading ? (
        <Spinner color="black" />
      ) : (
        <div className={`${styles.content} showSmooth`}>
          <div className={styles.iconContainer}>
            <SyncIcon className={styles.icon} />
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
