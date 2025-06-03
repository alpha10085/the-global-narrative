import AddNewComponentControl from "./AddNewComponentControl/AddNewComponentControl";
import FoldersTreeControl from "../Components/FoldersTreeControl/FoldersTreeControl";
import { allIconsTypes } from "../Components/icons";
import useLocalStorage from "@/hooks/useLocalStorage";
import Loading from "../Loading/Loading";
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
