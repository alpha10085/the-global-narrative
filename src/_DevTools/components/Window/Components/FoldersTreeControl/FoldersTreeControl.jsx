import useAsyncQuery from "@/hooks/useAsyncQuery";
import { getFolders } from "@/lib/tools";
import styles from "./FoldersTreeControl.module.css";
import { useEffect, useRef, useMemo } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import useDynamicState from "@/hooks/useDynamicState";
import eventBus from "@/utils/eventBus";
import { delay } from "@/utils/delay";
import Folder from "../Folder/Folder";
import { allIconsTypes } from "../icons";
import { formatRoutes } from "./helpers";
import Loading from "../../Loading/Loading";

const FolderIcon_default = allIconsTypes.folder.component;

function sortByName(arr) {
  return arr.sort((a, b) => a.name.localeCompare(b.name, "en"));
}

const FoldersTreeControl = ({
  queryKey = [],
  hiddenFolders = [],
  treekey = "",
  AddNewControl = () => {},
  FolderIcon = FolderIcon_default,
  PageIcon = FolderIcon_default,
}) => {
  const elementRef = useRef(null);
  const [state, setState] = useDynamicState({
    data: [],
    popupState: false,
    loading: true,
  });

  const { data = {}, isLoading } = useAsyncQuery({
    queryKey,
    queryFn: getFolders,
    cache: "0s",
  });

  const hiddenFoldersKey = useMemo(
    () => hiddenFolders.join(","),
    [hiddenFolders]
  );

  useEffect(() => {
    if (!isLoading) {
      setState({ loading: true });

      const clonedData = JSON.parse(JSON.stringify(data));
      const formatted = formatRoutes(clonedData);

      const newData = formatted?.children?.filter(
        (val) => !hiddenFolders?.includes(val?.name)
      );

      setState({
        data: newData || [],
        loading: false,
      });
    }
  }, [isLoading, hiddenFoldersKey]);

  const onAddNew = (newChild) => {
    setState({
      data: sortByName([...state?.data, newChild]),
      popupState: false,
    });
  };

  const togglePopup = () => {
    if (!state.popupState) {
      delay(300).then(() => {
        eventBus.emit(treekey, elementRef.current.offsetTop);
      });
    }
    setState({
      popupState: !state.popupState,
    });
  };
  if (isLoading) return <Loading />

  return (
    <div className={`${styles.container} showSmooth`}>
      <div className={styles.wrapper}>
        {state?.data?.map((val) => (
          <Folder
            key={val?.name}
            data={val}
            folderKey={val?.name}
            treekey={treekey}
            FolderIcon={FolderIcon}
            PageIcon={PageIcon}
            AddNewControl={AddNewControl}
          />
        ))}
        <div
          ref={elementRef}
          onClick={togglePopup}
          className={`${styles.addIcon} flex-c`}
        >
          <span className="flex-c gap5">
            {!state.popupState ? (
              <>
                <AddIcon />
                create new 
              </>
            ) : (
              <>
                <CloseIcon />
                cancel 
              </>
            )}
          </span>
        </div>
      </div>
      {state.popupState && (
        <AddNewControl
          path_children={state?.data}
          onFinish={onAddNew}
          path=""
        />
      )}
    </div>
  );
};

export default FoldersTreeControl;
