"use client";

import { useEffect, useState } from 'react';
import { ConfirmEmail } from "@/lib/auth";
import styles from "./Verify.module.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from '@/Components/Shared/Link/Link';

const VerifyEmail = ({token = {}}) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setMessage('Invalid request. Token is missing.');
        setSuccess(false);
        setLoading(false);
        return;
      }
      try {
        const response = await ConfirmEmail(token);
        setMessage(response.message);
        setSuccess(true);
      } catch (error) {
        setMessage(error.response?.data?.message || 'An error occurred. Please try again later.');
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className={styles.section}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {success ? (
            <CheckCircleIcon className={`${styles.icon} ${styles.success}`} />
          ) : (
            <ErrorOutlineIcon className={`${styles.icon} ${styles.failure}`} />
          )}
          <p className={styles.message}>{message}</p>
          <Link href="/" className={styles.link}>
            Go to Home
          </Link>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
