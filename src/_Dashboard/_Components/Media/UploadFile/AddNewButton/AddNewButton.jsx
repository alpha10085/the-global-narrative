import styles from './AddNewButton.module.css'
import { useUploadFile } from '../ContextApi/FileUploadCTX';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
const AddNewButton = ({ theme, addNew }) => {
    const {
        openWindow,
    } = useUploadFile()
    return (
        <button
            onClick={openWindow}
            className={`${theme.button}  flex-c ${styles.btnCreate}`}
        >
            <AddToPhotosIcon />
            <div className={styles.hideonmobile}>{addNew}</div>
        </button>
    );
};

export default AddNewButton