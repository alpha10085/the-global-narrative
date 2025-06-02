import { useTheme } from "@/_Dashboard/context/ThemeCTX";
import {
  deleteOneEntry,
  handleDynamicFormApi,
} from "@/_Dashboard/lib/dashboard";
import { delay } from "@/utils/time";
import { scrollToElement } from "@/utils/document";
import { joiResolver } from "@hookform/resolvers/joi";
import { useQueryClient } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import styles from "./DynamicForm.module.css";
import {
  asyncFormData,
  getChangedFields,
  handleDetecteErrorTranslations,
  handleDynamicFields,
  scrollToErrorElemntry,
  translationStaticKeys,
} from "./helpers";
import useDynamicState from "@/hooks/useDynamicState";
import toast from "react-hot-toast";
import useTranslations from "@/hooks/useTranslations";
import { useQueryParams } from "@/hooks/useQueryParams";
import { handleReplaceDot } from "@/_Dashboard/utils/handleData";

const useHelpers = ({
  mode = "update", // Mode of the form (e.g., "create", "update")
  data = {}, // Initial data for the form
  validation = () => {}, // Validation schema object
  refetch = () => {}, //
  schema = {}, // Form schema configuration
  type = "collections", // Type of data (e.g., collections, entries)
  endpoint = null, // API endpoint for the form
  displayName = null, // Display name for form labels
  slug = "", // Identifier slug for the form
  locale = "en",
  language = "en",
  queryKey = [],
  collectionName = "",
}) => {
  // Initialize React Query's query client
  const queryClient = useQueryClient();
  // Define and manage the state of the form
  const [state, setState, _, setStateWithCK] = useDynamicState({
    modeState: mode,
    currentData: data,
    loading: false,
    resetForm: false,
    disableSubmit: null,
    deletedTranslations: [],
    getValues: data,
  });

  const { singleValue } = useQueryParams();
  // Destructure state for easier usage
  const {
    modeState,
    currentData,
    loading,
    resetForm,
    disableSubmit,
    deletedTranslations = [],
    getValues,
  } = state;

  // Memoize the resolver
  const resolver = useMemo(() => joiResolver(validation(locale)), [locale]);

  // Initialize React Hook Form for form handling
  const {
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    trigger,
    control,
    setError,
    getValues: getValues_form,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver,
    mode: "all",
  });


  console.log("Eorooorr", errors);
  console.log("valuess",getValues);
  
  

  // Access theme context
  const { theme } = useTheme();
  // Router and location utilities
  const router = useRouter();
  const location = usePathname();
  // Handle form input changes with optional validation trigger
  const onChange = (key, val, runTrigger = true) => {
    setValue(key, val);
    setStateWithCK((prev) => {
      let newVal = prev;
      if (prev?.disableSubmit === key) {
        newVal = {
          ...prev,
          disableSubmit: null,
        };
      }
      return {
        ...newVal,
        getValues: getValues_form(),
      };
    });
    // Optional: Trigger field validation
    // runTrigger && trigger()
  };
  // Determine the unique identifier for the data being handled
  const id = type === "collections" ? currentData?._id : endpoint;
  // Disable save button if there are no changes in the form
  const disableSave = isEqual(currentData, getValues);
  // Memoize cache tags for revalidation purposes
  const tags = useMemo(() => schema?.options?.cache?.tags, [schema]);
  // Revalidate cache by invalidating related queries
  const revalidateCache = async (newData = null) => {
    try {
      const queryKeys = [slug, endpoint, collectionName, ...tags]?.filter(
        Boolean
      );
      // Remove inactive queries
      queryKeys.map(async (key) =>
        queryClient.removeQueries({ queryKey: [key], type: "inactive" })
      );
      if (newData) {
        queryClient.setQueryData([...queryKey, language], () => newData);
      } else {
        await queryClient.invalidateQueries(
          {
            queryKey: [id],
            refetchType: "none",
            exact: false,
          },
          {
            cancelRefetch: true,
          }
        );
      }
      // Invalidate queries for the current ID
    } catch (error) {
      console.log("Error invalidating queries:", error);
    }
  };
  const { removalFields = {}, translationKeys = {} } =
    useMemo(() => handleDynamicFields(schema), [slug]) || {};

  const translations = useTranslations("Dashboard", [
    ...translationKeys,
    ...translationStaticKeys,
    `displaynames.${displayName}`,
  ]);

  // Handle form submission
  const submit = async (formdata) => {
    setState({ loading: true });
    // Format form data to only include changed fields
    const formdataAfterFormated = {
      formdata: getChangedFields(
        currentData,
        formdata,
        removalFields,
        deletedTranslations
      ),
      slug,
      id,
      mode: modeState,
      type,
      cache: { tags },
    };
    toast.promise(handleDynamicFormApi(formdataAfterFormated), {
      loading: "saveing...",
      success: async (res) => {
        // Update form data with the response
        const newVal = asyncFormData(formdata, res?.data);
        // Reset the form with the new values
        reset(newVal);

        // clear client cache
        revalidateCache(newVal);
        // update state
        setState({
          currentData: newVal,
          loading: false,
          modeState: "update",
          deletedTranslations: [],
          getValues: getValues_form(),
        });
        return `${res?.message}`;
      },
      error: (error) => {
        // Handle form submission error
        const errorTarget = handleDetecteErrorTranslations(
          error,
          setError,
          watch,
          translations?.inputs?.duplicationError
        );
        scrollToElement(
          `#${
            errorTarget ? handleReplaceDot(errorTarget) : "main-dynamic-from"
          }`,
          150
        );
        setState({
          loading: false,
          ...(errorTarget ? { disableSubmit: errorTarget } : {}),
        });
        return `${error?.message}`;
      },
    });
  };
  // Handle deletion of the current entry
  const handleDelete = async () => {
    setState({ loading: true });
    toast.promise(
      deleteOneEntry(slug, id, {
        tags,
      }),
      {
        loading: "deleting...",
        success: (data) => {
          setState({ loading: false });
          revalidateCache();
          router.replace(location?.substring(0, location?.lastIndexOf("/")));
          setState({ loading: false, popupOpen: false }); // Update state after success
          return `${data?.message}`;
        },
        error: (error) => {
          setState({ loading: false });
          return `${error?.message}`;
        },
      }
    );
  };
  // Reset the form to its initial state
  const handleResetToInitForm = async () => {
    if (!location.includes("create")) {
      router.push("create");
    } else if (schema?.options?.translation) {
      refetch();
    } else {
      setState({ resetForm: true });
      await delay(300);
      reset({});
      reset();
      setState({
        resetForm: false,
        currentData: {},
        modeState: "create",
        getValues: {},
      });
    }
  };
  const switchLanguage = async (lang = "en") => {
    if (modeState === "create") return;
    const isInCreatePage = location.includes("create");
    if ("collections" === type && isInCreatePage && id) {
      router.push(`${id}?language=${lang}`);
      return;
    }
    const cachedData = queryClient.getQueryData([...queryKey, lang]); // Check if data is in cache
    if (cachedData) setState({ resetForm: true });
    reset(cachedData || {});
    clearErrors();
    singleValue("language", lang);
    if (cachedData) {
      await delay(300);
      setState({
        resetForm: false,
        currentData: cachedData,
        deletedTranslations: [],
      });
    }
  };
  const removeTranslation = (item = null) => {
    if (!item) return;
    setStateWithCK((prev) => ({
      ...prev,
      deletedTranslations: [...prev?.deletedTranslations, item].filter(Boolean),
    }));
  };
  // Form props to be passed to child components
  const formProps = {
    watch,
    onChange,
    errors,
    theme,
    type,
    slug,
    id,
    className: `${styles?.label}`,
    trigger,
    endpoint: slug,
    _id: currentData?._id,
    root_id: currentData?._id,
    mode: modeState,
    clearErrors,
    language,
    translations,
    removeTranslation,
    getValues: getValues_form,
  };
  // console.log("From-current-Data", currentData);
  if (process.env.NEXT_PUBLIC_MODE === "dev") {
    console.log(`❌ Form-errors`, errors);
    console.log("From-getValues", getValues);
  }

  return {
    translations,
    disableSave: disableSubmit || disableSave,
    submitForm: handleSubmit(submit, (e) => {
      scrollToErrorElemntry(e);
      return true;
    }),
    theme,
    errors,
    loading,
    resetForm,
    id,
    modeState,
    formProps,
    currentData,
    handleDelete,
    handleResetToInitForm,
    schema,
    displayName,
    switchLanguage,
    language,
    locale,
  };
};

export default useHelpers;
