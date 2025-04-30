import useTranslations_g from "@/hooks/useTranslations";
import { useMemo } from "react";

const generateTranslationKeys = (
  target = "inputs",
  fields,
  staticFields = []
) => {
  const dynamicKeys = fields?.reduce((acc, field) => {
    if (field?.label) {
      acc.push(`${target}.${field?.label}`); // Add the base key

      // Conditionally add `_ph` suffix key
      if (["text", "textarea", "relation", "translate"].includes(field?.type)) {
        acc.push(`${target}.${field.label}_ph`);
      }
    }
    return acc;
  }, []);

  return [...staticFields, ...dynamicKeys];
};
const useTranslationsDashboard = (schema = [], statickeys = []) => {
  const translationsKeys = useMemo(() => {
    const allkeys = [];
    schema?.map((val) => {
      if (val?.schema?.fields) {
        allkeys.push(...generateTranslationKeys(val?.key, val?.schema?.fields));
      } 
    });
    return allkeys;
  }, [schema]);

  const translations = useTranslations_g("Dashboard", [
    ...statickeys,
    ...translationsKeys,
  ]);
  return translations;
};

export default useTranslationsDashboard;
