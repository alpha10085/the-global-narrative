import Img from '@/_components/Shared/img/Img'
import styles from './Poster.module.css'

const Poster = ({url =''}) => {
  return (
    <Img
    className={`${styles.pagePoster} fadeSlideDown_`}
    url={url}
  />
  )
}

export default Poster