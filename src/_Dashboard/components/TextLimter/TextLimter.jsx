
import styles from './TextLimter.module.css'

const TextLimter = ({ text = '',limit=30 ,theme, className = '' }) => {
    return (
        <span className={`${styles.container}  ${className} ${theme?.name === 'dark' && styles.black}`}>
            {text?.slice(0, limit)}
        </span>
    )
}

export default TextLimter