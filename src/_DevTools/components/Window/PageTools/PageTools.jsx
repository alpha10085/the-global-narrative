
import FoldersTreeControl from "../components/FoldersTreeControl/FoldersTreeControl";
import AddNewPageControl from "./AddNewPageControl/AddNewPageControl";
import { allIconsTypes } from "../components/icons";

import useLocalStorage from "@/hooks/useLocalStorage";
import Loading from "../Loading/Loading";
import config from "@/i18n/config";
const FolderIcon = allIconsTypes?.folder?.folder;

const PageIcon = allIconsTypes?.folder?.next_folder;

const PageTools = () => {
  const { data = {}, isLoading } = useLocalStorage("dev-tools-settings");
  const hiddenFolders = data?.pagesHiddenFolders;
  if (isLoading) return <Loading />;
  return (
    <FoldersTreeControl
      FolderIcon={FolderIcon}
      PageIcon={PageIcon}
      AddNewControl={AddNewPageControl}
      hiddenFolders={hiddenFolders}
      queryKey={[
        ["app", ...(config.route ? ["[locale]"] : []), "(routes)"],
        "dev-tools-get-folders-pages",
      ]}
      treekey="page"
    />
  );
};

export default PageTools;
