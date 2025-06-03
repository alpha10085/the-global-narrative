"use client";
import styles from "./DynamicForm.module.css";
import { memo } from "react";
import InFormationBox from "@/_Dashboard/_Components/boxs/InFormationBox/InFormationBox";
import FieldManager from "@/_Dashboard/_Components/FieldManger/FieldManger.jsx";
import useHelpers from "./useHelpers";
import Header from "./Header/Header";
import LoaderLayout from "@/_Dashboard/_Components/LoaderLayout/LoaderLayout";

const DynamicForm = (props) => {
  const formCTX = useHelpers(props)
  const { translations, theme, errors, resetForm, formProps, schema } = formCTX;
  if (resetForm) return <LoaderLayout theme={theme} />;
  return (
    <section
      id={"main-dynamic-from"}
      className={`${styles.section}  showSmooth `}
    >
      <Header {...formCTX} />
      <section className="flex wrap  mt20 gap20 ">
        <div className={`${styles?.layoutWrapper} `}>
          <div
            className={`${theme?.background} ${theme.bord20} wrap ${
              styles.layout
            }
             ${!!Object?.keys(errors)?.length && styles?.errorState}`}
          >
            {schema?.fields?.map((field, index) => (
              <FieldManager
                key={`${field?.name}[${index}]`}
                field={{
                  ...field,
                  label: translations?.inputs?.[field?.label],
                  placeholder: translations?.inputs?.[`${field?.label}_ph`],
                }}
                formProps={formProps}
              />
            ))}
          </div>
        </div>
        <InFormationBox {...formCTX} />
      </section>
    </section>
  );
};

export default memo(DynamicForm);
