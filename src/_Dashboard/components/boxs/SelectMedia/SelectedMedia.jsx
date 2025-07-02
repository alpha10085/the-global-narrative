import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import styles from "./SelectedMedia.module.css";
import List from "./components/List/List";
import { useUploadFile } from "../../Media/UploadFile/ContextApi/FileUploadCTX";
import BlurBg from "../../BlurBg/BlurBg";
import useScrollControl from "@/hooks/useScrollControl";

const SelectedMedia = ({
  max,
  onClose,
  single,
  allowedTypes = [],
  current,
  callback,
  translations
}) => {
  const {
    
  } = useScrollControl({
    default:true
});
  const { theme } = useTheme();
  const [itemsSelected, setItemsSelected] = useState(
    Array.isArray(current)
      ? current
      : typeof current === "object"
      ? [current]
      : []
  );
  const handleSelect = useCallback(
    (val) => {
      if (!val) return;
      let item = {
        _id: val?._id,
        url: val?.url,
        mimetype: val?.mimetype,
        thumbnail: val?.thumbnail,
      };

      setItemsSelected((prevItemsSelected) => {
        const isExisted = prevItemsSelected.some(
          (selectedItem) => selectedItem?._id === item?._id
        );

        if (single) {
          return isExisted ? [] : [item];
        }

        const updatedItems = isExisted
          ? prevItemsSelected?.filter(
              (selectedItem) => selectedItem?._id !== item?._id
            )
          : [...prevItemsSelected, item];

        return prevItemsSelected.length !== updatedItems.length
          ? updatedItems
          : prevItemsSelected;
      });
    },
    [single]
  );
  const { openWindow } = useUploadFile();

  const handleAddNewAssest = () => {
    onClose();
    openWindow();
  };

  return (
    <section className={`${styles.main} flex al-i-c`}>
      <BlurBg active={true} onClick={onClose} />
      <section
        className={`${styles.section} ${theme.background} ${theme.bord20} flex column gap0 just-sb`}
      >
        <div className={`${styles.head} flex wrap just-sb gap20 al-i-c`}>
          <div className={`${styles.left}`}>
            <h1>{translations?.slider?.addNewAssest}</h1>
          </div>
          <div className={`${styles.right} flex   gap10`}>
            <button
              onClick={handleAddNewAssest}
              className={`${styles.btncreate} ${theme.button}  flex-c al-i-c gap5`}
            >
              {translations?.slider?.addNewAssest}
            </button>

            <button
              onClick={() => callback(itemsSelected)}
              className={`${styles.btncreate} ${theme.btn30} flex-c al-i-c gap5`}
            >
              {translations?.slider?.finish}
            </button>
          </div>
        </div>
        <List
          translations={translations}
          current={itemsSelected}
          single={single}
          theme={theme}
          allowedTypes={allowedTypes}
          onSelect={handleSelect}
        />
      </section>
    </section>
  );
};

export default memo(SelectedMedia, () => true);
