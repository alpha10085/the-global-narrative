import { TableVirtuoso, Virtuoso } from "react-virtuoso";
import TableCard from "./card/card";
import styles from "./Table.module.css";
import Loading from "./loading/loading";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useMemo, useState } from "react";
const Table = ({
  theme = {},
  data = [],
  keys = [],
  isLoading = false,
  hasNextPage,
  slug,
  fields,
  next = () => {},
  schema,
  translations,
  path = null,
  endPoint,
  removedItems, setRemovedItems
}) => {

  const handleRemove = (itemId) => {
    setRemovedItems((prev) => [...prev, itemId]);
  };
  const dataAfterChecked = useMemo(
    () => data?.filter((val) => !removedItems.includes(val?._id)),
    [removedItems, data]
  );
  const EmptyPlaceholder = (
    <div
      className={`${styles.notfoundtext}  ${theme.bg200}  gap5 flex-c showSmooth`}
    >
      <RemoveCircleOutlineIcon />
      {translations?.noResult}
    </div>
  );
  return (
    <div
      className={`${styles.main}  ${theme.background} ${theme.scrollBar} ${theme.bord20}`}
    >
      <div
        className={`${styles.header}  ${theme.bord20} flex just-sb  ${theme.background}`}
      >
        {!!keys?.length &&
          keys?.slice(0, 6).map((key) => (
            <div
              key={`header-${key.key}`}
              className={`${styles.field} ${styles[key?.type]}`}
            >
              {translations?.inputs?.[key?.label]}
            </div>
          ))}
        {schema?.options?.roles?.update && (
          <div className={`${styles.field} ${styles.option} flex-c`}>
            {translations?.update}
          </div>
        )}
        {schema?.options?.roles?.delete && (
          <div className={`${styles.field} ${styles.option} flex-c`}>
            {translations?.delete}
          </div>
        )}
      </div>
      <Virtuoso
        components={{
          EmptyPlaceholder: () => (isLoading ? "" : EmptyPlaceholder),
          Footer: () =>
            isLoading ? (
              <div className={styles.loader}>
                <Loading theme={theme} />
              </div>
            ) : (
              ""
            ),
        }}
        endReached={() => {
          if (hasNextPage) next();
        }}
        className={`${styles.list} flex  column ${theme.scrollBar} `}
        data={dataAfterChecked}
        itemContent={(index, val) => (
          <TableCard
            path={path}
            key={val?._id}
            theme={theme}
            keys={keys}
            index={index}
            slug={slug}
            rowData={val}
            fields={fields}
            schema={schema}
            onRemoveItem={() => handleRemove(val?._id)}
            endPoint={endPoint}
            translations={translations}
          />
        )}
      />
    </div>
  );
};

export default Table;
