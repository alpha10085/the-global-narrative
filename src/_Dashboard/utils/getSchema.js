import schemas from "../configuration/schemas";

const useSchema = (key) => {
  return schemas?.find((item) => item?.key === key) || {};
};

export default useSchema;
