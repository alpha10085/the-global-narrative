import { useForm } from "react-hook-form";
import styles from "./WarningForm.module.css";
import InfoIcon from "@mui/icons-material/Info";
import { joiResolver } from "@hookform/resolvers/joi";
import { warningiVal } from "./schema";
import TextArea from "../../Inputs/TextArea/TextArea";
import BooleanInput from "../../Inputs/booleanInput/BooleanInput";
import AsyncButton from "@/components/Shared/AsyncButton/AsyncButton";
import DateInput from "../../Inputs/DateInput/DateInput";

const WarningForm = ({ theme }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: joiResolver(warningiVal),
    mode: "onTouched",
  });

  const handler = (form) => {
    try {
    } catch (error) {}
  };

  return (
    <div className={`${styles.section} ${styles.layout} ${theme.background} ${theme.bord20}`}>
      <h1>Warning Alert</h1>
      <p className={styles.descarption}>
        <InfoIcon /> It&apos;s used to alert your application users that there is an
        update on its server to avoid any side effects.
      </p>
      <form className="mt-20 mb-20  gap10 flex wrap" onSubmit={handleSubmit(handler)}>
        <TextArea
          theme={theme}
          className={styles.label}
          currentValue={watch("description")}
          error={errors?.descarption?.message}
          field={{
            name: "description",
            label: "description",
            placeholder: "description",
            type: "",
            required: true,
          }}
        />
        <BooleanInput
          theme={theme}
          className={styles.label}
          currentValue={watch("publish")}
          error={errors?.publish?.message}
          field={{
            name: "publish",
            label: "publish",
            placeholder: "publish",
            type: "",
            required: true,
          }}
        />
        <DateInput
                 theme={theme}
                 className={styles.label}
                 currentValue={watch("publish")}
                 error={errors?.publish?.message}
                 field={{
                   name: "start date",
                   label: "start date",
                   placeholder: "start date",
                   type: "",
                   required: true,
                 }}
        
        />
        <div className="w-95 ml-5 mt-20 flex just-fa">
          <AsyncButton
            onLoading=""
            text="save"
            className={` ${styles.btn} ${theme.button}`}
            type="submit"
            // loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default WarningForm;
