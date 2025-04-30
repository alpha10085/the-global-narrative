import styles from "./Folder.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import useDynamicState from "@/hooks/useDynamicState";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";
import { delay } from "@/utils/delay";
import useTransitionToggle from "@/hooks/useTransitionToggle";
const Folder = ({
  parentname = "",
  addNewCallBack = () => {},
  data = {},
  currentPath = "",
  AddNewControl = () => {},
  FolderIcon = () => {},
  PageIcon = () => {},
  folderKey = 0,
  treekey = null,
}) => {
  const elementRef = useRef();
  const [{ addNewWindow, currentData }, setState] = useDynamicState({
    currentData: data,
    addNewWindow: false,
  });
  const { toggle, isOpen, isHidden } = useTransitionToggle({
    defaultOpen: false,
    closeDelay: 400,
  });

  const path = `${currentPath}/${data?.name}`;
  const currentParentname = `${parentname ? `${parentname}-` : ""}${
    data?.name
  }`;

  const toggleaddNewWindow = () => setState({ addNewWindow: !addNewWindow });
  const handleChangeCurrentData = (data) => {
    setState({
      currentData: {
        ...currentData,
        children: [...currentData?.children, data],
      },
    });
    toggleaddNewWindow();
  };

  const isPage = currentData?.page;
  const isHasChildrens = currentData?.children?.length > 0;

  const toggleisOpen = () => {
    if (isOpen) {
      setState({ addNewWindow: false });
    }
    toggle();
  };

  return (
    <div ref={elementRef} className={styles.container}>
      <div
        onClick={isHasChildrens ? toggleisOpen : () => {}}
        className={`${styles.head} ${isOpen && styles.isOpen} flex gap5 al-i-c`}
      >
        <span className={`${styles.icon} flex-c`}>
          {isPage ? (
            <PageIcon opened={isOpen} />
          ) : (
            <FolderIcon opened={isOpen} />
          )}
        </span>
        <div className={`flex-c ${styles.name} gap5`}>
          {currentData?.name}
          {currentData.new && <span className={styles.new}>New</span>}
        </div>
        {currentData?.children?.length ? (
          <span
            className={`${styles.arrowIcon} flex-c ${isOpen && styles.open}`}
          >
            <KeyboardArrowRightIcon />
          </span>
        ) : currentData?.children?.length ? null : (
          <div
            onClick={toggleaddNewWindow}
            className={`${styles.addIcon} flex-c ${styles.top}`}
          >
            <span className="">
              {addNewWindow ? <CloseIcon /> : <AddIcon />}
            </span>
          </div>
        )}
      </div>

      {currentData?.children?.length ? (
        <div
          className={`${styles.list} flex column gap5 ${isOpen && styles.open}`}
        >
          {!isHidden &&
            currentData?.children?.map((val, i) => (
              <Folder
                parentname={currentParentname}
                currentPath={path}
                addNewCallBack={addNewCallBack}
                data={val}
                key={`${folderKey}-${val?.name}`}
                FolderIcon={FolderIcon}
                AddNewControl={AddNewControl}
                PageIcon={PageIcon}
                folderKey={`${folderKey}-${val?.name}`}
                treekey={treekey}
              />
            ))}

          <div
            onClick={toggleaddNewWindow}
            className={`${styles.addIcon} flex-c `}
          >
            <span className="flex-c gap5">
              {!addNewWindow ? (
                <>
                  <AddIcon />
                  create new
                </>
              ) : (
                <>
                  <CloseIcon />
                  cancel add new
                </>
              )}
            </span>
          </div>
        </div>
      ) : null}
      {addNewWindow && (
        <AddNewControl
          parentname={currentParentname}
          path_children={currentData?.children}
          onFinish={handleChangeCurrentData}
          path={path}
        />
      )}
    </div>
  );
};

export default Folder;
