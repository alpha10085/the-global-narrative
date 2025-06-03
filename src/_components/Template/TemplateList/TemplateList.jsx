import { lineBreak } from '@/utils/text';

import styles from './TemplateList.module.css'
import Aos from '@/_components/Shared/Animtions/Aos/Aos';

const TemplateList = ({
    data = [],
    sectionTitle="0-1-2-3"
}) => {
    if (!data?.length) return;
    return (
        <div id={sectionTitle} className={styles.scrollableBox}>
            {data?.map((item, index) => (
                <Aos
                    key={item?._id}
                    delay={index < 3 ? 150 * index : 50}
                    className={`${styles.item} `}
                    activeClassName={styles.event}
                >
                    <div className="flex just-sb mb-10 al-i-c">
                        <h2>{item.title}</h2>
                        <h1 className={styles.itemIndex}>0{index + 1}</h1>
                    </div>
                    <p
                    className={styles.description}
                        dangerouslySetInnerHTML={{ __html: lineBreak(item?.description, '.') }}
                    />
                </Aos>
            ))}
        </div>
    )
}

export default TemplateList