import { Virtuoso } from "react-virtuoso";
import styles from "./List.module.css";
import { getNestedProperty } from "@/utils/object";
import Img from "@/components/Shared/img/Img";
import Loader from "../Loader/Loader";
import  themes  from "@/_Dashboard/services/themes/themes";

const List = ({
  filteredData,
  handleSelect,
  fetchNextPage,
  hasNextPage,
  isLoading,
  imageField,
  field,
  mainCondition,
  theme = themes.dark,
  translations = {},
}) => {
  const EmptyPlaceholder = (
    <div className={`${styles.notfoundtext} showSmooth`}>
      {translations?.noResult}
    </div>
  );
  return (
    <Virtuoso
      components={{
        EmptyPlaceholder: () =>
          mainCondition ? (isLoading ? "" : EmptyPlaceholder) : "",
        Footer: () =>
          mainCondition && isLoading ? (
            <Loader theme={theme} className={styles.loader} />
          ) : (
            ""
          ),
      }}
      endReached={() => {
        if (hasNextPage) fetchNextPage();
      }}
      overscan={200}

      className={`${styles.list} flex column ${theme.scrollBar} ${theme?.background} ${theme?.bord20} 
      ${!filteredData?.length && mainCondition ? styles.empty : ''} 
      ${mainCondition ? (filteredData?.length < 3 ? `${styles.open} ${styles?.[`mode-${filteredData?.length}`]}` : styles.open) : ''}`}
    
      data={filteredData}
      itemContent={(_, val) => (
        <div
          onClick={() => handleSelect(val)}
          key={val?._id}
          className={`${styles.option}  flex al-i-c gap10   showSmooth`}
        >
          {imageField && (
            <Img
              mainClassName={theme.bgMedia}
              theme={theme.name}
              url={getNestedProperty(val, imageField)?.url}
              className={`${styles.imageField} ${theme.bord20}`}
            />
          )}
          <div className={styles.right}>
            {getNestedProperty(val, field?.displayField)}
          </div>
        </div>
      )}
    />
  );
};

export default List;
