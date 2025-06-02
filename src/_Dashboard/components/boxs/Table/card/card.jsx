import React, { memo, useState } from "react";
import style from "../Table.module.css";
import Link from "@/components/shared/LocalizedLink/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteOneEntry } from "@/_Dashboard/lib/dashboard";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { DisplayField } from "../DisplayField/DisplayField";
import PopupDelete from "../../PopupDelete/PopupDelete";

const TableCard = ({
  keys = [],
  schema,
  theme = {},
  rowData = {},
  slug = "",
  index,
  endPoint,
  onRemoveItem,
  path,
  translations = {},
}) => {
  const queryClient = useQueryClient();

  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { options = {} } = schema;
  const cacheConfig = { tags: schema?.options?.cache?.tags };

  const handleDelete = async () => {
    setLoading(true);
    toast.promise(deleteOneEntry(endPoint || slug, rowData?._id, cacheConfig), {
      loading: `${translations?.deleting}`,
      success: async (data) => {
        onRemoveItem();
        let queryKeys = [slug, endPoint, rowData?._id, ...cacheConfig?.tags];
        queryKeys?.map(
          async (key) =>
            await queryClient.invalidateQueries(
              {
                queryKey: [key],
                refetchType: "none",
                type: "all",
              },
              {
                cancelRefetch: true,
              }
            )
        );
        setLoading(false);
        setPopupOpen(false);
        return `${data?.message}`;
      },
      error: (error) => {
        setLoading(false);
        return `${error?.message}`;
      },
    });
  };

  const pathname = usePathname();

  return (
    <div
      className={`${style.item} ${index === 0 && style.first} ${theme.bord20} ${
        theme.background
      } ${theme.hoverBg10} showSmooth flex just-sb al-i-c`}
    >
      {keys?.slice(0, 6)?.map((key, index) => (
        <div
          key={index}
          className={`${style[key.type]} ${style.field} ${theme.color}`}
        >
          <Link href={`${pathname}/${rowData?._id}`}>
            <DisplayField
              translations={translations}
              theme={theme}
              field={key}
              rowData={rowData}
            />
          </Link>
        </div>
      ))}
      {options?.roles?.update && (
        <div className={`${style.option} flex-c ${style.field}`}>
          <Link className="al-i-c" href={`${pathname}/${rowData?._id}`}>
            <EditIcon />
          </Link>
        </div>
      )}
      {options?.roles?.delete && (
        <button
          onClick={() => setPopupOpen(true)}
          disabled={loading}
          className={`${style.option} ${theme.color} ${style.field} flex-c`}
        >
          <DeleteIcon />
        </button>
      )}

      {/* Custom Popup */}
      <PopupDelete
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={handleDelete}
        theme={theme}
        translations={translations}
        loading={loading}
      />
    </div>
  );
};

export default memo(TableCard, (prev, next) => {
  return prev?.item?._id === next?.item?._id && prev?.index === next?.index;
});
