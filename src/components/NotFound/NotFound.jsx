"use client"
import Link from '@/components/Shared/Link/Link'
import styles from './NotFound.module.css'
import NavBar from '@/components/NavBar/NavBar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const NotFound = ({ }) => {
  return (
    <>
      <NavBar />
      <div className={`${styles.notFound} flex-c   w-75 m-auto h-100  showSmooth`}>
        <div className=" flex column al-i-c just-c  gap10">
          <h1 className=''>404</h1>
          <h2 className='mb-10 '>Page Not Found</h2>
          <h3 className='mb-10 '>Sorry, the page you are looking for does not exist.</h3>
          <h4>Please go back to the home page.</h4>

          <Link className={`${styles.btn} flex-c gap5`} href={'/'}  >
            Back to home
            <ArrowForwardIosIcon />
          </Link>

        </div>

      </div>
    </>
  )
}

export default NotFound