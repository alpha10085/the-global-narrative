import styles from './MSViewer.module.css'


import Img from '@/components/Shared/img/Img';
import { useMemo } from 'react';
import { getFileExtension } from '@/_Dashboard/utils/fileUploadHelper';
import DownloaderButton from '@/components/Shared/DownloaderButton/DownloaderButton';


const word = '/_dashboard/Microsoft_Office_Word_Logo_512px-removebg-preview.png'
const PowerPoint = '/_dashboard/Microsoft_Office_PowerPoint_Logo_512px-removebg-preview.png';

const Excel = '/_dashboard/Microsoft_Office_Excel_Logo_512px-removebg-preview.png';

const MSViewer = ({
    url = '',
    type = '',
    canDownload = true,
    className = '',
    theme = '',
    file = ''
}) => {

    const ProviderType = useMemo(() => getFileExtension(file?.path || url))



    const msLogos = {
        xls: Excel,
        xlsx: Excel,
        docx: word,
        doc: word,
        ppt: PowerPoint,
        pptx: PowerPoint,
    }
    const logoUrl = msLogos?.[ProviderType]
    return (
        <div className={`${styles.box} flex-c column gap20 ${className}`}>
            {logoUrl && <Img className={styles.poster} withEffect={false} url={logoUrl} />}
        </div>
    )
}

export default MSViewer