import useInfinityQuery from "@/hooks/useInfinityQuery";
import styles from "./List.module.css";
import Card from "../card/card";
import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import ImageDetails from "../FileDetails/FileDetails";
import { memo, useState } from "react";
import { deleteMultipleFiles, getFiles } from "@/_Dashboard/lib/dashboard";
import { VirtuosoGrid } from "react-virtuoso";
import Spinner from "@/components/shared/Spinner/Spinner";
import { handleArray } from "@/utils/data";
import { useQueryClient } from "@tanstack/react-query";
import useDynamicState from "@/hooks/useDynamicState";
import AsyncButton from "@/components/shared/AsyncButton/AsyncButton";

const List = ({ searchParams, translations, roles = {} }) => {
  const {
    data = {},
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfinityQuery({
    Key: ["files", [], searchParams],
    next: getFiles,
    cache: "1h",
  });

  const [selectedItems, setSelectedItems] = useState(new Set());
  const [removelist, setRemoveList] = useState([]);
  const [state, setState, _, setStateWithCK] = useDynamicState({
    loading: false,
  });
  const { loading } = state;
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  const onRemove = (item) => {
    setRemoveList((prev) => [...prev, item?._id]);
    queryClient.invalidateQueries({
      queryKey: ["files"],
      refetchType: "all",
      exact: false,
    });
  };

  // Toggle selection
  const toggleSelection = (id) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // Bulk delete selected items
  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;

    setState({
      loading: true,
    });
    try {
      await deleteMultipleFiles(Array.from(selectedItems));
      queryClient.invalidateQueries({
        queryKey: ["files"],
        refetchType: "all",
      });
      setSelectedItems(new Set());
    } catch (error) {
      console.error("Failed to delete files", error);
    } finally {
      setState({
        loading: false,
      });
    }
  };

  return (
    <>
      {
        <div
          className={`${styles.selectedAction} ${
            selectedItems?.size > 0 ? styles.active : ""
          }`}
        >
          <AsyncButton
            loading={loading}
            onClick={handleBulkDelete}
            className={`${theme?.danger10} ${styles.deleteButton} ${
              selectedItems?.size > 0 ? styles.btnVisible : ""
            }`}
            spinnerColor="red"
            theme={theme.name}
            text={`${translations?.deleteSelected} ${
              selectedItems?.size ? `(${selectedItems?.size})` : ""
            }`}
            onLoading=" "
          />
          <button
            onClick={() => setSelectedItems(new Set())}
            className={`${styles.btn} ${theme?.background} ${theme?.btn30} ${
              selectedItems?.size > 0 ? styles.btnVisible : ""
            }`}
          >
            {translations?.reset}
          </button>
        </div>
      }
      <VirtuosoGrid
        className={styles.list}
        useWindowScroll
        data={data?.pages?.filter((v) => !removelist?.includes(v?._id))}
        endReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        overscan={200}
        itemContent={(index, item) => {
          return (
            <Card
              onRemove={() => onRemove(item)}
              key={item?._id}
              item={item}
              theme={theme}
              translations={translations}
              canDelete={roles?.delete}
              isSelected={selectedItems.has(item?._id)}
              onSelect={() => toggleSelection(item?._id)}
            />
          );
        }}
        listClassName={styles.gridList}
        itemClassName={styles.gridItem}
      />
      {isLoading && (
        <div className={`flex-c ${styles.loadingSpinner}`}>
          <Spinner size={27} theme={theme?.name} />
        </div>
      )}
    </>
  );
};

export default memo(List);
