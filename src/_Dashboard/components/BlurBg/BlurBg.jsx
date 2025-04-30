import styles from './BlurBg.module.css'

const BlurBg = ({ onClick = () => { }, active = false }) => {
  return ( <div onClick={onClick} className={`${styles.layout} ${active && styles.showlayout}`} />)
}

export default BlurBg