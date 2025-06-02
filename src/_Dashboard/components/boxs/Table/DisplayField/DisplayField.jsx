import Img from "@/components/shared/img/Img";
import { getNestedProperty } from "@/utils/object";
import styles from "./Display.module.css";
import { customText } from "@/utils/text";
import { table_config } from "@/_Dashboard/configuration/CustomComponents/ComponentManger";
import { formateDateEn_GB, formatTimeAgo } from "@/utils/date";

const StringCase = ({ val }) => <>{customText(val?.toString()?.trim(), 22)}</>;
const NumberCase = ({ val = 0, field = {} }) => {
    let numberValue = Number.isFinite(Number(val)) ? Number.parseFloat(val) : 0;
    numberValue = field.float ? numberValue.toFixed(2) : numberValue;
    numberValue = `${field?.textBeforeNumber || ""}${numberValue}`;
    return <>{numberValue}</>;
  };
  const BooleanCase = ({ val = false, translations = {} }) => (
    <>{val === true ? translations?.yes || "yes" : translations?.no || "no"}</>
  );
  const DateCase = ({ val, field, translations }) => {
    const allFormates = {
      dateAgo: (val) => formatTimeAgo(val, translations), // Pass translations here
      dateTime: formateDateEn_GB,
    };
    const formatHandler = allFormates?.[field?.format] || allFormates?.dateAgo;
    return <>{formatHandler(val)}</>;
  };
  const Media = ({ val, theme }) => {
    return (
      <Img
        className={`${styles.tableMedia}  ${theme.bord20}`}
        theme={theme.name}
        url={val?.url}
      />
    );
  };
  const RelationCase = ({ val, field }) => {
    if (Array.isArray(val)) return "...";
    return <StringCase val={getNestedProperty(val, field?.displayField)} />;
  };
  const ColorCase = ({ val,  theme }) => {
    return (
      <div
        className={`${styles.colorBox} ${theme.bord20}`}
        style={{ backgroundColor: val }}
      />
    );
  };
export const DisplayField = ({
    field = {},
    translations = {},
    rowData = {},
    theme = {},
  }) => {
    try {
      const allFiledTypes = {
        text: StringCase,
        translate: StringCase,
        selects: StringCase,
        textarea: StringCase,
        number: NumberCase,
        boolean: BooleanCase,
        date: DateCase,
        media: Media,
        relation: RelationCase,
        color: ColorCase,
        ...table_config,
      };
      const Component = allFiledTypes?.[field?.type];
      if (!Component) return "...";
  
      return (
        <Component
          theme={theme}
          field={field}
          translations={translations}
          val={getNestedProperty(rowData, field?.key || field?.name)}
        />
      );
    } catch (error) {}
    return "...";
  };