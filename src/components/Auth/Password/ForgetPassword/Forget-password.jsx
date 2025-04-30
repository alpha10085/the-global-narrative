"use client"
// pages/forget-password.js
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './forget-password.module.css'
import SendEmail from '../SendEmail/SendEmail';
import ResetPassword from '../ResetPassword/ResetPassword';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current.swiper.slideTo(0);
  }, []);


  return (
    <div className={`${styles.FogetPasssword} w-90 m-auto min-h90  pt70 showSmooth`}>
      <div className="Cover-header"></div>

      <Swiper
        ref={swiperRef}
        speed={500}
        allowTouchMove={false}
        simulateTouch={false}
        modules={[]}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <SendEmail swiperRef={swiperRef} setEmail={setEmail} />
        </SwiperSlide>
        <SwiperSlide>
          <ResetPassword swiperRef={swiperRef} email={email} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ForgetPassword;
