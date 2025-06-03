import AddNewComponentControl from "./AddNewComponentControl/AddNewComponentControl";
import FoldersTreeControl from "../Components/FoldersTreeControl/FoldersTreeControl";

import useLocalStorage from "@/hooks/useLocalStorage";
import Loading from "../Loading/Loading";
import { allIconsTypes } from "../Components/icons";
const FolderIcon = allIconsTypes.folder.component;

const ComponentTools = () => {
  const {  data = {} ,isLoading} =
  useLocalStorage("dev-tools-settings");
  const hiddenFolders = data?.componentsHiddenFolders
  if (isLoading) return <Loading  />
  return (
    <FoldersTreeControl
      FolderIcon={FolderIcon}
      AddNewControl={AddNewComponentControl}
      hiddenFolders={hiddenFolders}
      queryKey={[["components"], "dev-tools-get-folders-components"]}
      treekey="component"
    />
  );
};

export default ComponentTools;
